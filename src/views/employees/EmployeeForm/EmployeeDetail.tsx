import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'
import { useEffect, useState } from 'react'
import { Company } from '@/views/companies/types'
import { Department } from '@/views/departments/types'
import { JobTitle } from '@/views/jobTitles/types'
import { apiGetAllData } from '@/services/employeeService'
import { DatePicker, Select } from '@/components/ui'
import { NumericInput } from '@/components/shared'

type AddressSectionProps = FormSectionBaseProps
type optionType = {
    label: string
    value: string
}

type leaveGroupResponseType = {
    _id: string
    group_name: string
    description: number
    leavePrivilege: string[]
    status: string
}

type responseType = {
    company: Company[]
    department: Department[]
    jobTitle: JobTitle[]
    leaveGroup: leaveGroupResponseType[]
}

const AddressSection = ({ control, errors }: AddressSectionProps) => {
    const [companyOptions, setCompanyOptions] = useState<optionType[]>([])
    const [departmentOptions, setDepartmentOptions] = useState<optionType[]>([])
    const [jobTitleOptions, setJobTitleOptions] = useState<optionType[]>([])
    const [leaveGroupOptions, setLeaveGroupOptions] = useState<optionType[]>([])

    useEffect(() => {
        console.log(control)
    }, [control])

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

                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const employmentTypeOption = [
        { label: 'Regular', value: 'Regular' },
        { label: 'Trainee', value: 'Trainee' },
    ]

    const employmentStatusOption = [
        { label: 'Active', value: 'Actived' },
        { label: 'Archived', value: 'Archived' },
    ]

    return (
        <>
            <Card>
                <h4 className="mb-6">Employee Details(Designation)</h4>

                <FormItem
                    label="Company"
                    invalid={Boolean(errors.company)}
                    errorMessage={errors.company?.message}
                >
                    <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className="mb-4"
                                placeholder="Please Select"
                                options={companyOptions}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Department"
                    invalid={Boolean(errors.department)}
                    errorMessage={errors.department?.message}
                >
                    <Controller
                        name="department"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className="mb-4"
                                placeholder="Please Select"
                                options={departmentOptions}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Job Title"
                    invalid={Boolean(errors.jobTitle)}
                    errorMessage={errors.jobTitle?.message}
                >
                    <Controller
                        name="jobTitle"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className="mb-4"
                                placeholder="Please Select"
                                options={jobTitleOptions}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="PIN password"
                    invalid={Boolean(errors.pin)}
                    errorMessage={errors.pin?.message}
                >
                    <Controller
                        name="pin"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                autoComplete="off"
                                placeholder="PIN (Between 6~10 numeric digits)"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Email Address (Company)"
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
                                placeholder="email"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Leave Group"
                    invalid={Boolean(errors.leaveGroup)}
                    errorMessage={errors.leaveGroup?.message}
                >
                    <Controller
                        name="leaveGroup"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className="mb-4"
                                placeholder="Please Select"
                                options={leaveGroupOptions}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>
            </Card>
            <Card>
                <h4 className="mb-6">Employee Details(Designation)</h4>

                <FormItem
                    label="Employment Type"
                    invalid={Boolean(errors.employmentType)}
                    errorMessage={errors.employmentType?.message}
                >
                    <Controller
                        name="employmentType"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className="mb-4"
                                placeholder="Please Select"
                                options={employmentTypeOption}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Employment Status"
                    invalid={Boolean(errors.employmentStatus)}
                    errorMessage={errors.employmentStatus?.message}
                >
                    <Controller
                        name="employmentStatus"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className="mb-4"
                                placeholder="Please Select"
                                options={employmentStatusOption}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Official Start Date"
                    invalid={Boolean(errors.officialStartDate)}
                    errorMessage={errors.officialStartDate?.message}
                >
                    <Controller
                        name="officialStartDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                placeholder="DATE"
                                onChange={(date) => {
                                    field.onChange(
                                        date
                                            ? date.toISOString().split('T')[0]
                                            : '',
                                    )
                                }}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Date Regularized"
                    invalid={Boolean(errors.dateRegularized)}
                    errorMessage={errors.dateRegularized?.message}
                >
                    <Controller
                        name="dateRegularized"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                placeholder="DATE"
                                onChange={(date) => {
                                    field.onChange(
                                        date
                                            ? date.toISOString().split('T')[0]
                                            : '',
                                    )
                                }}
                            />
                        )}
                    />
                </FormItem>
            </Card>
        </>
    )
}

export default AddressSection
