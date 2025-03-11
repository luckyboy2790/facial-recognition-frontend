import Card from '@/components/ui/Card'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'
import { DatePicker, TimeInput } from '@/components/ui'
import { NumericInput } from '@/components/shared'
import { useEffect, useState } from 'react'
import { apiGetTotalEmployeeList } from '@/services/employeeService'
import { Employee } from '@/views/employees/EmployeeList/types'

type OverviewSectionProps = FormSectionBaseProps

type OptionType = {
    value: string
    label: string
}

type EmployeeListResponse = {
    employeeData: Employee[]
}

const dayOptions: OptionType[] = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
]

const OverviewSection = ({ control, errors }: OverviewSectionProps) => {
    const [employeeOptions, setEmployeeOptions] = useState<OptionType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: EmployeeListResponse =
                    await apiGetTotalEmployeeList()

                const options: OptionType[] = data.employeeData.map(
                    (item: Employee) => {
                        return {
                            value: item._id,
                            label: item.full_name,
                        }
                    },
                )

                setEmployeeOptions(options)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <Card>
            <h4 className="mb-6">Schedule Edit</h4>
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
                            className="mb-4"
                            placeholder="Please Select"
                            options={employeeOptions}
                            value={employeeOptions.find(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Start time"
                    invalid={Boolean(errors.start_time)}
                    errorMessage={errors.start_time?.message}
                >
                    <Controller
                        name="start_time"
                        control={control}
                        render={({ field }) => (
                            <TimeInput
                                value={
                                    field.value
                                        ? new Date(`1970-01-01T${field.value}`)
                                        : null
                                }
                                onChange={(date) => {
                                    field.onChange(
                                        date
                                            ? date.toISOString().split('T')[1]
                                            : '',
                                    )
                                }}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Off time"
                    invalid={Boolean(errors.off_time)}
                    errorMessage={errors.off_time?.message}
                >
                    <Controller
                        name="off_time"
                        control={control}
                        render={({ field }) => (
                            <TimeInput
                                value={
                                    field.value
                                        ? new Date(`1970-01-01T${field.value}`)
                                        : null
                                }
                                onChange={(date) => {
                                    field.onChange(
                                        date
                                            ? date.toISOString().split('T')[1]
                                            : '',
                                    )
                                }}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <FormItem
                label="From"
                invalid={Boolean(errors.from)}
                errorMessage={errors.from?.message}
            >
                <Controller
                    name="from"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            placeholder="Date"
                            value={field.value ? new Date(field.value) : null}
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
                label="To"
                invalid={Boolean(errors.to)}
                errorMessage={errors.to?.message}
            >
                <Controller
                    name="to"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            placeholder="Date"
                            value={field.value ? new Date(field.value) : null}
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

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Total hours"
                    invalid={Boolean(errors.total_hours)}
                    errorMessage={errors.total_hours?.message}
                >
                    <Controller
                        name="total_hours"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                autoComplete="off"
                                placeholder="0"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Choose Rest days"
                    invalid={Boolean(errors.rest_days)}
                    errorMessage={errors.rest_days?.message}
                >
                    <Controller
                        name="rest_days"
                        control={control}
                        render={({ field }) => (
                            <Select
                                isMulti
                                className="mb-4"
                                placeholder="Please Select"
                                options={dayOptions}
                                value={dayOptions.filter((option) =>
                                    field.value.includes(option.value),
                                )}
                                onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions
                                        ? selectedOptions.map(
                                              (option) => option.value,
                                          )
                                        : []
                                    field.onChange(selectedValues)
                                }}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default OverviewSection
