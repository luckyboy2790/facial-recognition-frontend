/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo, useEffect } from 'react'
import classNames from 'classnames'
import { RadioGroupContextProvider } from './context'
import type { CommonProps } from '../@types/common'
import type { Ref } from 'react'

export interface RadioGroupProps extends CommonProps {
    radioClass?: string
    disabled?: boolean
    name?: string
    onChange?: (values: any, e: MouseEvent) => void
    ref?: Ref<HTMLDivElement>
    value?: any
    vertical?: boolean
}

const Group = (props: RadioGroupProps) => {
    const {
        radioClass,
        disabled,
        name,
        onChange,
        ref,
        value: valueProp,
        vertical = false,
        className,
        ...rest
    } = props

    const [value, setValue] = useState(valueProp)

    useEffect(() => {
        if (valueProp !== value) {
            setValue(valueProp)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueProp])

    const onRadioGroupChange = useCallback(
        (nextValue: any, e: MouseEvent) => {
            setValue(nextValue)
            onChange?.(nextValue, e)
        },
        [onChange, setValue],
    )

    const contextValue = useMemo(
        () => ({
            vertical,
            name,
            value: typeof value === 'undefined' ? null : value,
            radioClass,
            disabled,
            onChange: onRadioGroupChange,
        }),
        [disabled, onRadioGroupChange, vertical, name, radioClass, value],
    )

    const radioGroupClass = classNames(
        'radio-group',
        vertical && 'vertical',
        className,
    )

    return (
        <RadioGroupContextProvider value={contextValue}>
            <div ref={ref} className={radioGroupClass} {...rest}>
                {props.children}
            </div>
        </RadioGroupContextProvider>
    )
}

export default Group
