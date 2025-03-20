import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    leaveType: string
    leaveFrom: string
    leaveTo: string
    leaveReturn: string
    reason: string
}
export type LeaveFormSchema = OverviewFields

export type FormSectionBaseProps = {
    control: Control<LeaveFormSchema>
    errors: FieldErrors<LeaveFormSchema>
    newLeave?: boolean
}
