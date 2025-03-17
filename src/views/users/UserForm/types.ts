import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    employee: string
    email: string
    account_type: string
    role: string
    status: string
    password?: string
    confirm_password?: string
}

export type CustomerFormSchema = OverviewFields

export type FormSectionBaseProps = {
    control: Control<CustomerFormSchema>
    errors: FieldErrors<CustomerFormSchema>
}
