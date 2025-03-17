import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller, useFormContext } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'
import { Radio, Select } from '@/components/ui'
import { useEffect, useState } from 'react'
import { apiGetTotalEmployeeList } from '@/services/employeeService'
import { Employee } from '@/views/employees/EmployeeList/types'
import { Role } from '../UserList/types'
import { apiGetRolesPermissionsRoles } from '@/services/UserService'

type OverviewSectionProps = FormSectionBaseProps

type optionType = {
    label: string
    value: string
}

type GetCustomersListResponse = {
    employeeData: Employee[]
    total: number
}

type GetRolesPermissions = {
    roleList: Role[]
    message: string
}

const statusOptions = [
    {
        value: 'Enabled',
        label: 'Enabled',
    },
    {
        value: 'Disabled',
        label: 'Disabled',
    },
]

const OverviewSection = ({ control, errors }: OverviewSectionProps) => {
    const [employeeOptions, setEmployeeOptions] = useState<optionType[]>([])
    const [employeeData, setEmployeeData] = useState<Employee[]>([])
    const [roleOptions, setRoleOptions] = useState<optionType[]>([])

    const { setValue } = useFormContext()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employee_list: GetCustomersListResponse =
                    await apiGetTotalEmployeeList()

                setEmployeeOptions(
                    employee_list.employeeData.map((item) => ({
                        label: item.full_name,
                        value: item._id,
                    })),
                )

                setEmployeeData(employee_list.employeeData)

                const role_list: GetRolesPermissions =
                    await apiGetRolesPermissionsRoles()

                setRoleOptions(
                    role_list.roleList
                        .filter((item) => item.status === 'Active')
                        .map((item) => ({
                            label: item.name,
                            value: item._id,
                        })),
                )
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <Card>
            <h4 className="mb-6">Overview</h4>

            <FormItem
                label="Employee"
                invalid={Boolean(errors.employee)}
                errorMessage={errors.employee?.message}
            >
                <Controller
                    name="employee"
                    control={control}
                    render={({ field }) => (
                        <Select
                            placeholder="Please Select"
                            options={employeeOptions}
                            value={employeeOptions.find(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) => {
                                field.onChange(option?.value)

                                const selectedEmployee = employeeData.find(
                                    (emp) => emp._id === option?.value,
                                )

                                if (selectedEmployee) {
                                    setValue('email', selectedEmployee.email)
                                }
                            }}
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Email"
                invalid={Boolean(errors.email)}
                errorMessage={errors.email?.message}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Last Name"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            disabled
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Choose Account type"
                invalid={Boolean(errors.account_type)}
                errorMessage={errors.account_type?.message}
            >
                <Controller
                    name="account_type"
                    control={control}
                    render={({ field }) => (
                        <Radio.Group
                            vertical
                            value={field.value}
                            onChange={field.onChange}
                        >
                            <Radio value={'Employee'}>Employee</Radio>
                            <Radio value={'Admin'}>Admin</Radio>
                        </Radio.Group>
                    )}
                />
            </FormItem>

            <FormItem
                label="Role"
                invalid={Boolean(errors.role)}
                errorMessage={errors.role?.message}
            >
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <Select
                            placeholder="Please Select"
                            options={roleOptions}
                            value={roleOptions.find(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Status"
                invalid={Boolean(errors.status)}
                errorMessage={errors.status?.message}
            >
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            placeholder="Please Select"
                            options={statusOptions}
                            value={statusOptions.find(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Password"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="Password"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Confirm Password"
                    invalid={Boolean(errors.confirm_password)}
                    errorMessage={
                        errors.confirm_password?.message ||
                        errors.root?.confirm_password?.message
                    }
                >
                    <Controller
                        name="confirm_password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="Confirm Password"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default OverviewSection
