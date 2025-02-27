import { useCallback } from 'react'
import classNames from '../utils/classNames'
import { useSegment } from './context'
import { SEGMENT_SIZES, SIZES } from '../utils/constants'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type { SegmentValue } from './context'
import type { ReactNode, ComponentPropsWithRef } from 'react'

type ChildrenParams = {
    active: boolean
    disabled: boolean
    value: string
    onSegmentItemClick: () => void
}

export interface SegmentItemProps
    extends Omit<CommonProps, 'children'>,
        Omit<ComponentPropsWithRef<'button'>, 'children'> {
    children: ((params: ChildrenParams) => ReactNode) | ReactNode
    disabled?: boolean
    size?: TypeAttributes.Size
    value?: string
}

const unwrapArray = (arg: (params: ChildrenParams) => ReactNode) =>
    Array.isArray(arg) ? arg[0] : arg

const SegmentItem = (props: SegmentItemProps) => {
    const {
        children,
        className,
        disabled = false,
        ref,
        value: valueProp,
        size,
        ...rest
    } = props

    const {
        value: valueContext,
        onActive,
        onDeactivate,
        selectionType,
        size: segmentSize,
    } = useSegment()

    const active = (valueContext as string[]).includes(valueProp as string)

    const buttonSize = size || segmentSize

    const getSegmentSize = useCallback(() => {
        let sizeClass = ''
        switch (buttonSize) {
            case SIZES.LG:
                sizeClass = classNames(
                    SEGMENT_SIZES.lg.h,
                    'md:px-8 py-2 px-4 text-base',
                )
                break
            case SIZES.SM:
                sizeClass = classNames(SEGMENT_SIZES.sm.h, 'px-3 py-2 text-sm')
                break
            case SIZES.XS:
                sizeClass = classNames(SEGMENT_SIZES.xs.h, 'px-3 py-1 text-xs')
                break
            default:
                sizeClass = classNames(SEGMENT_SIZES.md.h, 'px-5 py-2')
                break
        }
        return sizeClass
    }, [buttonSize])

    const onSegmentItemClick = () => {
        if (!disabled) {
            if (!active) {
                if (selectionType === 'single') {
                    onActive?.(valueProp as string)
                }
                if (selectionType === 'multiple') {
                    const nextValue = [
                        ...(valueContext as string[]),
                        ...[valueProp],
                    ] as string[]
                    onActive?.(nextValue)
                }
            } else if (selectionType === 'multiple') {
                onDeactivate?.(valueProp as SegmentValue)
            }
        }
    }

    return typeof children === 'function' ? (
        unwrapArray(children)({
            active,
            onSegmentItemClick,
            disabled,
            value: valueProp,
            ...rest,
        })
    ) : (
        <button
            ref={ref}
            className={classNames(
                'segment-item',
                getSegmentSize(),
                active && 'segment-item-active',
                disabled && 'segment-item-disabled',
                className,
            )}
            onClick={onSegmentItemClick}
            {...rest}
        >
            {children}
        </button>
    )
}

export default SegmentItem
