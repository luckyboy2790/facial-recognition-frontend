import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
import isEmpty from 'lodash/isEmpty'
import { useForm } from 'react-hook-form'
import type { CommonProps } from '@/@types/common'
import type { LeaveFormSchema } from './types'

type LeaveFormProps = {
    onFormSubmit: (values: LeaveFormSchema) => void
    defaultValues?: LeaveFormSchema
    newLeave?: boolean
} & CommonProps

const LeaveForm = (props: LeaveFormProps) => {
    const { onFormSubmit, defaultValues = {}, children, newLeave } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<LeaveFormSchema>({
        defaultValues: {
            ...defaultValues,
        },
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: LeaveFormSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex h-full w-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex flex-auto flex-col gap-4">
                        <OverviewSection
                            control={control}
                            errors={errors}
                            newLeave={newLeave}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default LeaveForm
