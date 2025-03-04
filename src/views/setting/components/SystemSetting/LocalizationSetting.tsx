import React from 'react'
import { AdaptiveCard } from '@/components/shared'
import { FormItem, Select } from '@/components/ui'
import { countryList, timezoneList } from '@/constants/countries.constant'
import { Controller, useForm } from 'react-hook-form'
import { components, type ControlProps, type OptionProps } from 'react-select'
import { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import CreatableSelect from 'react-select/creatable'

const defaultOptions = [
    { value: 'am', label: '12 Hour (6:20 pm)' },
    { value: 'pm', label: '24 Hour (16:20)' },
]

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

type TimeZoneOption = {
    label: string
    value: string
}

const { Control: SelectControl } = components

const CustomCountrySelectOption = (props: OptionProps<CountryOption>) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Avatar
                        shape="circle"
                        size={20}
                        src={`/img/countries/${data.value}.png`}
                    />
                    <span>{label}</span>
                </span>
            )}
        />
    )
}

const CustomTimeZoneSelectOption = (props: OptionProps<TimeZoneOption>) => {
    return (
        <DefaultOption<TimeZoneOption>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">{label}</span>
            )}
        />
    )
}

const CustomCountryControl = ({
    children,
    ...props
}: ControlProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <SelectControl {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value}.png`}
                />
            )}
            {children}
        </SelectControl>
    )
}

const CustomTimeZoneControl = ({
    children,
    ...props
}: ControlProps<TimeZoneOption>) => {
    const selected = props.getValue()[0]

    return <SelectControl {...props}>{children}</SelectControl>
}

const LocalizationSetting = () => {
    const { control } = useForm()

    return (
        <div className="flex flex-col gap-4">
            <h5>Localization</h5>
            <AdaptiveCard>
                <FormItem label="Country">
                    <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                            <Select<CountryOption>
                                options={countryList}
                                {...field}
                                components={{
                                    Option: CustomCountrySelectOption,
                                    Control: CustomCountryControl,
                                }}
                                placeholder="Select a country"
                                value={countryList.filter(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem label="Time zone">
                    <Controller
                        name="timezone"
                        control={control}
                        render={({ field }) => (
                            <Select<TimeZoneOption>
                                options={timezoneList}
                                {...field}
                                components={{
                                    Option: CustomTimeZoneSelectOption,
                                    Control: CustomTimeZoneControl,
                                }}
                                placeholder="Select a timezone"
                                value={timezoneList.filter(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem label="Time Format">
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <Select
                                isClearable
                                placeholder="Select time format"
                                componentAs={CreatableSelect}
                                options={defaultOptions}
                                onChange={(option) => field.onChange(option)}
                            />
                        )}
                    />
                </FormItem>
            </AdaptiveCard>
        </div>
    )
}

export default LocalizationSetting
