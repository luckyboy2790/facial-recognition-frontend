import React, { Component, createRef, Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face'
import { apiGetTotalEmployeeDescriptor } from '@/services/employeeService'
import { apiAttendanceCheckOut } from '@/services/AttendanceService'
import { Attendance } from '@/views/attendances/AttendanceList/types'
import { Notification, toast } from '@/components/ui'
import sleep from '@/utils/sleep'
import { useToken } from '@/store/authStore'
import { useAuth } from '@/auth'
import { User } from '@/@types/auth'

const WIDTH = 420
const HEIGHT = 420
const inputSize = 160

interface Detection {
    box: { height: number; width: number; _x: number; _y: number }
}

interface Match {
    _label: string
}

interface FaceDescriptorData {
    [key: string]: FaceDescriptorData
}

interface State {
    fullDesc: any
    detections: Detection[] | null
    descriptors: Float32Array[] | null
    faceMatcher: any
    match: Match[] | null
    facingMode: string | { exact: string } | null
    cameraLabel: string | null
    requestSent: boolean
}

class VideoInput extends Component<
    {
        onCloseDialog: () => void
        type: string
        timezone: string
        navigate: any
        token: string | null
        setRecoStatus: Dispatch<SetStateAction<boolean>>
        user: User
    },
    State
> {
    private webcam = createRef<Webcam>()
    private interval: NodeJS.Timeout | null = null

    constructor(props: {
        onCloseDialog: () => void
        type: string
        timezone: string
        navigate: any
        token: string | null
        setRecoStatus: Dispatch<SetStateAction<boolean>>
        user: User
    }) {
        super(props)
        this.state = {
            fullDesc: null,
            detections: null,
            descriptors: null,
            faceMatcher: null,
            match: null,
            facingMode: null,
            cameraLabel: null,
            requestSent: false,
        }
    }

    async componentDidMount() {
        const data: FaceDescriptorData = await apiGetTotalEmployeeDescriptor()

        if (Object.keys(data).length <= 0) {
            toast.push(
                <Notification type="warning">
                    The employees do not exist!
                </Notification>,
                {
                    placement: 'top-center',
                },
            )

            if (this.props.token) {
                if (this.props.user.account_type === 'Employee') {
                    this.props.navigate('/personal/dashboard')
                } else {
                    this.props.navigate('/employee')
                }
            } else {
                this.props.navigate('/sign-in')
            }
            return
        }

        await loadModels()
        this.setState({ faceMatcher: await createMatcher(data) })
        this.setInputDevice()
    }

    componentWillUnmount() {
        if (this.interval) clearInterval(this.interval)
    }

    setInputDevice = () => {
        if (!navigator.mediaDevices?.enumerateDevices) {
            console.error('navigator.mediaDevices is not available.')
            return
        }

        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const videoInputs = devices.filter(
                (device) => device.kind === 'videoinput',
            )

            let frontCamera = null
            let rearCamera = null

            for (const device of videoInputs) {
                if (device.label.toLowerCase().includes('front')) {
                    frontCamera = device
                } else if (device.label.toLowerCase().includes('back')) {
                    rearCamera = device
                }
            }

            if (!frontCamera) {
                frontCamera = videoInputs[0]
            }

            if (frontCamera) {
                this.setState(
                    { facingMode: 'user', cameraLabel: 'front' },
                    this.startCapture,
                )
            } else if (rearCamera) {
                this.setState(
                    {
                        facingMode: { exact: 'environment' },
                        cameraLabel: 'back',
                    },
                    this.startCapture,
                )
            } else {
                console.error('No camera devices available.')
            }
        })
    }

    startCapture = () => {
        this.interval = setInterval(this.capture, 1500)
    }

    capture = async () => {
        if (this.webcam.current) {
            const screenshot = this.webcam.current.getScreenshot()
            if (screenshot) {
                const fullDesc = await getFullFaceDescription(
                    screenshot,
                    inputSize,
                )
                if (fullDesc) {
                    this.setState({
                        detections: fullDesc.map((fd: any) => fd.detection),
                        descriptors: fullDesc.map((fd: any) => fd.descriptor),
                    })
                }
            }

            if (
                this.state.descriptors &&
                this.state.faceMatcher &&
                !this.state.requestSent
            ) {
                const match = this.state.descriptors.map((descriptor) =>
                    this.state.faceMatcher.findBestMatch(descriptor),
                )
                this.setState({ match }, () => this.handleMatch(match))
            }
        }
    }

    handleMatch = async (match: Match[]) => {
        if (
            match.length > 0 &&
            match[0]._label !== 'unknown' &&
            !this.state.requestSent
        ) {
            this.setState({ requestSent: true })

            const now = new Date()
            const date = now.toISOString().split('T')[0]
            const timeWithTimezone = new Intl.DateTimeFormat('en-US', {
                timeZone: this.props.timezone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                fractionalSecondDigits: 3,
            }).format(now)

            let time_in: string | undefined = ''
            let break_in: string | undefined = ''
            let break_out: string | undefined = ''
            let attendanceId: string = ''

            if (
                this.props.type === 'time_out' ||
                this.props.type === 'break_in' ||
                this.props.type === 'break_out'
            ) {
                try {
                    const attendanceData: Attendance =
                        await apiAttendanceCheckOut({
                            id: match[0]._label,
                        })

                    if (attendanceData && attendanceData.time_in) {
                        const date = new Date(attendanceData.time_in)

                        time_in = new Intl.DateTimeFormat('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            fractionalSecondDigits: 3,
                        }).format(date)

                        attendanceId = attendanceData._id
                    }

                    if (attendanceData && attendanceData.break_in) {
                        const date = new Date(attendanceData.break_in)

                        break_in = new Intl.DateTimeFormat('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            fractionalSecondDigits: 3,
                        }).format(date)
                    }

                    if (attendanceData && attendanceData.break_out) {
                        const date = new Date(attendanceData.break_out)

                        break_out = new Intl.DateTimeFormat('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            fractionalSecondDigits: 3,
                        }).format(date)
                    }

                    attendanceId = attendanceData._id
                } catch (error: any) {
                    toast.push(
                        <Notification type="warning">
                            {error.message || 'An unexpected error occurred'}
                        </Notification>,
                        {
                            placement: 'top-center',
                        },
                    )

                    this.props.onCloseDialog()
                }
            }

            let reqData = {}

            if (this.props.type === 'time_in') {
                reqData = {
                    employee: match[0]._label,
                    date: date,
                    time_in: timeWithTimezone,
                    time_out: '',
                }
            } else if (this.props.type === 'time_out') {
                reqData = {
                    employee: match[0]._label,
                    date: date,
                    break_in: break_in,
                    break_out: break_out,
                    time_in: time_in,
                    time_out: timeWithTimezone,
                }
            } else if (this.props.type === 'break_in') {
                reqData = {
                    employee: match[0]._label,
                    date: date,
                    break_in: timeWithTimezone,
                    break_out: '',
                }
            } else if (this.props.type === 'break_out') {
                reqData = {
                    employee: match[0]._label,
                    date: date,
                    break_in: break_in,
                    break_out: timeWithTimezone,
                }
            }

            const domain = import.meta.env.VITE_BACKEND_ENDPOINT

            const endpoint =
                this.props.type === 'time_in'
                    ? `${domain}/api/attendance/create_attendance`
                    : this.props.type === 'break_in'
                      ? `${domain}/api/attendance/record_break/${attendanceId}`
                      : this.props.type === 'break_out'
                        ? `${domain}/api/attendance/record_break/${attendanceId}`
                        : `${domain}/api/attendance/update_attendance/${attendanceId}`

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(this.props.token
                            ? { Authorization: `Bearer ${this.props.token}` }
                            : {}),
                    },
                    body: JSON.stringify(reqData),
                })

                const responseData = await response.json()

                if (response.ok) {
                    this.props.onCloseDialog()

                    toast.push(
                        <Notification type="success">
                            Face recognized!
                        </Notification>,
                        {
                            placement: 'top-center',
                        },
                    )

                    await sleep(1000)
                } else {
                    this.props.onCloseDialog()

                    toast.push(
                        <Notification type="warning">
                            {responseData.message}
                        </Notification>,
                        {
                            placement: 'top-center',
                        },
                    )

                    await sleep(1000)
                    console.error('Failed to send user data')
                }
            } catch (error: any) {
                console.error('Error sending request:', error)
            }
        } else {
            this.props.setRecoStatus(false)

            this.props.onCloseDialog()
        }
    }

    render() {
        const { detections, match, facingMode, cameraLabel } = this.state
        const videoConstraints = facingMode
            ? { width: WIDTH, height: HEIGHT, facingMode }
            : null

        const camera =
            cameraLabel === 'front' ? 'Front' : cameraLabel === 'back' && 'Back'

        return (
            <div
                className="Camera"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <p>Camera: {camera}</p>
                <div style={{ width: WIDTH, height: HEIGHT }}>
                    <div style={{ position: 'relative', width: WIDTH }}>
                        {videoConstraints && (
                            <div style={{ position: 'absolute' }}>
                                <Webcam
                                    audio={false}
                                    width={WIDTH}
                                    height={HEIGHT}
                                    ref={this.webcam}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                />
                            </div>
                        )}
                        {detections?.map((detection, i) => (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    border: 'solid',
                                    borderColor: 'blue',
                                    height: detection.box.height,
                                    width: detection.box.width,
                                    transform: `translate(${detection.box._x}px,${detection.box._y}px)`,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default function VideoInputWithRouter({
    onCloseDialog,
    type,
    timezone,
    navigate,
    setRecoStatus,
}: {
    onCloseDialog: () => void
    type: string
    timezone: string
    navigate: any
    setRecoStatus: Dispatch<SetStateAction<boolean>>
}) {
    const { token } = useToken()

    const { user } = useAuth()

    return (
        <VideoInput
            onCloseDialog={onCloseDialog}
            type={type}
            timezone={timezone}
            navigate={navigate}
            token={typeof token === 'string' ? token : null}
            setRecoStatus={setRecoStatus}
            user={user}
        />
    )
}
