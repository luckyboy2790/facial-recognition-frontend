import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { CustomerFormSchema } from './types'
import useTranslation from '@/utils/hooks/useTranslation'

type CustomerFormProps = {
    onFormSubmit: (values: CustomerFormSchema) => void
    defaultValues?: CustomerFormSchema
    newCustomer?: boolean
} & CommonProps

const CustomerForm = (props: CustomerFormProps) => {
    const { t } = useTranslation()

    const validationSchema: ZodType<CustomerFormSchema> = z
        .object({
            employee: z.string().min(1, {
                message: t(
                    'page.schedule.employee_required',
                    'Employee name is required',
                ),
            }),
            account_type: z.string().min(1, {
                message: t(
                    'page.user.account_type_required',
                    'Account type is required',
                ),
            }),
            email: z
                .string()
                .min(1, {
                    message: t(
                        'page.employee.employee_require',
                        'Email is required',
                    ),
                })
                .email({
                    message: t(
                        'page.employee.email_invalid',
                        'Invalid email address',
                    ),
                }),
            role: z.string().min(1, {
                message: t('page.user.role_required', 'Please select a role'),
            }),
            status: z.string().min(1, {
                message: t(
                    'page.user.status_required',
                    'Please select a status',
                ),
            }),

            password: z
                .string()
                .min(8, {
                    message: t(
                        'page.user.password_length_message',
                        'Password must be at least 8 characters long',
                    ),
                })
                .regex(/[0-9]/, {
                    message: t(
                        'page.user.password_number_message',
                        'Password must include a number',
                    ),
                })
                .regex(/[a-z]/, {
                    message: t(
                        'page.user.password_lowercase_message',
                        'Password must include a lowercase letter',
                    ),
                })
                .regex(/[A-Z]/, {
                    message: t(
                        'page.user.password_uppercase_message',
                        'Password must include an uppercase letter',
                    ),
                })
                .regex(/[!@#$%^&*(),.?":{}|<>]/, {
                    message: t(
                        'page.user.password_special_character_message',
                        'Password must include a special character',
                    ),
                })
                .optional(),

            confirm_password: z.string().optional(),
        })
        .superRefine(({ password, confirm_password }, ctx) => {
            if (password && !confirm_password) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['confirm_password'],
                    message: t(
                        'page.user.confirm_message',
                        'Please confirm your password',
                    ),
                })
            }

            if (password && confirm_password && password !== confirm_password) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['confirm_password'],
                    message: t(
                        'page.user.password_not_match',
                        "Passwords don't match",
                    ),
                })
            }
        })

    const {
        onFormSubmit,
        defaultValues = {},
        newCustomer = false,
        children,
    } = props

    const formMethods = useForm<CustomerFormSchema>({
        defaultValues: {
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = formMethods

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: CustomerFormSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <FormProvider {...formMethods}>
            <Form
                className="flex w-full h-full"
                containerClassName="flex flex-col w-full justify-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="gap-4 flex flex-col flex-auto">
                            <OverviewSection
                                control={control}
                                newCustomer={newCustomer}
                                errors={errors}
                            />
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </Form>
        </FormProvider>
    )
}

export default CustomerForm
