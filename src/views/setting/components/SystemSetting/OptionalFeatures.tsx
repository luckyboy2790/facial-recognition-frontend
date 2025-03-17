import { AdaptiveCard } from '@/components/shared'
import { FormItem, Switcher } from '@/components/ui'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const OptionalFeatures = () => {
    const { setValue, watch } = useFormContext()

    const rfidClock = watch('rfidClock')
    const timeInComments = watch('timeInComments')

    return (
        <div className="flex flex-col gap-4">
            <h5>Optional Features</h5>
            <AdaptiveCard>
                <FormItem label="RFID Clock In and Clock Out">
                    <p>
                        Turn on to enable features for RFID Web Clock In and
                        Clock Out
                    </p>
                    <div className="flex justify-start gap-4 items-center">
                        <Switcher
                            checked={rfidClock}
                            onChange={() => setValue('rfidClock', !rfidClock)}
                        />
                        <p>Toogle Off/On</p>
                    </div>
                </FormItem>
                <FormItem label="Time In comments">
                    <p>Turn on to require comments when clocking in</p>
                    <div className="flex justify-start gap-4 items-center">
                        <Switcher
                            checked={timeInComments}
                            onChange={() =>
                                setValue('timeInComments', !timeInComments)
                            }
                        />
                        <p>Toogle Off/On</p>
                    </div>
                </FormItem>
            </AdaptiveCard>
        </div>
    )
}

export default OptionalFeatures
