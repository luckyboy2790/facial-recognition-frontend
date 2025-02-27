import { useState, useMemo, useContext, useCallback, useEffect } from 'react'
import classNames from '@/utils/classNames'
import RadioGroupContext from './context'
import type { CommonProps } from '../@types/common'
import type { InputHTMLAttributes, Ref } from 'react'

export interface RadioProps
    extends CommonProps,
        Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    checked?: boolean
    radioClass?: string
    defaultChecked?: boolean
    disabled?: boolean
    labelRef?: Ref<HTMLLabelElement>
    name?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (value: any, e: MouseEvent) => void
    ref?: Ref<HTMLInputElement>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any
    vertical?: boolean
    readOnly?: boolean
}

const Radio = (props: RadioProps) => {
    const {
        name: nameContext,
        disabled: disabledContext,
        value: groupValue,
        onChange: onGroupChange,
        radioClass: customColorContext,
    } = useContext(RadioGroupContext)

    const {
        children,
        className,
        checked: checkedProp,
        radioClass,
        defaultChecked,
        disabled = disabledContext,
        labelRef,
        name = nameContext,
        onChange,
        readOnly,
        ref,
        value,
        ...rest
    } = props

    const getChecked = () => {
        return typeof groupValue !== 'undefined'
            ? groupValue === value
            : checkedProp
    }

    const [radioChecked, setRadioChecked] = useState(getChecked())

    const radioColor = customColorContext || 'text-primary'

    const controlProps = useMemo(() => {
        if (typeof groupValue !== 'undefined') {
            return { checked: radioChecked }
        }
        return { checked: checkedProp, defaultChecked }
    }, [radioChecked, checkedProp, defaultChecked, groupValue])

    const onRadioChange = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => {
            if (disabled || readOnly) {
                return
            }
            onGroupChange?.(value, e)
            onChange?.(value, e)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            disabled,
            setRadioChecked,
            onChange,
            value,
            onGroupChange,
            groupValue,
            readOnly,
        ],
    )

    useEffect(() => {
        const propChecked = getChecked()
        if (radioChecked !== propChecked) {
            setRadioChecked(propChecked)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, checkedProp, groupValue])

    const radioDefaultClass = `radio peer ${radioColor}`
    const radioColorClass = disabled && 'disabled'
    const labelDisabledClass = disabled && 'disabled'

    const labelClass = classNames('radio-label', labelDisabledClass, className)

    return (
        <label ref={labelRef} className={labelClass}>
            <span className="radio-wrapper relative">
                <input
                    ref={ref}
                    type="radio"
                    className={classNames(
                        radioDefaultClass,
                        radioColorClass,
                        radioClass,
                    )}
                    disabled={disabled}
                    value={value}
                    name={name}
                    readOnly={readOnly}
                    onChange={onRadioChange}
                    {...controlProps}
                    {...rest}
                />
                <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 stroke-neutral fill-neutral opacity-0 peer-checked:opacity-100 pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 mt-[0.75px]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="8" cy="8" r="3" />
                </svg>
            </span>
            {children ? (
                <span className={classNames(disabled ? 'opacity-50' : '')}>
                    {children}
                </span>
            ) : null}
        </label>
    )
}

export default Radio
