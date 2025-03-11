import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    employee: string
    start_time: string
    off_time: string
    from: string
    to: string
    total_hours: string
    rest_days: string[]
}

export type ScheduleFormSchema = OverviewFields

export type FormSectionBaseProps = {
    control: Control<ScheduleFormSchema>
    errors: FieldErrors<ScheduleFormSchema>
}
