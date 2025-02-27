import { useMemo } from 'react'
import classNames from '../utils/classNames'
import { SegmentContextProvider } from './context'
import useControllableState from '../hooks/useControllableState'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type { SegmentValue } from './context'
import type { Ref } from 'react'

export interface SegmentProps extends CommonProps {
    defaultValue?: SegmentValue
    onChange?: (segmentValue: SegmentValue) => void
    ref?: Ref<HTMLDivElement>
    selectionType?: 'single' | 'multiple'
    size?: TypeAttributes.Size
    value?: SegmentValue
}

const Segment = (props: SegmentProps) => {
    const {
        children,
        className,
        defaultValue,
        onChange = () => {
            // empty callback
        },
        ref,
        selectionType = 'single',
        size,
        value: valueProp,
        ...rest
    } = props

    const [value, setValue] = useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onChange,
    })

    const onActive = (itemValue: SegmentValue) => {
        setValue(itemValue)
    }

    const onDeactivate = (itemValue: SegmentValue) => {
        if (selectionType === 'single') {
            setValue('')
        }

        if (selectionType === 'multiple') {
            setValue((prevValue = []) => {
                return (prevValue as string[]).filter(
                    (value) => value !== itemValue,
                )
            })
        }
    }

    const segmentValue = useMemo(() => {
        if (selectionType === 'single') {
            if (value && typeof value === 'string') {
                return [value]
            }

            if (value && Array.isArray(value)) {
                return value
            }

            return []
        }

        if (selectionType === 'multiple') {
            return value ? value : []
        }
    }, [selectionType, value])

    return (
        <SegmentContextProvider
            value={{
                value: segmentValue,
                onActive: onActive,
                onDeactivate: onDeactivate,
                selectionType,
                size,
            }}
        >
            <div
                ref={ref}
                className={classNames(
                    'segment',
                    'gap-2 bg-gray-100 dark:bg-gray-700',
                    className,
                )}
                {...rest}
            >
                {children}
            </div>
        </SegmentContextProvider>
    )
}

export default Segment
