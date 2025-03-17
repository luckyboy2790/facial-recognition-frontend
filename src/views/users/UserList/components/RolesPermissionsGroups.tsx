import Button from '@/components/ui/Button'
import { useRolePermissionsStore } from '../store/rolePermissionsStore'
import { IoClose } from 'react-icons/io5'
import { TbArrowRight } from 'react-icons/tb'
import type { MutateRolesPermissionsRolesResponse, Roles } from '../types'
import { ConfirmDialog } from '@/components/shared'
import { useState } from 'react'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

type RolesPermissionsGroupsProps = {
    roleList: Roles
    mutate: MutateRolesPermissionsRolesResponse
}

const RolesPermissionsGroups = ({
    roleList,
    mutate,
}: RolesPermissionsGroupsProps) => {
    const { setSelectedRole, setRoleDialog } = useRolePermissionsStore()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [deleteRole, setDeleteRole] = useState('')

    const handleDelete = (id: string) => {
        setDeleteConfirmationOpen(true)

        setDeleteRole(id)
    }

    const handleEditRoleClick = (id: string) => {
        setSelectedRole(id)
        setRoleDialog({
            type: 'edit',
            open: true,
        })
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(
                `${domain}/api/user/delete_role/${deleteRole}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                },
            )

            if (!response.ok) {
                throw new Error(`Failed to create role: ${response.statusText}`)
            }

            mutate()

            setDeleteConfirmationOpen(false)
        } catch (error) {}
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {roleList.map((role) => (
                <div
                    key={role._id}
                    className="flex flex-col justify-between rounded-2xl p-5 bg-gray-100 dark:bg-gray-700 min-h-[140px]"
                >
                    <div className="flex items-center justify-between">
                        <h6 className="font-bold">{role.name}</h6>
                        <IoClose
                            className="font-bold cursor-pointer"
                            onClick={() => {
                                handleDelete(role._id)
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <Button
                            variant="plain"
                            size="sm"
                            className="py-0 h-auto"
                            icon={<TbArrowRight />}
                            iconAlignment="end"
                            onClick={() => handleEditRoleClick(role._id)}
                        >
                            Edit role
                        </Button>
                    </div>
                </div>
            ))}
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove customers"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    Are you sure you want to remove these customers? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </div>
    )
}

export default RolesPermissionsGroups
