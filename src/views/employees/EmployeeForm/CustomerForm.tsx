import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import PersonalInfomationSection from './PersonalInfomation'
import EmployeeDetailSection from './EmployeeDetail'
import ProfileImageSection from './ProfileImageSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { CustomerFormSchema } from './types'

type CustomerFormProps = {
    onFormSubmit: (values: CustomerFormSchema) => void
    defaultValues?: CustomerFormSchema
    newCustomer?: boolean
} & CommonProps

const validationSchema: ZodType<CustomerFormSchema> = z.object({
    firstName: z.string().min(1, { message: 'First name required' }),
    lastName: z.string().min(1, { message: 'Last name required' }),
    gender: z.string().min(1, { message: 'Gender required' }),

    civilStatus: z.string().min(1, { message: 'Civil Status required' }),
    email: z
        .string()
        .min(1, { message: 'Email required' })
        .email({ message: 'Invalid email' }),
    dialCode: z.string().min(1, { message: 'Please select your country code' }),
    phoneNumber: z
        .string()
        .min(1, { message: 'Please input your mobile number' }),
    country: z.string().min(1, { message: 'Please select a country' }),
    address: z.string().min(1, { message: 'Addrress required' }),
    postcode: z.string().min(1, { message: 'Postcode required' }),
    city: z.string().min(1, { message: 'City required' }),
    img: z.string(),
    height: z
        .string()
        .regex(/^\d+$/, { message: 'Height must be a numeric value' })
        .refine((val) => Number(val) >= 50 && Number(val) <= 250, {
            message: 'Height must be between 50 cm and 250 cm',
        }),
    weight: z
        .string()
        .regex(/^\d+$/, { message: 'Weight must be a numeric value' })
        .refine((val) => Number(val) >= 20 && Number(val) <= 300, {
            message: 'Weight must be between 20 kg and 300 kg',
        }),
    age: z
        .string()
        .regex(/^\d+$/, { message: 'Age must be a numeric value' })
        .refine((val) => Number(val) >= 1 && Number(val) <= 120, {
            message: 'Age must be between 1 and 120',
        }),
    birthday: z
        .string()
        .min(1, { message: 'Birthday is required' })
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: 'Invalid date format (YYYY-MM-DD)',
        })
        .refine((val) => new Date(val) <= new Date(), {
            message: 'Birthday cannot be in the future',
        }),
    nationalId: z.string().min(1, { message: 'National Id required' }),
    placeOfBirth: z.string().min(1, { message: 'Place of birth required' }),
})

const CustomerForm = (props: CustomerFormProps) => {
    const { onFormSubmit, defaultValues = {}, children } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<CustomerFormSchema>({
        defaultValues: {
            ...{
                banAccount: false,
                accountVerified: true,
            },
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: CustomerFormSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <ProfileImageSection
                            control={control}
                            errors={errors}
                        />
                        <PersonalInfomationSection
                            control={control}
                            errors={errors}
                        />
                        <EmployeeDetailSection
                            control={control}
                            errors={errors}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default CustomerForm
