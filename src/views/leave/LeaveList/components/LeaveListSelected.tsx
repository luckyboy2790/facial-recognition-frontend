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

const LeaveListSelected = () => {
    const {
        selectedLeave,
        leaveList,
        mutate,
        leaveListTotal,
        setSelectAllLeave,
    } = useEmployeeList()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = () => {
        const newLeaveList = leaveList.filter((leave) => {
            return !selectedLeave.some((selected) => selected._id === leave._id)
        })
        setSelectAllLeave([])
        mutate(
            {
                list: newLeaveList,
                total: leaveListTotal - selectedLeave.length,
            },
            false,
        )
        setDeleteConfirmationOpen(false)
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
                                                {selectedLeave.length} Leaves
                                            </span>
                                            <span>selected</span>
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
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </StickyFooter>
            )}
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove leaves"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    Are you sure you want to remove these leaves? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default LeaveListSelected
