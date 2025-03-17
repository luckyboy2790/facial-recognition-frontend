import { useMemo, useState, useRef } from 'react'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Segment from '@/components/ui/Segment'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import ScrollBar from '@/components/ui/ScrollBar'
import { FormItem } from '@/components/ui/Form'
import hooks from '@/components/ui/hooks'
import { useRolePermissionsStore } from '../store/rolePermissionsStore'
import { accessModules } from '../constants'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import sleep from '@/utils/sleep'
import {
    TbUserCog,
    TbBox,
    TbSettings,
    TbFiles,
    TbFileChart,
    TbCheck,
} from 'react-icons/tb'
import type { MutateRolesPermissionsRolesResponse, Roles } from '../types'
import type { ReactNode } from 'react'
import { Select } from '@/components/ui'
import Checkbox from '@/components/ui/Checkbox/Checkbox'

const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Disable', label: 'Disable' },
]

type RolesPermissionsAccessDialog = {
    roleList: Roles
    mutate: MutateRolesPermissionsRolesResponse
}

const RolesPermissionsAccessDialogComponent = ({
    roleList,
    mutate,
}: RolesPermissionsAccessDialog) => {
    const { selectedRole, setSelectedRole, setRoleDialog, roleDialog } =
        useRolePermissionsStore()

    const [accessRight, setAccessRight] = useState<Record<string, string[]>>({})
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

    const roleNameRef = useRef<HTMLInputElement>(null)

    const handleClose = () => {
        setRoleDialog({
            type: '',
            open: false,
        })
    }

    const handleSubmit = async () => {
        const newRole = {
            name: roleNameRef.current?.value || 'Untitled Role',
            status: selectedStatus || '',
            accessRight,
        }

        try {
            const response = await fetch(
                'http://localhost:5000/api/user/create_permission',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newRole),
                },
            )

            if (!response.ok) {
                throw new Error(
                    `Failed to create permission: ${response.statusText}`,
                )
            }

            mutate()
            handleClose()
        } catch (error) {
            console.error('Error creating permission:', error)
            alert('Failed to create permission. Please try again.')
        }
    }

    const modules = useMemo(() => {
        return roleList.find((role) => role._id === selectedRole)
    }, [selectedRole, roleList])

    const toggleAllPermissions = (moduleId: string, checked: boolean) => {
        const modulePermissions =
            accessModules
                .find((m) => m.id === moduleId)
                ?.accessor.map((access) => access.value) || []

        setAccessRight((prev) => {
            const updatedAccessRight = { ...prev }
            updatedAccessRight[moduleId] = checked ? modulePermissions : []
            return { ...updatedAccessRight }
        })
    }

    const handleChange = (accessRightValues: string[], moduleId: string) => {
        setAccessRight((prev) => ({
            ...prev,
            [moduleId]: accessRightValues,
        }))
    }

    const getCheckboxState = (moduleId: string) => {
        const module = accessModules.find((m) => m.id === moduleId)
        const selectedPermissions = accessRight[moduleId] || []
        const totalPermissions =
            module?.accessor.map((access) => access.value) || []

        if (selectedPermissions.length === 0) return false
        if (selectedPermissions.length === totalPermissions.length) return true
        return 'indeterminate'
    }

    return (
        <Dialog
            isOpen={roleDialog.open}
            width={900}
            onClose={handleClose}
            onRequestClose={handleClose}
        >
            <h4>{roleDialog.type === 'new' ? 'Create role' : modules?.name}</h4>
            <ScrollBar className="mt-6 max-h-[600px] overflow-y-auto">
                <div className="px-4">
                    <FormItem label="Role name">
                        <Input ref={roleNameRef} />
                    </FormItem>
                    <FormItem label="Status">
                        <Select
                            className="mb-4"
                            placeholder="Select status"
                            options={statusOptions}
                            value={statusOptions.find(
                                (option) => option.value === selectedStatus,
                            )}
                            onChange={(selectedOption) =>
                                setSelectedStatus(selectedOption?.value || null)
                            }
                        />
                    </FormItem>
                    <span className="font-semibold mb-2">Roles</span>

                    {accessModules.map((module, index) => (
                        <div
                            key={module.id}
                            className={classNames(
                                'flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-gray-200 dark:border-gray-600',
                                !isLastChild(accessModules, index) &&
                                    'border-b',
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={
                                            getCheckboxState(module.id) === true
                                        }
                                        ref={(el) => {
                                            if (el)
                                                el.indeterminate =
                                                    getCheckboxState(
                                                        module.id,
                                                    ) === 'indeterminate'
                                        }}
                                        onChange={(e) =>
                                            toggleAllPermissions(
                                                module.id,
                                                e.target.checked,
                                            )
                                        }
                                        className="cursor-pointer"
                                    />
                                    <h6 className="font-bold text-sm">
                                        {module.name}
                                    </h6>
                                </label>
                            </div>

                            <div className="flex items-center gap-4">
                                <Segment
                                    className="bg-transparent dark:bg-transparent"
                                    selectionType="multiple"
                                    value={accessRight[module.id] || []}
                                    onChange={(val) =>
                                        handleChange(val as string[], module.id)
                                    }
                                >
                                    {module.accessor.map((access) => (
                                        <Segment.Item
                                            key={module.id + access.value}
                                            value={access.value}
                                        >
                                            {({
                                                active,
                                                onSegmentItemClick,
                                            }) => (
                                                <Button
                                                    variant="default"
                                                    icon={
                                                        active ? (
                                                            <TbCheck className="text-primary text-xl" />
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                    active={active}
                                                    type="button"
                                                    className="md:min-w-[100px]"
                                                    size="sm"
                                                    customColorClass={({
                                                        active,
                                                    }) =>
                                                        classNames(
                                                            active &&
                                                                'bg-transparent dark:bg-transparent text-primary border-primary ring-1 ring-primary',
                                                        )
                                                    }
                                                    onClick={onSegmentItemClick}
                                                >
                                                    {access.label}
                                                </Button>
                                            )}
                                        </Segment.Item>
                                    ))}
                                </Segment>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            onClick={
                                roleDialog.type === 'edit'
                                    ? handleClose
                                    : handleSubmit
                            }
                        >
                            {roleDialog.type === 'edit' ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </div>
            </ScrollBar>
        </Dialog>
    )
}

export default RolesPermissionsAccessDialogComponent
