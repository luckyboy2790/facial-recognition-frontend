import type { ComponentPropsWithRef, ElementType } from 'react'

export interface TBodyProps extends ComponentPropsWithRef<'tbody'> {
    asElement?: ElementType
}

const TBody = (props: TBodyProps) => {
    const { asElement: Component = 'tbody', children, ref, ...rest } = props

    return (
        <Component {...rest} ref={ref}>
            {children}
        </Component>
    )
}

export default TBody
