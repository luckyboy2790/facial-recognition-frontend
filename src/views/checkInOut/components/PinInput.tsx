import { PasswordInput } from '@/components/shared'
import { Button, Input, Notification, toast } from '@/components/ui'
import {
    apiAttendanceCheckOut,
    apiPinEmployeeCheckOut,
} from '@/services/AttendanceService'
import { useToken } from '@/store/authStore'
import sleep from '@/utils/sleep'
import { Attendance } from '@/views/attendances/AttendanceList/types'
import { Employee } from '@/views/employees/EmployeeList/types'
import { useState } from 'react'

const PinInput = ({
    onPinDialogClose,
    type,
    timezone,
    onPinDialogOk,
}: {
    onPinDialogClose: () => void
    type: string
    timezone: string
    onPinDialogOk: (e: any) => void
}) => {
    const [pin, setPin] = useState('')
    const [email, setEmail] = useState('')

    const { token } = useToken()

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        if (/^\d*$/.test(inputValue)) {
            setPin(inputValue)
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleMatch = async () => {
        const now = new Date()
        const date = now.toISOString().split('T')[0]
        const timeWithTimezone =
            new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                fractionalSecondDigits: 3,
            }).format(now) + 'Z'

        let time_in: string | undefined = ''
        let break_in: string | undefined = ''
        let break_out: string | undefined = ''
        let attendanceId: string = ''
        let employeeId: string | undefined = ''

        const employee: Employee = await apiPinEmployeeCheckOut({
            email: email,
            pin: pin,
        })

        console.log(employee)

        if (employee) {
            employeeId = employee._id
        }

        if (
            type === 'time_out' ||
            type === 'break_in' ||
            type === 'break_out'
        ) {
            try {
                const attendanceData: Attendance = await apiAttendanceCheckOut({
                    id: employeeId,
                })

                if (attendanceData && attendanceData.time_in) {
                    const date = new Date(attendanceData.time_in)

                    time_in =
                        new Intl.DateTimeFormat('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            fractionalSecondDigits: 3,
                        }).format(date) + 'Z'

                    attendanceId = attendanceData._id
                }

                if (attendanceData && attendanceData.break_in) {
                    const date = new Date(attendanceData.break_in)

                    break_in =
                        new Intl.DateTimeFormat('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            fractionalSecondDigits: 3,
                        }).format(date) + 'Z'
                }

                if (attendanceData && attendanceData.break_out) {
                    const date = new Date(attendanceData.break_out)

                    break_out =
                        new Intl.DateTimeFormat('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            fractionalSecondDigits: 3,
                        }).format(date) + 'Z'
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

                onPinDialogClose()
            }
        }

        let reqData = {}

        if (type === 'time_in') {
            reqData = {
                employee: employeeId,
                date: date,
                time_in: timeWithTimezone,
                time_out: '',
            }
        } else if (type === 'time_out') {
            console.log(break_in, break_out)

            reqData = {
                employee: employeeId,
                date: date,
                break_in: break_in,
                break_out: break_out,
                time_in: time_in,
                time_out: timeWithTimezone,
            }
        } else if (type === 'break_in') {
            reqData = {
                employee: employeeId,
                date: date,
                break_in: timeWithTimezone,
                break_out: '',
            }
        } else if (type === 'break_out') {
            reqData = {
                employee: employeeId,
                date: date,
                break_in: break_in,
                break_out: timeWithTimezone,
            }
        }

        const domain = import.meta.env.VITE_BACKEND_ENDPOINT

        const endpoint =
            type === 'time_in'
                ? `${domain}/api/attendance/create_attendance`
                : type === 'break_in'
                  ? `${domain}/api/attendance/record_break/${attendanceId}`
                  : type === 'break_out'
                    ? `${domain}/api/attendance/record_break/${attendanceId}`
                    : `${domain}/api/attendance/update_attendance/${attendanceId}`

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(reqData),
            })

            const responseData = await response.json()

            if (response.ok) {
                onPinDialogClose()

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
                onPinDialogClose()

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
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-5 text-white">
                <h2 className="mb-6 text-2xl font-semibold">Enter PIN code</h2>
                <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    required
                />
                <PasswordInput
                    value={pin}
                    onChange={handlePinChange}
                    inputMode="numeric"
                />
            </div>
            <div className="text-right mt-6">
                <Button
                    className="ltr:mr-2 rtl:ml-2"
                    variant="plain"
                    onClick={() => onPinDialogClose()}
                >
                    Cancel
                </Button>
                <Button
                    variant="solid"
                    onClick={(e: any) => {
                        onPinDialogOk(e)
                        handleMatch()
                    }}
                >
                    Okay
                </Button>
            </div>
        </>
    )
}

export default PinInput
