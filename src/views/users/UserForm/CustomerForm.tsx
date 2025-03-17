import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
import AddressSection from './AddressSection'
import TagsSection from './TagsSection'
import ProfileImageSection from './ProfileImageSection'
import AccountSection from './AccountSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { CustomerFormSchema } from './types'

type CustomerFormProps = {
    onFormSubmit: (values: CustomerFormSchema) => void
    defaultValues?: CustomerFormSchema
    newCustomer?: boolean
} & CommonProps

const validationSchema: ZodType<CustomerFormSchema> = z
    .object({
        employee: z.string().min(1, { message: 'Employee name is required' }),
        account_type: z
            .string()
            .min(1, { message: 'Account type is required' }),
        email: z
            .string()
            .min(1, { message: 'Email is required' })
            .email({ message: 'Invalid email address' }),
        role: z.string().min(1, { message: 'Please select a role' }),
        status: z.string().min(1, { message: 'Please select a status' }),

        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .regex(/[0-9]/, { message: 'Password must include a number' })
            .regex(/[a-z]/, {
                message: 'Password must include a lowercase letter',
            })
            .regex(/[A-Z]/, {
                message: 'Password must include an uppercase letter',
            })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, {
                message: 'Password must include a special character',
            })
            .optional(),

        confirm_password: z.string().optional(),
    })
    .superRefine(({ password, confirm_password }, ctx) => {
        if (password && !confirm_password) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirm_password'],
                message: 'Please confirm your password',
            })
        }

        if (password && confirm_password && password !== confirm_password) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirm_password'],
                message: "Passwords don't match",
            })
        }
    })

const CustomerForm = (props: CustomerFormProps) => {
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
