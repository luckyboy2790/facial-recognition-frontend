import classNames from '../utils/classNames'
import { useTabs } from './context'
import useCallbackRef from '../hooks/useCallbackRef'
import type { CommonProps } from '../@types/common'
import type { TabsValue } from './context'
import type { ReactNode, Ref } from 'react'

export interface TabNavProps extends CommonProps {
    disabled?: boolean
    icon?: string | ReactNode
    ref?: Ref<HTMLDivElement>
    value: TabsValue
}

const TabNav = (props: TabNavProps) => {
    const {
        value: valueProp,
        disabled,
        className,
        icon,
        children,
        ref,
        ...rest
    } = props

    const { value, onValueChange, variant } = useTabs()
    const isSelected = valueProp === value

    const onTabNavClick = useCallbackRef(() => {
        if (!isSelected && !disabled) {
            onValueChange?.(valueProp)
        }
    })

    const tabNavClass = classNames(
        'tab-nav',
        `tab-nav-${variant}`,
        isSelected && `tab-nav-active text-primary`,
        isSelected && variant === 'underline' && `border-primary`,
        isSelected && variant === 'pill' && `bg-primary text-neutral`,
        disabled && 'tab-nav-disabled',
        !disabled && !isSelected && `hover:text-primary`,
        className,
    )

    return (
        <div
            ref={ref}
            className={tabNavClass}
            role="tab"
            aria-selected={isSelected}
            tabIndex={0}
            onClick={onTabNavClick}
            onKeyDown={onTabNavClick}
            {...rest}
        >
            {icon && <div className="tab-nav-icon">{icon}</div>}
            {children}
        </div>
    )
}

export default TabNav
