import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    employee: string
    date: string
    time_in: string
    time_out: string
    reason?: string
}
export type LeaveFormSchema = OverviewFields

export type FormSectionBaseProps = {
    control: Control<LeaveFormSchema>
    errors: FieldErrors<LeaveFormSchema>
    newLeave?: boolean
}
