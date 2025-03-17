import { AdaptiveCard } from '@/components/shared'
import { FormItem, Input } from '@/components/ui'
import { Controller, useFormContext } from 'react-hook-form'

const SafeguardingSetting = () => {
    const { control } = useFormContext()

    return (
        <div className="flex flex-col gap-4">
            <h5>Safeguarding</h5>
            <AdaptiveCard>
                <FormItem label="Web clock IP restriction">
                    <p>
                        Turn on to block clocking from unknown device or IP
                        address
                    </p>
                    <Controller
                        name="ipRestriction"
                        control={control}
                        render={({ field }) => (
                            <Input
                                placeholder="Enter IP addresses, if more than one add comma after each IP address"
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
