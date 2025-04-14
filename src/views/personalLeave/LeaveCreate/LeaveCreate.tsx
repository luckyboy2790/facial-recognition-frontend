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
import useTranslation from '@/utils/hooks/useTranslation'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

const EmployeeCreate = () => {
    const navigate = useNavigate()

    const { t } = useTranslation()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { token } = useToken()

    const handleFormSubmit = async (values: LeaveFormSchema) => {
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
            <Notification type="success">
                {t('page.leave.leave_discarded', 'Leave discarded!')}
            </Notification>,
            { placement: 'top-center' },
        )
        navigate('/personal/leave')
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
                                {t('page.discard', 'Discard')}
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                {t('page.create', 'Create')}
                            </Button>
                        </div>
                    </div>
                </Container>
            </LeaveForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title={t('page.discard_change', 'Discard changes')}
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
                cancelText={t('page.discard', 'Discard')}
                confirmText={t('page.employee.confirm', 'Confirm')}
            >
                <p>
                    {t(
                        'page.discard_confirm',
                        'Are you sure you want discard this? This action cannot be undo.',
                    )}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default EmployeeCreate
