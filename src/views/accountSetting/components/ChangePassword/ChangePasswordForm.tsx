import { PasswordInput } from '@/components/shared'
import { FormItem } from '@/components/ui'
import { Controller, useFormContext } from 'react-hook-form'

const ChangePasswordForm = () => {
    const { control } = useFormContext()

    return (
        <div className="flex flex-col gap-4">
            <FormItem label="Current Password">
                <Controller
                    name="currentPassword"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <PasswordInput
                            type="text"
                            placeholder="Current Password"
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
            </FormItem>
            <FormItem label="New Password">
                <Controller
                    name="newPassword"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <PasswordInput
                            type="text"
                            placeholder="New Password"
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
            </FormItem>
            <FormItem label="Confirm Password">
                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <PasswordInput
                            type="text"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
            </FormItem>
        </div>
    )
}

export default ChangePasswordForm
