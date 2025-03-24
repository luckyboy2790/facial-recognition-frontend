import React from 'react'
import { AdaptiveCard } from '@/components/shared'
import { FormItem, Input } from '@/components/ui'
import { Controller, useFormContext } from 'react-hook-form'

const LocalizationSetting = () => {
    const { control } = useFormContext()

    return (
        <div className="flex flex-col gap-4">
            <AdaptiveCard>
                <FormItem label="First Name">
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Name"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Last Name">
                    <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Name"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Email">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Email"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Role">
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Role"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                disabled
                            />
                        )}
                    />
                </FormItem>

                <FormItem label="Status">
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Status"
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
