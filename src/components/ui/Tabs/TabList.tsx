import classNames from 'classnames'
import { useTabs } from './context'
import type { CommonProps } from '../@types/common'
import type { Ref } from 'react'

export type TabListProps = CommonProps & {
    ref?: Ref<HTMLDivElement>
}

const TabList = (props: TabListProps) => {
    const { className, children, ref, ...rest } = props

    const { variant } = useTabs()

    const tabListClass = classNames(
        'tab-list',
        `tab-list-${variant}`,
        className,
    )

    return (
        <div ref={ref} role="tablist" className={tabListClass} {...rest}>
            {children}
        </div>
    )
}

export default TabList
