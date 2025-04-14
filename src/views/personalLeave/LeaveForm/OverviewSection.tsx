import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { LeaveFormSchema, FormSectionBaseProps } from './types'
import { Input, Select } from '@/components/ui'
import { apiTotalLeaveTypesList } from '@/services/leaveTypeService'
import { LeaveType } from '@/views/leaveTypes/types'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import useTranslation from '@/utils/hooks/useTranslation'

type OverviewSectionProps = FormSectionBaseProps

type OptionType = {
    value: string
    label: string
}

type LeaveTypeResponse = {
    list: LeaveType[]
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

    const { t } = useTranslation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: LeaveTypeResponse = await apiTotalLeaveTypesList()

                const options: OptionType[] = data.list.map(
                    (item: LeaveType) => {
                        return {
                            value: item._id,
                            label: item.leave_name,
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
                {t('page.leave.leave', 'Leave')}{' '}
                {newLeave ? t('page.create', 'Create') : t('page.edit', 'Edit')}
            </h4>
            <FormItem
                label={t('page.leave.employee', 'Employee')}
                invalid={Boolean(errors.leaveType)}
                errorMessage={errors.leaveType?.message}
            >
                <Controller
                    name="leaveType"
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

            <div className="flex justify-center w-full gap-4 items-center">
                <FormItem
                    label={t('page.leave.from', 'Leave from')}
                    invalid={Boolean(errors.leaveFrom)}
                    errorMessage={errors.leaveFrom?.message}
                    className="w-1/2"
                >
                    <Controller
                        name="leaveFrom"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                placeholder={t(
                                    'page.date_placeholder',
                                    'Select Date',
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
                    label={t('page.leave.to', 'Leave to')}
                    invalid={Boolean(errors.leaveTo)}
                    errorMessage={errors.leaveTo?.message}
                    className="w-1/2"
                >
                    <Controller
                        name="leaveTo"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                placeholder={t(
                                    'page.date_placeholder',
                                    'Select Date',
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
            </div>

            <FormItem
                label={t('page.leave.return_date', 'Return Date')}
                invalid={Boolean(errors.leaveReturn)}
                errorMessage={errors.leaveReturn?.message}
            >
                <Controller
                    name="leaveReturn"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            placeholder={t(
                                'page.date_placeholder',
                                'Select Date',
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
                label={t('page.leave.reason', 'Reason')}
                invalid={Boolean(errors.reason)}
                errorMessage={errors.reason?.message}
            >
                <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            textArea
                            autoComplete="off"
                            placeholder={t('page.leave.reason', 'Reason')}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default OverviewSection
