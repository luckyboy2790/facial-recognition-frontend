import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    apiDeleteSchedules,
    apiScheduleDetail,
} from '@/services/ScheduleService'
import ScheduleForm from '../ScheduleForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import type { ScheduleFormSchema } from '../ScheduleForm'
import type { Schedule } from '../ScheduleList/types'
import { useToken } from '@/store/authStore'
import { useAuth } from '@/auth'
import { permissionChecker } from '@/services/PermissionChecker'
import useTranslation from '@/utils/hooks/useTranslation'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

type ScheduleDetailResponse = {
    message: string
    schedule: Schedule
}

type ScheduleData = {
    scheduleIds: string[]
}

const ScheduleEdit = () => {
    const { id } = useParams()

    const { user } = useAuth()

    const { t } = useTranslation()

    const navigate = useNavigate()

    const { data, isLoading } = useSWR(
        [`/api/schedule${id}`, { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiScheduleDetail<ScheduleDetailResponse, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { token } = useToken()

    const handleFormSubmit = async (values: ScheduleFormSchema) => {
        setIsSubmiting(true)

        const response = await fetch(
            `${domain}/api/schedule/update_schedule/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(values),
            },
        )

        if (!response.ok) {
            toast.push(
                <Notification type="warning">
                    Something went wrong!
                </Notification>,
                {
                    placement: 'top-center',
                },
            )

            return
        }

        setIsSubmiting(false)
        toast.push(
            <Notification type="success">
                {t('page.schedule.no_data', 'Changes Saved!')}
            </Notification>,
            {
                placement: 'top-center',
            },
        )
        await sleep(800)
        window.location.href = '/schedule'
    }

    const getDefaultValues = () => {
        if (data) {
            const {
                employee,
                start_time,
                off_time,
                rest_days,
                from,
                to,
                total_hours,
            } = data.schedule

            return {
                employee,
                start_time,
                off_time,
                rest_days,
                from,
                to,
                total_hours,
            }
        }

        return {}
    }

    const handleConfirmDelete = async () => {
        setDeleteConfirmationOpen(true)

        if (
            permissionChecker(user, 'schedule', 'delete') === false &&
            user.account_type === 'Admin'
        ) {
            navigate('/access-denied')

            return
        } else {
            const scheduleIds: string[] = [id!]

            await apiDeleteSchedules<string[], ScheduleData>({
                scheduleIds,
            })

            toast.push(
                <Notification type="success">
                    {t(
                        'page.schedule.schedule_delete_success_message',
                        'Schedule deleted!',
                    )}
                </Notification>,
                { placement: 'top-center' },
            )
            window.location.href = '/schedule'
        }
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280} />
                    <h3 className="mt-8">
                        {t('page.schedule.no_data', 'No schedule found!')}
                    </h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <ScheduleForm
                        defaultValues={getDefaultValues() as ScheduleFormSchema}
                        newSchedule={false}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft />}
                                    onClick={handleBack}
                                >
                                    {t('page.back', 'Back')}
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash />}
                                        onClick={handleDelete}
                                    >
                                        {t('page.delete', 'Delete')}
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmiting}
                                    >
                                        {t('page.save', 'Save')}
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </ScheduleForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title={`${t('page.delete', 'Delete')} ${t('page.schedule.schedule', 'Schedules')}`}
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                        cancelText={t('page.employee.cancel', 'Cancel')}
                        confirmText={t('page.employee.confirm', 'Confirm')}
                    >
                        <p>
                            {t(
                                'page.schedule.delete_confirm_message',
                                'Are you sure you want to remove these schedules? This action cannot be undo.',
                            )}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default ScheduleEdit
