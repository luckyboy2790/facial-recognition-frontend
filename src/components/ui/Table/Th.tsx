import type { ComponentPropsWithRef, ElementType } from 'react'

export interface ThProps extends ComponentPropsWithRef<'th'> {
    asElement?: ElementType
}

const Th = (props: ThProps) => {
    const { asElement: Component = 'th', children, ref, ...rest } = props

    return (
        <Component {...rest} ref={ref}>
            {children}
        </Component>
    )
}

export default Th
