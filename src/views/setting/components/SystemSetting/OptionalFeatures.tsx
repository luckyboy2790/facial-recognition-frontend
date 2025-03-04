import { AdaptiveCard } from '@/components/shared'
import { FormItem, Switcher } from '@/components/ui'
import { useState } from 'react'

const OptionalFeatures = () => {
    const [checked, setChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onSwitcherToggle = () => {
        setIsLoading(true)
        setTimeout(() => {
            setChecked((checked) => !checked)
            setIsLoading(false)
        }, 1000)
    }

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
                            checked={checked}
                            isLoading={isLoading}
                            onChange={onSwitcherToggle}
                        />
                        <p>Toogle Off/On</p>
                    </div>
                </FormItem>
                <FormItem label="Time In comments">
                    <p>Turn on to require comments when clocking in</p>
                    <div className="flex justify-start gap-4 items-center">
                        <Switcher
                            checked={checked}
                            isLoading={isLoading}
                            onChange={onSwitcherToggle}
                        />
                        <p>Toogle Off/On</p>
                    </div>
                </FormItem>
            </AdaptiveCard>
        </div>
    )
}

export default OptionalFeatures
