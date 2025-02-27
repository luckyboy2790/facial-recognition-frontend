import { useState, useCallback, useMemo, useEffect } from 'react'
import classNames from '../utils/classNames'
import { CheckboxGroupContextProvider } from './context'
import cloneDeep from 'lodash/cloneDeep'
import remove from 'lodash/remove'
import shallowEqual from '../utils/shallowEqual'
import type { CommonProps } from '../@types/common'
import type { CheckboxGroupValue, CheckboxValue } from './context'
import type { SyntheticEvent, Ref } from 'react'

export interface CheckboxGroupProps extends CommonProps {
    checkboxClass?: string
    name?: string
    onChange?: (value: CheckboxGroupValue, event: SyntheticEvent) => void
    ref?: Ref<HTMLDivElement>
    value?: CheckboxGroupValue
    vertical?: boolean
}

const Group = (props: CheckboxGroupProps) => {
    const {
        children,
        className,
        checkboxClass,
        name,
        onChange,
        ref,
        value: valueProp,
        vertical,
        ...rest
    } = props

    const [value, setValue] = useState(valueProp)

    const onCheckboxGroupChange = useCallback(
        (
            itemValue: CheckboxValue,
            itemChecked: boolean,
            event: SyntheticEvent,
        ) => {
            const nextValue = cloneDeep(value) || []
            if (itemChecked) {
                nextValue.push(itemValue as never)
            } else {
                remove(nextValue as string[], (i) => shallowEqual(i, itemValue))
            }

            setValue(nextValue)
            onChange?.(nextValue, event)
        },
        [onChange, setValue, value],
    )

    useEffect(() => {
        setValue(valueProp)
    }, [valueProp])

    const contextValue = useMemo(
        () => ({
            vertical,
            name,
            value,
            checkboxClass,
            onChange: onCheckboxGroupChange,
        }),
        [vertical, onCheckboxGroupChange, name, checkboxClass, value],
    )

    return (
        <CheckboxGroupContextProvider value={contextValue}>
            <div
                ref={ref}
                className={classNames(
                    'inline-flex gap-4',
                    vertical ? 'flex-col' : '',
                    className,
                )}
                {...rest}
            >
                {children}
            </div>
        </CheckboxGroupContextProvider>
    )
}

export default Group
