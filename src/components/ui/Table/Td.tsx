import type { ComponentPropsWithRef, ElementType } from 'react'

export interface TdProps extends ComponentPropsWithRef<'td'> {
    asElement?: ElementType
}

const Td = (props: TdProps) => {
    const { asElement: Component = 'td', children, ref, ...rest } = props

    return (
        <Component ref={ref} {...rest}>
            {children}
        </Component>
    )
}

export default Td
