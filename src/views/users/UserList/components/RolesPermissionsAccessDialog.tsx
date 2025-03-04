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

type RolesPermissionsAccessDialog = {
    roleList: Roles
    mutate: MutateRolesPermissionsRolesResponse
}

const moduleIcon: Record<string, ReactNode> = {
    users: <TbUserCog />,
    products: <TbBox />,
    configurations: <TbSettings />,
    files: <TbFiles />,
    reports: <TbFileChart />,
}

const { useUniqueId } = hooks

const RolesPermissionsAccessDialog = ({
    roleList,
    mutate,
}: RolesPermissionsAccessDialog) => {
    const { selectedRole, setSelectedRole, setRoleDialog, roleDialog } =
        useRolePermissionsStore()

    const [accessRight, setAccessRight] = useState<Record<string, string[]>>({})

    const roleNameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)

    const newId = useUniqueId('role-')

    const handleClose = () => {
        setRoleDialog({
            type: '',
            open: false,
        })
    }

    const handleUpdate = async () => {
        handleClose()
        await sleep(300)
        setSelectedRole('')
    }

    const handleSubmit = async () => {
        const newRoleList = structuredClone(roleList)
        newRoleList.push({
            id: newId,
            name: roleNameRef.current?.value || `Untitle-${newId}`,
            description: descriptionRef.current?.value || '',
            users: [],
            accessRight,
        })
        mutate(newRoleList, false)
        handleClose()
    }

    const modules = useMemo(() => {
        return roleList.find((role) => role.id === selectedRole)
    }, [selectedRole, roleList])

    const handleChange = (accessRight: string[], key: string) => {
        if (roleDialog.type === 'new') {
            setAccessRight((value) => {
                value[key] = accessRight
                return value
            })
        }

        if (roleDialog.type === 'edit') {
            const newRoleList = structuredClone(roleList).map((role) => {
                if (role.id === selectedRole) {
                    role.accessRight[key] = accessRight
                }

                return role
            })

            mutate(newRoleList, false)
        }
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
                    {roleDialog.type === 'new' && (
                        <>
                            <FormItem label="Role name">
                                <Input ref={roleNameRef} />
                            </FormItem>
                            <FormItem label="Description">
                                <Input ref={descriptionRef} textArea />
                            </FormItem>
                            <span className="font-semibold mb-2">
                                Permission
                            </span>
                        </>
                    )}
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
                                <Avatar
                                    className="bg-transparent dark:bg-transparent p-2 border-2 border-gray-200 dark:border-gray-600 text-primary"
                                    size={50}
                                    icon={moduleIcon[module.id]}
                                    shape="round"
                                />
                                <div>
                                    <h6 className="font-bold">{module.name}</h6>
                                    <span>{module.description}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Segment
                                    className="bg-transparent dark:bg-transparent"
                                    selectionType="multiple"
                                    value={modules?.accessRight[module.id]}
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
                                            }) => {
                                                return (
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
                                                        onClick={
                                                            onSegmentItemClick
                                                        }
                                                    >
                                                        {access.label}
                                                    </Button>
                                                )
                                            }}
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
                                    ? handleUpdate
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

export default RolesPermissionsAccessDialog
