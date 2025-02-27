import { Children } from 'react'
import classNames from 'classnames'
import mapCloneElement from '../utils/mapCloneElement'
import type { DetailedReactHTMLElement, Ref } from 'react'
import type { CommonProps } from '../@types/common'

export type TimelineProps = CommonProps & {
    ref?: Ref<HTMLUListElement>
}

const Timeline = (props: TimelineProps) => {
    const { children, className, ref } = props

    const count = Children.count(children)

    const items = mapCloneElement(
        children,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: DetailedReactHTMLElement<any, HTMLElement>, index: number) => ({
            isLast: index === count - 1,
            ...item.props,
        }),
    )

    return (
        <ul ref={ref} className={classNames('timeline', className)}>
            {items}
        </ul>
    )
}

export default Timeline
