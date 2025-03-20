import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { LeaveFormSchema, FormSectionBaseProps } from './types'
import TimeInput from '@/components/ui/TimeInput/TimeInput'
import { Employee } from '@/views/employees/EmployeeList/types'
import { DatePicker, Input, Select } from '@/components/ui'
import { format } from 'date-fns'
import { apiTotalLeaveTypesList } from '@/services/leaveTypeService'
import { LeaveType } from '@/views/leaveTypes/types'

type OverviewSectionProps = FormSectionBaseProps

type OptionType = {
    value: string
    label: string
}

type LeaveTypeResponse = {
    list: LeaveType[]
}

const statusOption: OptionType[] = [
    {
        label: 'Approved',
        value: 'Approved',
    },
    {
        label: 'Pending',
        value: 'Pending',
    },
    {
        label: 'Declined',
        value: 'Declined',
    },
]

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
                const data: LeaveTypeResponse = await apiTotalLeaveTypesList()

                console.log(data)

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
            <h4 className="mb-6">{newLeave ? 'Leave Create' : 'Leave Edit'}</h4>
            <FormItem
                label="Employee"
                invalid={Boolean(errors.leaveType)}
                errorMessage={errors.leaveType?.message}
            >
                <Controller
                    name="leaveType"
                    control={control}
                    render={({ field }) => (
                        <Select
                            placeholder="Please Select"
                            options={employeeOptions}
                            value={employeeOptions.find(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                            isDisabled
                        />
                    )}
                />
            </FormItem>

            <div className="flex justify-center w-full gap-4 items-center">
                <FormItem
                    label="Leave from"
                    invalid={Boolean(errors.leaveFrom)}
                    errorMessage={errors.leaveFrom?.message}
                    className="w-1/2"
                >
                    <Controller
                        name="leaveFrom"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                placeholder="Date"
                                disabled
                                value={
                                    field.value ? new Date(field.value) : null
                                }
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
                    label="Leave to"
                    invalid={Boolean(errors.leaveTo)}
                    errorMessage={errors.leaveTo?.message}
                    className="w-1/2"
                >
                    <Controller
                        name="leaveTo"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                placeholder="Date"
                                disabled
                                value={
                                    field.value ? new Date(field.value) : null
                                }
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
            </div>

            <FormItem
                label="Return Date"
                invalid={Boolean(errors.leaveReturn)}
                errorMessage={errors.leaveReturn?.message}
            >
                <Controller
                    name="leaveReturn"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            disabled
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
                label="Reason"
                invalid={Boolean(errors.reason)}
                errorMessage={errors.reason?.message}
            >
                <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                        <Input
                            disabled
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

            <div className="bg-slate-300 h-[1px] w-full dark:bg-stone-700 mb-7"></div>

            <FormItem
                label="Comment"
                invalid={Boolean(errors.status)}
                errorMessage={errors.status?.message}
            >
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            placeholder="Please Select"
                            options={statusOption}
                            value={statusOption.find(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Add Comment"
                invalid={Boolean(errors.comment)}
                errorMessage={errors.comment?.message}
            >
                <Controller
                    name="comment"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            textArea
                            autoComplete="off"
                            placeholder="Comment"
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
