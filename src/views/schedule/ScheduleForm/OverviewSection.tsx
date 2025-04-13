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
import useTranslation from '@/utils/hooks/useTranslation'

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
    newSchedule,
}: OverviewSectionProps & {
    defaultValues?: Partial<ScheduleFormSchema>
    newSchedule: boolean | undefined
}) => {
    const { t } = useTranslation()

    const dayOptions: OptionType[] = [
        { value: 'Monday', label: t('page.schedule.monday', 'Monday') },
        { value: 'Tuesday', label: t('page.schedule.tuesday', 'Tuesday') },
        {
            value: 'Wednesday',
            label: t('page.schedule.wednesday', 'Wednesday'),
        },
        { value: 'Thursday', label: t('page.schedule.thursday', 'Thursday') },
        { value: 'Friday', label: t('page.schedule.friday', 'Friday') },
        { value: 'Saturday', label: t('page.schedule.saturday', 'Saturday') },
        { value: 'Sunday', label: t('page.schedule.sunday', 'Sunday') },
    ]

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
            <h4 className="mb-6">
                {t('page.schedule.schedule', 'Schedule')}{' '}
                {newSchedule === true
                    ? t('page.create', 'Create')
                    : t('page.edit', 'Edit')}
            </h4>
            <FormItem
                label={t('page.schedule.employee', 'Employee')}
                invalid={Boolean(errors.employee)}
                errorMessage={errors.employee?.message}
            >
                <Controller
                    name="employee"
                    control={control}
                    render={({ field }) => (
                        <Select
                            className="mb-4"
                            placeholder={t(
                                'page.select_placeholder',
                                'Please Select',
                            )}
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
                    label={t('page.schedule.start_time', 'Start time')}
                    invalid={Boolean(errors.start_time)}
                    errorMessage={errors.start_time?.message}
                >
                    <Controller
                        name="start_time"
                        control={control}
                        defaultValue={defaultValues?.start_time || ''}
                        render={({ field }) => (
                            <TimePicker
                                use12Hours
                                format={
                                    setting.timeFormat === '1'
                                        ? 'h:mm a'
                                        : 'h:mm'
                                }
                                className="w-full"
                                placeholder={t(
                                    'page.time_placeholder',
                                    'Select time',
                                )}
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
                    label={t('page.schedule.off_time', 'Off Time')}
                    invalid={Boolean(errors.off_time)}
                    errorMessage={errors.off_time?.message}
                >
                    <Controller
                        name="off_time"
                        control={control}
                        defaultValue={defaultValues?.off_time || ''}
                        render={({ field }) => (
                            <TimePicker
                                use12Hours
                                format={
                                    setting.timeFormat === '1'
                                        ? 'h:mm a'
                                        : 'h:mm'
                                }
                                placeholder={t(
                                    'page.time_placeholder',
                                    'Select time',
                                )}
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
            </div>

            <FormItem
                label={t('page.schedule.from', 'From')}
                invalid={Boolean(errors.from)}
                errorMessage={errors.from?.message}
            >
                <Controller
                    name="from"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            placeholder={t(
                                'page.date_placeholder',
                                'Select date',
                            )}
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
                label={t('page.schedule.to', 'To')}
                invalid={Boolean(errors.to)}
                errorMessage={errors.to?.message}
            >
                <Controller
                    name="to"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            placeholder={t(
                                'page.date_placeholder',
                                'Select date',
                            )}
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
                    label={t('page.schedule.total_hours', 'Total hours')}
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
                    label={t(
                        'page.schedule.choose_rest_days',
                        'Choose Rest days',
                    )}
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
                                placeholder={t(
                                    'page.schedule.',
                                    'Please Select',
                                )}
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
