import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import AttendanceForm from '../AttendanceForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { AttendanceFormSchema } from '../AttendanceForm/types'
import { useToken } from '@/store/authStore'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

const EmployeeCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { token } = useToken()

    function isBreakValid(data: AttendanceFormSchema) {
        const baseDate = '1970-01-01T'
        const breakIn = data?.break_in
            ? new Date(baseDate + data.break_in)
            : null
        const breakOut = data?.break_out
            ? new Date(baseDate + data.break_out)
            : null
        const timeIn = data?.time_in ? new Date(baseDate + data.time_in) : null
        const timeOut = data?.time_out
            ? new Date(baseDate + data.time_out)
            : null

        if (!timeIn || !timeOut) return false

        const isBreakValid =
            (!breakIn || breakIn > timeIn) && (!breakOut || breakOut < timeOut)

        return isBreakValid
    }

    const handleFormSubmit = async (values: AttendanceFormSchema) => {
        if (
            !isBreakValid(values) &&
            (values.break_in !== '' || values.break_out !== '')
        ) {
            toast.push(
                <Notification type="warning">
                    Break Time must be between working time.
                </Notification>,
                {
                    placement: 'top-center',
                },
            )

            return
        }

        if (
            !values.employee ||
            values.employee === '' ||
            !values.date ||
            values.date === '' ||
            !values.time_in ||
            values.time_in === ''
        ) {
            toast.push(
                <Notification type="warning">
                    Please fill fields(Employee, Date, Start time required).
                </Notification>,
                {
                    placement: 'top-center',
                },
            )

            return
        }

        setIsSubmiting(true)

        const response = await fetch(
            `${domain}/api/attendance/create_attendance`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(values),
            },
        )

        const data = await response.json()

        const toastStatus = response.ok ? 'success' : 'warning'

        setIsSubmiting(false)

        toast.push(
            <Notification type={toastStatus}>{data.message}</Notification>,
            {
                placement: 'top-center',
            },
        )

        await sleep(1500)

        window.location.href = '/attendance'
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Attendance discarded!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/attendance')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <AttendanceForm
                newAttendance
                defaultValues={{
                    employee: '',
                    date: '',
                    time_in: '',
                    time_out: '',
                    break_in: '',
                    break_out: '',
                }}
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </AttendanceForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default EmployeeCreate
