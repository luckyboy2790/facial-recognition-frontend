import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller, UseFormSetValue } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'
import { useEffect, useState } from 'react'
import { Company } from '@/views/companies/types'
import { Department } from '@/views/departments/types'
import { JobTitle } from '@/views/jobTitles/types'
import { apiGetAllData } from '@/services/employeeService'
import { Select } from '@/components/ui'
import { NumericInput } from '@/components/shared'
import { useAuth } from '@/auth'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import useTranslation from '@/utils/hooks/useTranslation'

type AddressSectionProps = FormSectionBaseProps & {
    setValue: UseFormSetValue<any>
    companyId: string | undefined
}
type optionType = {
    label: string
    value: string
}

type leaveGroupResponseType = {
    _id: string
    group_name: string
    description: number
    company: string
    leavePrivilege: string[]
    status: string
}

type responseType = {
    company: Company[]
    department: Department[]
    jobTitle: JobTitle[]
    leaveGroup: leaveGroupResponseType[]
}

const EmployeeDetailSection = ({
    control,
    errors,
    setValue,
    companyId,
}: AddressSectionProps) => {
    const { t } = useTranslation()

    const [companyOptions, setCompanyOptions] = useState<optionType[]>([])
    const [departmentOptions, setDepartmentOptions] = useState<optionType[]>([])
    const [jobTitleOptions, setJobTitleOptions] = useState<optionType[]>([])
    const [leaveGroupOptions, setLeaveGroupOptions] = useState<optionType[]>([])

    const [company, setCompany] = useState<string | undefined>('')

    const { user } = useAuth()

    useEffect(() => {
        setCompany(companyId)
    }, [companyId])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: responseType = await apiGetAllData()

                setCompanyOptions(
                    data.company.map((item) => ({
                        label: item.company_name,
                        value: item._id,
                    })),
                )

                if (user.account_type === 'SuperAdmin') {
                    setDepartmentOptions(
                        data.department
                            .filter((item) => item.company === company)
                            .map((item) => ({
                                label: item.department_name,
                                value: item._id,
                            })),
                    )

                    setJobTitleOptions(
                        data.jobTitle
                            .filter((item) => item.company === company)
                            .map((item) => ({
                                label: item.job_title,
                                value: item._id,
                            })),
                    )

                    setLeaveGroupOptions(
                        data.leaveGroup
                            .filter((item) => item.company === company)
                            .map((item) => ({
                                label: item.group_name,
                                value: item._id,
                            })),
                    )
                } else {
                    setDepartmentOptions(
                        data.department.map((item) => ({
                            label: item.department_name,
                            value: item._id,
                        })),
                    )

                    setJobTitleOptions(
                        data.jobTitle.map((item) => ({
                            label: item.job_title,
                            value: item._id,
                        })),
                    )

                    setLeaveGroupOptions(
                        data.leaveGroup.map((item) => ({
                            label: item.group_name,
                            value: item._id,
                        })),
                    )
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [company])

    const employmentTypeOption = [
        { label: t('page.employee.regular', 'Regular'), value: 'Regular' },
        { label: t('page.employee.trainee', 'Trainee'), value: 'Trainee' },
    ]

    const employmentStatusOption = [
        { label: t('page.employee.active', 'Active'), value: 'Active' },
        { label: t('page.employee.archived', 'Archived'), value: 'Archived' },
    ]

    return (
        <>
            <Card>
                <h4 className="mb-6">
                    {t(
                        'page.employee.employee_detail',
                        'Employee Details(Designation)',
                    )}
                </h4>

                {user.account_type === 'SuperAdmin' && (
                    <FormItem
                        label={t('page.employee.company', 'Company')}
                        invalid={Boolean(errors.company)}
                        errorMessage={errors.company?.message}
                    >
                        <Controller
                            name="company"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    className="mb-4"
                                    placeholder={t(
                                        'page.select_placeholder',
                                        'Please Select',
                                    )}
                                    options={companyOptions}
                                    value={companyOptions.find(
                                        (option) =>
                                            option.value === field.value,
                                    )}
                                    onChange={(option) => {
                                        field.onChange(option?.value)
                                        setCompany(option?.value)
                                    }}
                                />
                            )}
                        />
                    </FormItem>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label={t('page.employee.department', 'Department')}
                        invalid={Boolean(errors.department)}
                        errorMessage={errors.department?.message}
                    >
                        <Controller
                            name="department"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    className="mb-4"
                                    placeholder={t(
                                        'page.select_placeholder',
                                        'Please Select',
                                    )}
                                    options={departmentOptions}
                                    value={departmentOptions.find(
                                        (option) =>
                                            option.value === field.value,
                                    )}
                                    onChange={(option) => {
                                        field.onChange(option?.value)
                                        if (
                                            user.account_type === 'Admin' &&
                                            user.company
                                        ) {
                                            setValue('company', user.company, {
                                                shouldValidate: true,
                                            })
                                        }
                                    }}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label={t('page.employee.job_title', 'Job Title')}
                        invalid={Boolean(errors.jobTitle)}
                        errorMessage={errors.jobTitle?.message}
                    >
                        <Controller
                            name="jobTitle"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    className="mb-4"
                                    placeholder={t(
                                        'page.select_placeholder',
                                        'Please Select',
                                    )}
                                    options={jobTitleOptions}
                                    value={jobTitleOptions.find(
                                        (option) =>
                                            option.value === field.value,
                                    )}
                                    onChange={(option) => {
                                        field.onChange(option?.value)
                                        if (
                                            user.account_type === 'Admin' &&
                                            user.company
                                        ) {
                                            setValue('company', user.company, {
                                                shouldValidate: true,
                                            })
                                        }
                                    }}
                                />
                            )}
                        />
                    </FormItem>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label={t('page.employee.pin_password', 'PIN password')}
                        invalid={Boolean(errors.pin)}
                        errorMessage={errors.pin?.message}
                    >
                        <Controller
                            name="pin"
                            control={control}
                            render={({ field }) => (
                                <NumericInput
                                    autoComplete="off"
                                    placeholder={t(
                                        'page.employee.pin_password_placeholder',
                                        'PIN (Between 6~10 numeric digits)',
                                    )}
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label={t(
                            'page.employee.email_company',
                            'Email Address (Company)',
                        )}
                        invalid={Boolean(errors.companyEmail)}
                        errorMessage={errors.companyEmail?.message}
                    >
                        <Controller
                            name="companyEmail"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    className="lowercase"
                                    placeholder={t(
                                        'page.employee.email',
                                        'email',
                                    )}
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                </div>

                <FormItem
                    label={t('page.employee.leave_group', 'Leave Group')}
                    invalid={Boolean(errors.leaveGroup)}
                    errorMessage={errors.leaveGroup?.message}
                >
                    <Controller
                        name="leaveGroup"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className="mb-4"
                                placeholder={t(
                                    'page.select_placeholder',
                                    'Please Select',
                                )}
                                options={leaveGroupOptions}
                                value={leaveGroupOptions.find(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(option) => {
                                    field.onChange(option?.value)
                                    if (
                                        user.account_type === 'Admin' &&
                                        user.company
                                    ) {
                                        setValue('company', user.company, {
                                            shouldValidate: true,
                                        })
                                    }
                                }}
                            />
                        )}
                    />
                </FormItem>
            </Card>
            <Card>
                <h4 className="mb-6">
                    {t(
                        'page.employee.employment_information',
                        'Employment Information',
                    )}
                </h4>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label={t(
                            'page.employee.employment_type',
                            'Employment Type',
                        )}
                        invalid={Boolean(errors.employmentType)}
                        errorMessage={errors.employmentType?.message}
                    >
                        <Controller
                            name="employmentType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    className="mb-4"
                                    placeholder={t(
                                        'page.select_placeholder',
                                        'Please Select',
                                    )}
                                    options={employmentTypeOption}
                                    value={employmentTypeOption.find(
                                        (option) =>
                                            option.value === field.value,
                                    )}
                                    onChange={(option) => {
                                        field.onChange(option?.value)
                                        if (
                                            user.account_type === 'Admin' &&
                                            user.company
                                        ) {
                                            setValue('company', user.company, {
                                                shouldValidate: true,
                                            })
                                        }
                                    }}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label={t(
                            'page.employee.employment_status',
                            'Employment Status',
                        )}
                        invalid={Boolean(errors.employmentStatus)}
                        errorMessage={errors.employmentStatus?.message}
                    >
                        <Controller
                            name="employmentStatus"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    className="mb-4"
                                    placeholder={t(
                                        'page.select_placeholder',
                                        'Please Select',
                                    )}
                                    options={employmentStatusOption}
                                    value={employmentStatusOption.find(
                                        (option) =>
                                            option.value === field.value,
                                    )}
                                    onChange={(option) => {
                                        field.onChange(option?.value)
                                        if (
                                            user.account_type === 'Admin' &&
                                            user.company
                                        ) {
                                            setValue('company', user.company, {
                                                shouldValidate: true,
                                            })
                                        }
                                    }}
                                />
                            )}
                        />
                    </FormItem>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label={t(
                            'page.employee.official_start_date',
                            'Official Start Date',
                        )}
                        invalid={Boolean(errors.officialStartDate)}
                        errorMessage={errors.officialStartDate?.message}
                    >
                        <Controller
                            name="officialStartDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    placeholder={t(
                                        'page.date_placeholder',
                                        'Date',
                                    )}
                                    className="w-full"
                                    style={{
                                        height: '48px',
                                        borderRadius: '12px',
                                    }}
                                    value={
                                        field.value
                                            ? dayjs(field.value, 'YYYY-MM-DD')
                                            : null
                                    }
                                    onChange={(date) => {
                                        field.onChange(
                                            date.format('YYYY-MM-DD'),
                                        )
                                    }}
                                />
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label={t(
                            'page.employee.date_regularized',
                            'Date Regularized',
                        )}
                        invalid={Boolean(errors.dateRegularized)}
                        errorMessage={errors.dateRegularized?.message}
                    >
                        <Controller
                            name="dateRegularized"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    placeholder={t(
                                        'page.date_placeholder',
                                        'Date',
                                    )}
                                    className="w-full"
                                    style={{
                                        height: '48px',
                                        borderRadius: '12px',
                                    }}
                                    value={
                                        field.value
                                            ? dayjs(field.value, 'YYYY-MM-DD')
                                            : null
                                    }
                                    onChange={(date) => {
                                        field.onChange(
                                            date.format('YYYY-MM-DD'),
                                        )
                                    }}
                                />
                            )}
                        />
                    </FormItem>
                </div>
            </Card>
        </>
    )
}

export default EmployeeDetailSection
