import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { LeaveFormSchema, FormSectionBaseProps } from './types'
import TimeInput from '@/components/ui/TimeInput/TimeInput'
import { Employee } from '@/views/employees/EmployeeList/types'
import { apiGetTotalEmployeeList } from '@/services/employeeService'
import { DatePicker, Input, Select } from '@/components/ui'
import { format } from 'date-fns'

type OverviewSectionProps = FormSectionBaseProps

type OptionType = {
    value: string
    label: string
}

type EmployeeListResponse = {
    employeeData: Employee[]
}

const OverviewSection = ({
    control,
    errors,
    defaultValues,
    newLeave,
}: OverviewSectionProps & {
    defaultValues?: Partial<LeaveFormSchema>
}) => {
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

    const getCurrentDate = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')

        return `${year}-${month}-01`
    }

    return (
        <Card>
            <h4 className="mb-6">Leave Edit</h4>
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

            <FormItem
                label="Date"
                invalid={Boolean(errors.date)}
                errorMessage={errors.date?.message}
            >
                <Controller
                    name="date"
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
                label="Start time"
                invalid={Boolean(errors.time_in)}
                errorMessage={errors.time_in?.message}
            >
                <Controller
                    name="time_in"
                    control={control}
                    defaultValue={defaultValues?.time_in || ''}
                    render={({ field }) => (
                        <TimeInput
                            value={
                                field.value
                                    ? new Date(
                                          `${getCurrentDate()}T${field.value}`,
                                      )
                                    : null
                            }
                            onChange={(date) => {
                                if (date) {
                                    field.onChange(
                                        format(date, 'HH:mm:ss.SSS') + 'Z',
                                    )
                                }
                            }}
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Off Time"
                invalid={Boolean(errors.time_out)}
                errorMessage={errors.time_out?.message}
            >
                <Controller
                    name="time_out"
                    control={control}
                    defaultValue={defaultValues?.time_out || ''}
                    render={({ field }) => (
                        <TimeInput
                            value={
                                field.value
                                    ? new Date(
                                          `${getCurrentDate()}T${field.value}`,
                                      )
                                    : null
                            }
                            onChange={(date) => {
                                if (date) {
                                    field.onChange(
                                        format(date, 'HH:mm:ss.SSS') + 'Z',
                                    )
                                }
                            }}
                        />
                    )}
                />
            </FormItem>

            {!newLeave && (
                <FormItem label="Reason">
                    <Controller
                        name="reason"
                        control={control}
                        defaultValue={defaultValues?.reason || ''}
                        render={({ field }) => (
                            <Input
                                type="text"
                                textArea
                                autoComplete="off"
                                placeholder="Reason"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
            )}
        </Card>
    )
}

export default OverviewSection
