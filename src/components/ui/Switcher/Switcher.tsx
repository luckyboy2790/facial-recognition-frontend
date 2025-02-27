import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Spinner } from '../Spinner'
import type { CommonProps } from '../@types/common'
import type { ReactNode, ChangeEvent, Ref } from 'react'

export interface SwitcherProps extends CommonProps {
    checked?: boolean
    checkedContent?: string | ReactNode
    switcherClass?: string
    defaultChecked?: boolean
    disabled?: boolean
    isLoading?: boolean
    labelRef?: Ref<HTMLLabelElement>
    name?: string
    onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void
    readOnly?: boolean
    ref?: Ref<HTMLInputElement>
    unCheckedContent?: string | ReactNode
}

const Switcher = (props: SwitcherProps) => {
    const {
        checked,
        checkedContent,
        className,
        switcherClass,
        defaultChecked,
        disabled,
        isLoading = false,
        labelRef,
        name,
        onChange,
        readOnly,
        ref,
        unCheckedContent,
        ...rest
    } = props

    const [switcherChecked, setSwitcherChecked] = useState(
        defaultChecked || checked,
    )

    useEffect(() => {
        if (typeof checked !== 'undefined') {
            setSwitcherChecked(checked)
        }
    }, [checked])

    const getControlProps = () => {
        let checkedValue = switcherChecked

        let propChecked: {
            value?: string
            defaultChecked?: boolean
            checked?: boolean
        } = {
            value: `${checkedValue}`,
        }

        if (typeof checked === 'boolean') {
            checkedValue =
                typeof checked === 'boolean' ? checked : defaultChecked
            propChecked = { checked: checkedValue }
        }

        if (defaultChecked) {
            propChecked.defaultChecked = defaultChecked
        }
        return propChecked
    }

    const controlProps = getControlProps()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const nextChecked = !switcherChecked

        if (disabled || readOnly || isLoading) {
            return
        }

        if (typeof checked === 'undefined') {
            setSwitcherChecked(nextChecked)
            onChange?.(nextChecked, e)
        } else {
            onChange?.(!switcherChecked as boolean, e)
        }
    }

    const switcherColor = switcherClass || 'bg-primary dark:bg-primary'

    return (
        <label
            ref={labelRef}
            className={classNames(
                'switcher',
                (switcherChecked || controlProps.checked) &&
                    `switcher-checked ${switcherColor}`,
                disabled && 'switcher-disabled',
                className,
                switcherClass,
            )}
        >
            <input
                ref={ref}
                type="checkbox"
                disabled={disabled}
                readOnly={readOnly}
                name={name}
                onChange={handleChange}
                {...controlProps}
                {...rest}
            />
            {isLoading ? (
                <Spinner
                    className={classNames(
                        'switcher-toggle-loading',
                        switcherChecked
                            ? 'switcher-checked-loading'
                            : 'switcher-uncheck-loading',
                    )}
                />
            ) : (
                <div className="switcher-toggle" />
            )}
            <span className="switcher-content">
                {switcherChecked ? checkedContent : unCheckedContent}
            </span>
        </label>
    )
}

export default Switcher
