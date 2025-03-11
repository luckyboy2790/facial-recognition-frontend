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

export type CustomerFormSchema = OverviewFields

export type FormSectionBaseProps = {
    control: Control<CustomerFormSchema>
    errors: FieldErrors<CustomerFormSchema>
}
