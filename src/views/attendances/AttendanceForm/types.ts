import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    employee: string
    date: string
    time_in: string
    time_out: string
}
export type AttendanceFormSchema = OverviewFields

export type FormSectionBaseProps = {
    control: Control<AttendanceFormSchema>
    errors: FieldErrors<AttendanceFormSchema>
}
