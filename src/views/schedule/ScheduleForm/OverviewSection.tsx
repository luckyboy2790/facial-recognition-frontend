import Card from '@/components/ui/Card'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps, ScheduleFormSchema } from './types'
import { TimeInput } from '@/components/ui'
import { NumericInput } from '@/components/shared'
import { useEffect, useState } from 'react'
import { apiGetTotalEmployeeList } from '@/services/employeeService'
import { Employee } from '@/views/employees/EmployeeList/types'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { DatePicker, TimePicker } from 'antd'
import { useAuth } from '@/auth'

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

const OverviewSection = ({
    control,
    errors,
    defaultValues,
}: OverviewSectionProps & { defaultValues?: Partial<ScheduleFormSchema> }) => {
    const [employeeOptions, setEmployeeOptions] = useState<OptionType[]>([])

    const { setting } = useAuth()

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
                        defaultValue={defaultValues?.start_time || ''}
                        render={({ field }) => (
                            <TimePicker
                                format={
                                    setting.timeFormat === '1'
                                        ? 'HH:mm a'
                                        : 'HH:mm'
                                }
                                className="w-full"
                                size="large"
                                style={{ height: '48px', borderRadius: '12px' }}
                                value={
                                    field.value
                                        ? dayjs(field.value, 'HH:mm:ss.SSS')
                                        : null
                                }
                                onChange={(value: any) => {
                                    console.log(value.format('HH:mm:ss.SSS'))
                                    field.onChange(value.format('HH:mm:ss.SSS'))
                                }}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Off Time"
                    invalid={Boolean(errors.off_time)}
                    errorMessage={errors.off_time?.message}
                >
                    <Controller
                        name="off_time"
                        control={control}
                        defaultValue={defaultValues?.off_time || ''}
                        render={({ field }) => (
                            <TimePicker
                                format={
                                    setting.timeFormat === '1'
                                        ? 'HH:mm a'
                                        : 'HH:mm'
                                }
                                className="w-full"
                                size="large"
                                style={{ height: '48px', borderRadius: '12px' }}
                                value={
                                    field.value
                                        ? dayjs(field.value, 'HH:mm:ss.SSS')
                                        : null
                                }
                                onChange={(value: any) => {
                                    console.log(value.format('HH:mm:ss.SSS'))
                                    field.onChange(value.format('HH:mm:ss.SSS'))
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
                            className="w-full"
                            style={{ height: '48px', borderRadius: '12px' }}
                            value={
                                field.value
                                    ? dayjs(field.value, 'YYYY-MM-DD')
                                    : null
                            }
                            onChange={(date) => {
                                field.onChange(date.format('YYYY-MM-DD'))
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
                            className="w-full"
                            style={{ height: '48px', borderRadius: '12px' }}
                            value={
                                field.value
                                    ? dayjs(field.value, 'YYYY-MM-DD')
                                    : null
                            }
                            onChange={(date) => {
                                field.onChange(date.format('YYYY-MM-DD'))
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
