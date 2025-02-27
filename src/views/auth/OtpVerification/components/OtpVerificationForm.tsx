import { useState } from 'react'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import OtpInput from '@/components/shared/OtpInput'
import sleep from '@/utils/sleep'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'

interface OtpVerificationFormProps extends CommonProps {
    setOtpVerified?: (message: string) => void
    setMessage?: (message: string) => void
}

type ForgotPasswordFormSchema = {
    otp: string
}

const OTP_LENGTH = 6

const validationSchema: ZodType<ForgotPasswordFormSchema> = z.object({
    otp: z.string().min(OTP_LENGTH, { message: 'Please enter a valid OTP' }),
})

const OtpVerificationForm = (props: OtpVerificationFormProps) => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const { className, setMessage, setOtpVerified } = props

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<ForgotPasswordFormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onOtpSend = async (values: ForgotPasswordFormSchema) => {
        const { otp } = values
        setSubmitting(true)
        try {
            /** simulate api call with sleep */
            await sleep(1000)
            setSubmitting(false)
            setOtpVerified?.('OTP verified!')
        } catch (errors) {
            setMessage?.(
                typeof errors === 'string' ? errors : 'Some error occured!',
            )
            setSubmitting(false)
        }

        console.log('otp', otp)
        setSubmitting(false)
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onOtpSend)}>
                <FormItem
                    invalid={Boolean(errors.otp)}
                    errorMessage={errors.otp?.message}
                >
                    <Controller
                        name="otp"
                        control={control}
                        render={({ field }) => (
                            <OtpInput
                                placeholder=""
                                inputClass="h-[58px]"
                                length={OTP_LENGTH}
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                </Button>
            </Form>
        </div>
    )
}

export default OtpVerificationForm
