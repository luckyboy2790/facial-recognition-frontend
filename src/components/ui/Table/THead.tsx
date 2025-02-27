import type { ComponentPropsWithRef, ElementType } from 'react'

export interface THeadProps extends ComponentPropsWithRef<'thead'> {
    asElement?: ElementType
}

const THead = (props: THeadProps) => {
    const { asElement: Component = 'thead', children, ref, ...rest } = props

    return (
        <Component {...rest} ref={ref}>
            {children}
        </Component>
    )
}

export default THead
