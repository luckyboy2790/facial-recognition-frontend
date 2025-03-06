import React, { Component, createRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face'

// Import face profile
import JSON_PROFILE from '../descriptors/bnk48.json'

const WIDTH = 420
const HEIGHT = 420
const inputSize = 160

interface Detection {
    box: { height: number; width: number; _x: number; _y: number }
}

interface Match {
    _label: string
}

interface State {
    fullDesc: any
    detections: Detection[] | null
    descriptors: Float32Array[] | null
    faceMatcher: any
    match: Match[] | null
    facingMode: string | { exact: string } | null
}

class VideoInput extends Component<{}, State> {
    private webcam = createRef<Webcam>()
    private interval: NodeJS.Timeout | null = null

    constructor(props: {}) {
        super(props)
        this.state = {
            fullDesc: null,
            detections: null,
            descriptors: null,
            faceMatcher: null,
            match: null,
            facingMode: null,
        }
    }

    async componentDidMount() {
        await loadModels()
        this.setState({ faceMatcher: await createMatcher(JSON_PROFILE) })
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
            this.setState(
                {
                    facingMode:
                        videoInputs.length < 2
                            ? 'user'
                            : { exact: 'environment' },
                },
                this.startCapture,
            )
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

            if (this.state.descriptors && this.state.faceMatcher) {
                const match = this.state.descriptors.map((descriptor) =>
                    this.state.faceMatcher.findBestMatch(descriptor),
                )
                this.setState({ match })
            }
        }
    }

    render() {
        const { detections, match, facingMode } = this.state
        const videoConstraints = facingMode
            ? { width: WIDTH, height: HEIGHT, facingMode }
            : null
        const camera = facingMode === 'user' ? 'Front' : 'Back'

        console.log(this.state)

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
                            >
                                {match?.[i] && (
                                    <p
                                        style={{
                                            backgroundColor: 'blue',
                                            border: 'solid',
                                            borderColor: 'blue',
                                            width: detection.box.width,
                                            marginTop: 0,
                                            color: '#fff',
                                            transform: `translate(-3px,${detection.box.height}px)`,
                                        }}
                                    >
                                        {match[i]._label}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default function VideoInputWithRouter() {
    const navigate = useNavigate()
    return <VideoInput />
}
