import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useEmployeeList from '../hooks/useEmployeeList'
import { TbChecks } from 'react-icons/tb'
import { useAuth } from '@/auth'
import useTranslation from '@/utils/hooks/useTranslation'

const UserListSelected = () => {
    const { t } = useTranslation()

    const { selectedUser, mutate, deleteUsers } = useEmployeeList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const { user } = useAuth()

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = async () => {
        const userIds: string[] = selectedUser
            .map((employee) => employee._id)
            .filter((id): id is string => id !== undefined)

        if (userIds.length === 0) {
            console.error('No valid employee IDs to delete')
            return
        }

        try {
            await deleteUsers(userIds, user)
            setDeleteConfirmationOpen(false)
            mutate()
        } catch (error) {
            console.error('Error deleting companies:', error)
        }
    }

    return (
        <>
            {selectedUser.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedUser.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedUser.length}{' '}
                                                {t('page.user.user', 'Users')}
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
                title={`${t('page.delete', 'Delete')} ${t('page.user.user', 'Users')}`}
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
                        'page.user.delete_user_confirm_message',
                        'Are you sure you want to remove these users? This action cannot be undo.',
                    )}{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default UserListSelected
