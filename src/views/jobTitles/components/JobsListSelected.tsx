import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useEmployeeList from '../hooks/useJobsList'
import { TbChecks } from 'react-icons/tb'
import { useAuth } from '@/auth'
import useTranslation from '@/utils/hooks/useTranslation'

const CompanyListSelected = () => {
    const { selectedJobTitle, mutateJobTitles, deleteJobTitles } =
        useEmployeeList()

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
        const jobTitleIds: string[] = selectedJobTitle
            .map((department) => department._id)
            .filter((id): id is string => id !== undefined)

        if (selectedJobTitle.length === 0) {
            console.error('No valid department IDs to delete')
            return
        }

        try {
            await deleteJobTitles(jobTitleIds, user)
            setDeleteConfirmationOpen(false)
            mutateJobTitles()
        } catch (error) {
            console.error('Error deleting department:', error)
        }
    }

    return (
        <>
            {selectedJobTitle.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedJobTitle.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedJobTitle.length}{' '}
                                                {t(
                                                    'page.job_title.job_titles',
                                                    'Job Titles',
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
                title={`${t('page.delete', 'Delete')} ${t('page.job_title.job_titles', 'Job Titles')}`}
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
                        'page.job_title.delete_confirm_message',
                        'Are you sure you want to remove these job titles? This action cannot be undo.',
                    )}{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default CompanyListSelected
