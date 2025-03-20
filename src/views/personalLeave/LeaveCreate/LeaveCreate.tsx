import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import LeaveForm from '../LeaveForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { LeaveFormSchema } from '../LeaveForm/types'
import { useToken } from '@/store/authStore'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

const EmployeeCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { token } = useToken()

    const handleFormSubmit = async (values: LeaveFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)

        const response = await fetch(
            `${domain}/api/leave/personal/create_leave`,
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

        window.location.href = '/personal/leave'
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Leave discardd!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/schedule')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <LeaveForm
                newLeave={true}
                defaultValues={{
                    leaveType: '',
                    leaveFrom: '',
                    leaveTo: '',
                    leaveReturn: '',
                    reason: '',
                }}
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex justify-between items-center px-8">
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
            </LeaveForm>
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
