import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ScheduleForm from '../ScheduleForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import type { ScheduleFormSchema } from '../ScheduleForm'
import { useToken } from '@/store/authStore'
import useTranslation from '@/utils/hooks/useTranslation'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

const EmployeeCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { t } = useTranslation()

    const { token } = useToken()

    const handleFormSubmit = async (values: ScheduleFormSchema) => {
        setIsSubmiting(true)

        const response: any = await fetch(
            `${domain}/api/schedule/create_schedule`,
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

        await sleep(700)

        setIsSubmiting(false)

        toast.push(
            <Notification type={toastStatus}>{data.message}</Notification>,
            {
                placement: 'top-center',
            },
        )

        await sleep(700)

        window.location.href = '/schedule'
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">
                {t('page.schedule.schedule_discarded', 'Schedule discarded!')}
            </Notification>,
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
            <ScheduleForm
                newSchedule={true}
                defaultValues={{
                    employee: '',
                    start_time: '',
                    off_time: '',
                    from: '',
                    to: '',
                    total_hours: '',
                    rest_days: [],
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
            </ScheduleForm>
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
