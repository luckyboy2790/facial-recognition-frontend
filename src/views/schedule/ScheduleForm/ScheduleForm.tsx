import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { ScheduleFormSchema } from './types'

type ScheduleFormProps = {
    onFormSubmit: (values: ScheduleFormSchema) => void
    defaultValues?: ScheduleFormSchema
    newSchedule?: boolean
} & CommonProps

const validationSchema: ZodType<ScheduleFormSchema> = z.object({
    employee: z.string().min(1, { message: 'First name required' }),
    start_time: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d{3})?$/, {
            message: 'Invalid time format (HH:mm:ss.SSSZ)',
        }),

    off_time: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d{3})?$/, {
            message: 'Invalid time format (HH:mm:ss.SSSZ)',
        }),
    from: z
        .string()
        .min(1, { message: 'Official Start Date is required' })
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: 'Invalid date format (YYYY-MM-DD)',
        }),
    to: z
        .string()
        .min(1, { message: 'Official Start Date is required' })
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
            message: 'Invalid date format (YYYY-MM-DD)',
        }),
    total_hours: z.string().min(1, { message: 'Total hours required' }),
    rest_days: z.array(z.string()),
})

const ScheduleForm = (props: ScheduleFormProps) => {
    const { onFormSubmit, defaultValues = {}, children } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<ScheduleFormSchema>({
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

    const onSubmit = (values: ScheduleFormSchema) => {
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
                        <OverviewSection
                            control={control}
                            errors={errors}
                            defaultValues={defaultValues}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default ScheduleForm
