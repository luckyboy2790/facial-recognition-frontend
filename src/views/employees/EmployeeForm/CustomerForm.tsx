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
import useTranslation from '@/utils/hooks/useTranslation'

type CustomerFormProps = {
    onFormSubmit: (values: CustomerFormSchema) => void
    defaultValues?: CustomerFormSchema
    newCustomer: boolean
} & CommonProps

const CustomerForm = (props: CustomerFormProps) => {
    const { t } = useTranslation()
    const { onFormSubmit, defaultValues, children, newCustomer } = props

    const validationSchema: ZodType<any> = z.object({
        firstName: z.string().min(1, {
            message: t(
                'page.employee.first_name_require',
                'First name required',
            ),
        }),
        lastName: z.string().min(1, {
            message: t('page.employee.last_name_require', 'Last name required'),
        }),
        gender: z.string().min(1, {
            message: t('page.employee.gender_require', 'Gender required'),
        }),

        civilStatus: z.string(),
        email: z
            .string()
            .min(1, {
                message: t('page.employee.email_require', 'Email required'),
            })
            .email({ message: 'Invalid email' }),
        dialCode: z.string().optional(),
        phoneNumber: z.string(),
        address: z.string(),
        img: z.string().min(1, { message: 'Civil Status required' }),
        height: z.string(),
        weight: z.string(),
        age: z.string(),
        birthday: z.string(),
        nationalId: z.string().min(1, {
            message: t(
                'page.employee.national_id_require',
                'National Id required',
            ),
        }),
        placeOfBirth: z.string(),
        department: z.string().min(1, {
            message: t(
                'page.employee.company_name_require',
                'Department name required',
            ),
        }),
        company: z.string().min(1, {
            message: t(
                'page.employee.department_name_require',
                'Company name required',
            ),
        }),
        jobTitle: z.string().min(1, {
            message: t('page.employee.job_title_require', 'Job Title required'),
        }),
        pin: z
            .string()
            .regex(/^\d{6,10}$/, {
                message: 'PIN must be between 6 and 10 numeric digits',
            })
            .refine((val) => Number(val) >= 0 && Number(val) <= 9999999999, {
                message: t(
                    'page.employee.PIN_require',
                    'PIN must be a 4-digit number between 1000 and 9999',
                ),
            }),
        companyEmail: z.string(),
        leaveGroup: z.string().min(1, {
            message: t(
                'page.employee.leave_group_require',
                'Leave group required',
            ),
        }),
        employmentType: z.string().min(1, {
            message: t(
                'page.employee.employee_type_require',
                'Employee Type required',
            ),
        }),
        employmentStatus: z.string(),
        officialStartDate: z.string().optional(),
        dateRegularized: z.string().optional(),
        faceDescriptor: z
            .array(z.number(), {
                message: 'Face descriptor must be an array of numbers',
            })
            .nonempty({ message: 'Face descriptor is required' })
            .refine((arr) => arr.length === 128, {
                message: 'Face descriptor must have exactly 128 values',
            }),
    })

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
        setValue,
    } = useForm<CustomerFormSchema>({
        defaultValues: {
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
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
                            setValue={setValue}
                            newCustomer={newCustomer}
                        />
                        <PersonalInfomationSection
                            control={control}
                            errors={errors}
                        />
                        <EmployeeDetailSection
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            companyId={defaultValues?.company}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default CustomerForm
