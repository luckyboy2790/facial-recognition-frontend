import { AdaptiveCard } from '@/components/shared'
import { FormItem, Switcher } from '@/components/ui'
import useTranslation from '@/utils/hooks/useTranslation'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const OptionalFeatures = () => {
    const { setValue, watch } = useFormContext()

    const rfidClock = watch('rfidClock')

    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-4">
            <h5>{t('page.setting.optional_features', 'Optional Features')}</h5>
            <AdaptiveCard>
                <FormItem
                    label={t(
                        'page.setting.RFID_clock',
                        'RFID Clock In and Clock Out',
                    )}
                >
                    <p className="mb-2">
                        {t(
                            'page.setting.RFID_clock_description',
                            'Turn on to enable features for RFID Web Clock In and Clock Out',
                        )}
                    </p>
                    <div className="flex justify-start gap-4 items-center">
                        <Switcher
                            checked={rfidClock}
                            onChange={() => setValue('rfidClock', !rfidClock)}
                        />
                        <p>{t('page.setting.toggle', 'Toggle Off/On')}</p>
                    </div>
                </FormItem>
            </AdaptiveCard>
        </div>
    )
}

export default OptionalFeatures
