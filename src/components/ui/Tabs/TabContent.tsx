import classNames from 'classnames'
import { useTabs } from './context'
import type { CommonProps } from '../@types/common'
import type { TabsValue } from './context'
import type { Ref } from 'react'

export interface TabContentProps extends CommonProps {
    ref?: Ref<HTMLDivElement>
    value: TabsValue
}

const TabContent = (props: TabContentProps) => {
    const { value, children, className, ref, ...rest } = props

    const context = useTabs()
    const isSelected = value === context.value

    const tabContentClass = classNames(
        'tab-content',
        isSelected && 'tab-content-active',
        className,
    )

    return (
        <div
            ref={ref}
            role="tabpanel"
            tabIndex={0}
            className={tabContentClass}
            {...rest}
        >
            {isSelected && children}
        </div>
    )
}

export default TabContent
