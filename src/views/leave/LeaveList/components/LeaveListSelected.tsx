import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Avatar from '@/components/ui/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import RichTextEditor from '@/components/shared/RichTextEditor'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useEmployeeList from '../hooks/useLeaveList'
import { TbChecks } from 'react-icons/tb'
import { useAuth } from '@/auth'
import useTranslation from '@/utils/hooks/useTranslation'

const LeaveListSelected = () => {
    const { selectedLeave, leaveList, mutate, deleteLeave } = useEmployeeList()

    const { t } = useTranslation()

    const { user } = useAuth()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = async () => {
        const leaveIds: string[] = leaveList
            .map((leave) => leave._id)
            .filter((id): id is string => id !== undefined)

        if (leaveIds.length === 0) {
            console.error('No valid employee IDs to delete')
            return
        }

        try {
            await deleteLeave(leaveIds, user)
            setDeleteConfirmationOpen(false)
            mutate()
        } catch (error) {
            console.error('Error deleting companies:', error)
        }
    }

    return (
        <>
            {selectedLeave.length > 0 && (
                <StickyFooter
                    className="flex bg-white justify-between dark:bg-gray-800 items-center py-4"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center">
                            <span>
                                {selectedLeave.length > 0 && (
                                    <span className="flex gap-2 items-center">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="flex font-semibold gap-1 items-center">
                                            <span className="heading-text">
                                                {selectedLeave.length}{' '}
                                                {t(
                                                    'page.leave.leave',
                                                    'Leaves',
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
                title={`${t('page.delete', 'Delete')} ${t('page.leave.leave', 'Leaves')}`}
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
                        'page.leave.delete_confirm_message',
                        'Are you sure you want to remove these leaves? This action cannot be undo.',
                    )}{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default LeaveListSelected
