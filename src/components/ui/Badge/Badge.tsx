import classNames from '../utils/classNames'
import type { CommonProps } from '../@types/common'
import type { CSSProperties, Ref } from 'react'

export interface BadgeProps extends CommonProps {
    badgeStyle?: CSSProperties
    content?: string | number
    innerClass?: string
    maxCount?: number
    ref?: Ref<HTMLSpanElement>
}

const Badge = (props: BadgeProps) => {
    const {
        badgeStyle,
        children,
        className,
        content,
        innerClass,
        maxCount = 99,
        ref,
        ...rest
    } = props

    const badgeBaseClass =
        'rounded-full text-xs font-semibold bg-error text-white'

    const dot = typeof content !== 'number' && typeof content !== 'string'

    const badgeClass = classNames(
        dot
            ? 'badge-dot w-3 h-3 border border-white dark:border-gray-900'
            : 'badge px-2 py-1 min-w-6',
        badgeBaseClass,
        innerClass,
    )

    const renderBadge = () => {
        if (children) {
            return (
                <span
                    ref={ref}
                    className={classNames(
                        'badge-wrapper relative flex',
                        className,
                    )}
                    {...rest}
                >
                    <span
                        className={classNames(badgeClass, 'badge-inner')}
                        style={badgeStyle}
                    >
                        {typeof content === 'number' && content > maxCount
                            ? `${maxCount}+`
                            : content}
                    </span>
                    {children}
                </span>
            )
        }
        return (
            <span
                ref={ref}
                className={classNames(badgeClass, className)}
                style={badgeStyle}
                {...rest}
            >
                {content}
            </span>
        )
    }

    return renderBadge()
}

Badge.displayName = 'Badge'

export default Badge
