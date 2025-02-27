import type { ComponentPropsWithRef, ElementType } from 'react'

export interface TFootProps extends ComponentPropsWithRef<'tfoot'> {
    asElement?: ElementType
}

const TFoot = (props: TFootProps) => {
    const { asElement: Component = 'tfoot', children, ref, ...rest } = props

    return (
        <Component {...rest} ref={ref}>
            {children}
        </Component>
    )
}

export default TFoot
