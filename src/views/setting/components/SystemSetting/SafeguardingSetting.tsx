import { AdaptiveCard } from '@/components/shared'
import { FormItem, Input } from '@/components/ui'
import useTranslation from '@/utils/hooks/useTranslation'
import { Controller, useFormContext } from 'react-hook-form'

const SafeguardingSetting = () => {
    const { control } = useFormContext()

    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-4">
            <h5>{t('page.setting.safeguarding', 'Safeguarding')}</h5>
            <AdaptiveCard>
                <FormItem
                    label={t(
                        'page.setting.web_clock_ip_restriction',
                        'Web clock IP restriction',
                    )}
                >
                    <p>
                        {t(
                            'page.setting.web_clock_ip_restriction_description',
                            'Turn on to block clocking from unknown device or IP address',
                        )}
                    </p>
                    <Controller
                        name="ipRestriction"
                        control={control}
                        render={({ field }) => (
                            <Input
                                placeholder={t(
                                    'page.setting.web_clock_ip_restruction_placeholder',
                                    'Enter IP addresses, if more than one add comma after each IP address',
                                )}
                                textArea
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </AdaptiveCard>
        </div>
    )
}

export default SafeguardingSetting
