import { useMemo, useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Segment from '@/components/ui/Segment'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import ScrollBar from '@/components/ui/ScrollBar'
import { FormItem } from '@/components/ui/Form'
import { useRolePermissionsStore } from '../store/rolePermissionsStore'
import { accessAdminModules, accessEmployeeModules } from '../constants'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import { TbCheck } from 'react-icons/tb'
import type { MutateRolesPermissionsRolesResponse, Roles } from '../types'
import { Notification, Select, toast } from '@/components/ui'
import { useToken } from '@/store/authStore'
import { apiCompaniesList, apiTotalCompanies } from '@/services/CompanyService'
import { GetCompanyListResponse } from '@/views/companies/types'
import { useAuth } from '@/auth'
import useTranslation from '@/utils/hooks/useTranslation'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Disable', label: 'Disable' },
]

type RolesPermissionsAccessDialog = {
    roleList: Roles
    mutate: MutateRolesPermissionsRolesResponse
}

type OptionType = {
    label: string
    value: string
}

const RolesPermissionsAccessDialogComponent = ({
    roleList,
    mutate,
}: RolesPermissionsAccessDialog) => {
    const { t } = useTranslation()

    const userTypeOptions = [
        { label: t('page.user.admin', 'Admin'), value: 'admin' },
        { label: t('page.user.employee', 'Employee'), value: 'employee' },
    ]
    const { selectedRole, setSelectedRole, setRoleDialog, roleDialog } =
        useRolePermissionsStore()

    const [accessRight, setAccessRight] = useState<Record<string, string[]>>({})
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

    const [userType, setUserType] = useState<string | null>('admin')

    const { token } = useToken()

    const { user } = useAuth()

    const [roleName, setRoleName] = useState('')

    const [companyOptions, setCompanyOptions] = useState<OptionType[]>([])

    const [companyName, setCompanyName] = useState<string | null>(null)

    const [accessModules, setAccessModules] = useState(accessAdminModules)

    const handleClose = () => {
        setRoleName('')

        setSelectedStatus(null)

        setAccessRight({})

        setSelectedRole('')

        setCompanyName(null)

        setRoleDialog({
            type: '',
            open: false,
        })
    }

    useEffect(() => {
        if (userType === 'admin') {
            setAccessModules(accessAdminModules)
        } else if (userType === 'employee') {
            setAccessModules(accessEmployeeModules)
        }
    }, [userType])

    const handleSubmit = async () => {
        if (roleName === '' || !selectedStatus || !companyName) {
            toast.push(
                <Notification type="warning">
                    {t('page.fill_all_fields_message', 'Fill All Fields')}
                </Notification>,
                {
                    placement: 'top-center',
                },
            )

            return
        }

        const newRole = {
            name: roleName || 'Untitled Role',
            status: selectedStatus || '',
            company: companyName,
            userType: userType,
            accessRight,
        }

        try {
            const response = await fetch(
                `${domain}/api/user/${roleDialog.type === 'new' ? 'create_role' : `update_role/${selectedRole}`}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify(newRole),
                },
            )

            if (!response.ok) {
                throw new Error(`Failed to create role: ${response.statusText}`)
            }

            mutate()

            handleClose()
        } catch (error) {
            console.error('Error creating role:', error)
            alert('Failed to create role. Please try again.')
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
        if (accessRightValues.includes('read')) {
            setAccessRight((prev) => ({
                ...prev,
                [moduleId]: accessRightValues,
            }))
        } else {
            const filteredPermissions = accessRightValues.filter(
                (permission) => permission !== 'read',
            )
            setAccessRight((prev) => ({
                ...prev,
                [moduleId]: filteredPermissions,
            }))
        }

        if (
            accessRightValues.length > 0 &&
            !accessRightValues.includes('read')
        ) {
            setAccessRight((prev) => ({
                ...prev,
                [moduleId]: ['read', ...accessRightValues],
            }))
        }
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

    useEffect(() => {
        if (modules) {
            setRoleName(modules.name || '')

            setCompanyName(modules.company || null)

            setSelectedStatus(modules.status || null)

            setUserType(modules.userType || null)

            setAccessRight(modules.accessRight || {})
        }
    }, [modules])

    useEffect(() => {
        const fetchData = async () => {
            const response: GetCompanyListResponse = await apiTotalCompanies()

            setCompanyOptions(
                response.list.map((item) => ({
                    label: item.company_name,
                    value: item._id,
                })),
            )
        }

        fetchData()
    }, [])

    return (
        <Dialog
            isOpen={roleDialog.open}
            width={900}
            onClose={handleClose}
            onRequestClose={handleClose}
        >
            <h4>
                {roleDialog.type === 'new'
                    ? `${t('page.create', 'Create')} ${t('page.user.role', 'role')}`
                    : modules?.name}
            </h4>
            <ScrollBar className="mt-6 max-h-[600px] overflow-y-auto">
                <div className="px-4">
                    <FormItem label={t('page.user.role_name', 'Role name')}>
                        <Input
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                        />
                    </FormItem>

                    {user.account_type === 'SuperAdmin' && (
                        <FormItem label={t('page.user.company', 'Company')}>
                            <Select
                                placeholder={t(
                                    'page.select_placeholder',
                                    'Please select',
                                )}
                                options={companyOptions}
                                value={
                                    companyOptions.find(
                                        (option) =>
                                            option.value === companyName,
                                    ) || null
                                }
                                onChange={(selectedOption) =>
                                    setCompanyName(
                                        selectedOption?.value || null,
                                    )
                                }
                            />
                        </FormItem>
                    )}

                    <FormItem label={t('page.user.status', 'Status')}>
                        <Select
                            className="mb-4"
                            placeholder={t(
                                'page.select_placeholder',
                                'Select status',
                            )}
                            options={statusOptions}
                            value={
                                statusOptions.find(
                                    (option) => option.value === selectedStatus,
                                ) || null
                            }
                            onChange={(selectedOption) =>
                                setSelectedStatus(selectedOption?.value || null)
                            }
                        />
                    </FormItem>

                    <FormItem label={t('page.user.user_type', 'User Type')}>
                        <Select
                            className="mb-4"
                            placeholder={t(
                                'page.user.select_placeholder',
                                'Please select',
                            )}
                            options={userTypeOptions}
                            value={
                                userTypeOptions.find(
                                    (option) => option.value === userType,
                                ) || null
                            }
                            onChange={(selectedOption) =>
                                setUserType(selectedOption?.value || null)
                            }
                        />
                    </FormItem>

                    <span className="font-semibold mb-2">
                        {t('page.user.roles', 'Roles')}
                    </span>

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
                                    <h6 className="font-bold text-sm uppercase">
                                        {(() => {
                                            switch (module.name) {
                                                case 'DASHBOARD':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.dashboard',
                                                                'DASHBOARD',
                                                            )}
                                                        </span>
                                                    )
                                                case 'EMPLOYEES':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.employees',
                                                                'EMPLOYEES',
                                                            )}
                                                        </span>
                                                    )
                                                case 'ATTENDANCES':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.attendances',
                                                                'ATTENDANCES',
                                                            )}
                                                        </span>
                                                    )
                                                case 'SCHEDULES':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.schedules',
                                                                'SCHEDULES',
                                                            )}
                                                        </span>
                                                    )
                                                case 'LEAVE':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.leave',
                                                                'LEAVE',
                                                            )}
                                                        </span>
                                                    )
                                                case 'SETTINGS':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.settings',
                                                                'SETTINGS',
                                                            )}
                                                        </span>
                                                    )
                                                case 'REPORTS':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.reports',
                                                                'REPORTS',
                                                            )}
                                                        </span>
                                                    )
                                                case 'USER ROLES':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.user_roles',
                                                                'USER ROLES',
                                                            )}
                                                        </span>
                                                    )
                                                case 'DEPARTMENTS':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.departments',
                                                                'DEPARTMENTS',
                                                            )}
                                                        </span>
                                                    )
                                                case 'JOB TITLES':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.job_titles',
                                                                'JOB TITLES',
                                                            )}
                                                        </span>
                                                    )
                                                case 'LEAVE TYPES':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.leave_types',
                                                                'LEAVE TYPES',
                                                            )}
                                                        </span>
                                                    )
                                                case 'LEAVE GROUPS':
                                                    return (
                                                        <span>
                                                            {t(
                                                                'page.user.leave_group',
                                                                'LEAVE GROUPS',
                                                            )}
                                                        </span>
                                                    )
                                                default:
                                                    return (
                                                        <span>
                                                            {module.name}
                                                        </span>
                                                    )
                                            }
                                        })()}
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
                                                    {(() => {
                                                        switch (access.label) {
                                                            case 'Create':
                                                                return (
                                                                    <span>
                                                                        {t(
                                                                            'page.user.create',
                                                                            'Create',
                                                                        )}
                                                                    </span>
                                                                )
                                                            case 'Update':
                                                                return (
                                                                    <span>
                                                                        {t(
                                                                            'page.user.update',
                                                                            'Update',
                                                                        )}
                                                                    </span>
                                                                )
                                                            case 'Read':
                                                                return (
                                                                    <span>
                                                                        {t(
                                                                            'page.user.read',
                                                                            'Read',
                                                                        )}
                                                                    </span>
                                                                )
                                                            case 'Delete':
                                                                return (
                                                                    <span>
                                                                        {t(
                                                                            'page.user.delete',
                                                                            'Delete',
                                                                        )}
                                                                    </span>
                                                                )
                                                            case 'Archive':
                                                                return (
                                                                    <span>
                                                                        {t(
                                                                            'page.user.archive',
                                                                            'Archive',
                                                                        )}
                                                                    </span>
                                                                )
                                                            default:
                                                                return access.label
                                                        }
                                                    })()}
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
                            {t('page.user.cancel', 'Cancel')}
                        </Button>
                        <Button variant="solid" onClick={handleSubmit}>
                            {roleDialog.type === 'edit'
                                ? t('page.user.update', 'Update')
                                : t('page.user.create', 'Create')}
                        </Button>
                    </div>
                </div>
            </ScrollBar>
        </Dialog>
    )
}

export default RolesPermissionsAccessDialogComponent
