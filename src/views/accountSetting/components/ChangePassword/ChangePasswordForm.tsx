import { PasswordInput } from '@/components/shared'
import { FormItem } from '@/components/ui'
import useTranslation from '@/utils/hooks/useTranslation'
import { Controller, useFormContext } from 'react-hook-form'

const ChangePasswordForm = () => {
    const { control } = useFormContext()

    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-4">
            <FormItem
                label={t(
                    'page.account_setting.current_password',
                    'Current Password',
                )}
            >
                <Controller
                    name="currentPassword"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <PasswordInput
                            type="text"
                            placeholder={t(
                                'page.account_setting.current_password',
                                'Current Password',
                            )}
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label={t('page.account_setting.new_password', 'New Password')}
            >
                <Controller
                    name="newPassword"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <PasswordInput
                            type="text"
                            placeholder={t(
                                'page.account_setting.new_password',
                                'New Password',
                            )}
                            autoComplete="off"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label={t(
                    'page.account_setting.confirm_password',
                    'Confirm Password',
                )}
            >
                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <PasswordInput
                            type="text"
                            placeholder={t(
                                'page.account_setting.confirm_password',
                                'Confirm Password',
                            )}
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
