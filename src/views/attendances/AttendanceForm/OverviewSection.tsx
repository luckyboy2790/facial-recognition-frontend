import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { AttendanceFormSchema, FormSectionBaseProps } from './types'
import { Employee } from '@/views/employees/EmployeeList/types'
import { apiGetTotalEmployeeList } from '@/services/employeeService'
import { Input, Select } from '@/components/ui'
import { TimePicker, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useAuth } from '@/auth'

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
    newAttendance,
}: OverviewSectionProps & {
    defaultValues?: Partial<AttendanceFormSchema>
}) => {
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
            <h4 className="mb-6">{`Attendance ${newAttendance ? 'Create' : 'Edit'}`}</h4>
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
                            className="w-full"
                            style={{ height: '48px', borderRadius: '12px' }}
                            value={
                                field.value
                                    ? dayjs(field.value, 'YYYY-MM-DD')
                                    : null
                            }
                            onChange={(date) => {
                                field.onChange(
                                    date?.format('YYYY-MM-DD') || null,
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
                        <TimePicker
                            use12Hours={setting.timeFormat === '1'}
                            format={
                                setting.timeFormat === '1' ? 'hh:mm a' : 'HH:mm'
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
                                field.onChange(value.format('HH:mm:ss.SSS'))
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
                        <TimePicker
                            use12Hours={setting.timeFormat === '1'}
                            format={
                                setting.timeFormat === '1' ? 'hh:mm a' : 'HH:mm'
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
                                field.onChange(value.format('HH:mm:ss.SSS'))
                            }}
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Break In Time"
                invalid={Boolean(errors.break_in)}
                errorMessage={errors.break_in?.message}
            >
                <Controller
                    name="break_in"
                    control={control}
                    defaultValue={defaultValues?.break_in || ''}
                    render={({ field }) => (
                        <TimePicker
                            use12Hours
                            format={
                                setting.timeFormat === '1' ? 'h:mm a' : 'h:mm'
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
                                field.onChange(value.format('HH:mm:ss.SSS'))
                            }}
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Break Out Time"
                invalid={Boolean(errors.break_out)}
                errorMessage={errors.break_out?.message}
            >
                <Controller
                    name="break_out"
                    control={control}
                    defaultValue={defaultValues?.break_out || ''}
                    render={({ field }) => (
                        <TimePicker
                            use12Hours
                            format={
                                setting.timeFormat === '1' ? 'h:mm a' : 'h:mm'
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
                                field.onChange(value.format('HH:mm:ss.SSS'))
                            }}
                        />
                    )}
                />
            </FormItem>

            {!newAttendance && (
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
