import { useState } from 'react'
import StickyFooter from '@/components/shared/StickyFooter'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useEmployeeList from '../hooks/useCompanyList'
import { TbChecks } from 'react-icons/tb'
import useTranslation from '@/utils/hooks/useTranslation'

const CompanyListSelected = () => {
    const { t } = useTranslation()

    const { selectedCompany, mutate, deleteCompanies } = useEmployeeList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = async () => {
        const companyIds: string[] = selectedCompany
            .map((company) => company._id)
            .filter((id): id is string => id !== undefined)

        if (companyIds.length === 0) {
            console.error('No valid company IDs to delete')
            return
        }

        try {
            await deleteCompanies(companyIds)
            setDeleteConfirmationOpen(false)
            mutate()
        } catch (error) {
            console.error('Error deleting companies:', error)
        }
    }

    return (
        <>
            {selectedCompany.length > 0 && (
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                    defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <span>
                                {selectedCompany.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg text-primary">
                                            <TbChecks />
                                        </span>
                                        <span className="font-semibold flex items-center gap-1">
                                            <span className="heading-text">
                                                {selectedCompany.length}{' '}
                                                {t(
                                                    'page.company.companies',
                                                    'Companies',
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
                title={`${t('page.delete', 'Delete')} ${t('page.company.companies', 'Companies')}`}
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
                        'page.company.delete_confirm_message',
                        'Are you sure you want to remove these companies? This action cannot be undo.',
                    )}{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default CompanyListSelected
