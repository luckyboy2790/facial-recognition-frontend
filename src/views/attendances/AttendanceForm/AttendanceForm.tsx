import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
import isEmpty from 'lodash/isEmpty'
import { useForm } from 'react-hook-form'
import type { CommonProps } from '@/@types/common'
import type { AttendanceFormSchema } from './types'

type AttendanceFormProps = {
    onFormSubmit: (values: AttendanceFormSchema) => void
    defaultValues?: AttendanceFormSchema
    newAttendance?: boolean
} & CommonProps

const AttendanceForm = (props: AttendanceFormProps) => {
    const { onFormSubmit, defaultValues = {}, children, newAttendance } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<AttendanceFormSchema>({
        defaultValues: {
            ...defaultValues,
        },
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: AttendanceFormSchema) => {
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
                            newAttendance={newAttendance}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default AttendanceForm
