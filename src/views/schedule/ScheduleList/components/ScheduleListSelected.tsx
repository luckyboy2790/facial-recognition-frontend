import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useEmployeeList from '../hooks/useScheduleList'
import { TbChecks } from 'react-icons/tb'
import { useAuth } from '@/auth'
import useTranslation from '@/utils/hooks/useTranslation'

const ScheduleListSelected = () => {
    const { t } = useTranslation()

    const { selectedSchedule, mutate, deleteSchedules } = useEmployeeList()

    const { user } = useAuth()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = async () => {
        const scheduleIds: string[] = selectedSchedule
            .map((employee) => employee._id)
            .filter((id): id is string => id !== undefined)

        if (scheduleIds.length === 0) {
            console.error('No valid employee IDs to delete')
            return
        }

        try {
            await deleteSchedules(scheduleIds, user)
            setDeleteConfirmationOpen(false)
            mutate()
        } catch (error) {
            console.error('Error deleting companies:', error)
        }
    }

    return (
        <>
            {selectedSchedule.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedSchedule.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedSchedule.length}{' '}
                                                {t(
                                                    'page.schedule.schedule',
                                                    'Schedules',
                                                )}
                                            </span>
                                            <span>
                                                {t('page.select', 'selected')}
                                            </span>
                                        </span>
                                    </span>
                                )}
                            </span>

                            <div className="flex items-center">
                                <Button
                                    size="sm"
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    customColorClass={() =>
                                        'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                                    }
                                    onClick={handleDelete}
                                >
                                    {t('page.delete', 'Delete')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </StickyFooter>
            )}
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title={`${t('page.delete', 'Delete')} ${t('page.attendance.schedule', 'Schedules')}`}
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
                cancelText={t('page.employee.cancel', 'Cancel')}
                confirmText={t('page.employee.confirm', 'Confirm')}
            >
                <p>
                    {' '}
                    {t(
                        'page.schedule.delete_confirm_message',
                        'Are you sure you want to remove these schedules? This action cannot be undo.',
                    )}{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default ScheduleListSelected
