import React from 'react'
import { AdaptiveCard } from '@/components/shared'
import { FormItem, Input } from '@/components/ui'
import { Controller, useFormContext } from 'react-hook-form'
import useTranslation from '@/utils/hooks/useTranslation'

const LocalizationSetting = () => {
    const { t } = useTranslation()

    const { control } = useFormContext()

    return (
        <div className="flex flex-col gap-4">
            <AdaptiveCard>
                <FormItem
                    label={t('page.account_setting.first_name', 'First Name')}
                >
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder={t(
                                    'page.account_setting.first_name',
                                    'First Name',
                                )}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label={t('page.account_setting.last_name', 'Last Name')}
                >
                    <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder={t(
                                    'page.account_setting.last_name',
                                    'Last Name',
                                )}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>

                <FormItem label={t('page.account_setting.email', 'Email')}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder={t(
                                    'page.account_setting.email',
                                    'Email',
                                )}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>

                <FormItem label={t('page.account_setting.role', 'Role')}>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder={t(
                                    'page.account_setting.role',
                                    'Role',
                                )}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                disabled
                            />
                        )}
                    />
                </FormItem>

                <FormItem label={t('page.account_setting.status', 'Status')}>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder={t(
                                    'page.account_setting.status',
                                    'Status',
                                )}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                disabled
                            />
                        )}
                    />
                </FormItem>
            </AdaptiveCard>
        </div>
    )
}

export default LocalizationSetting
