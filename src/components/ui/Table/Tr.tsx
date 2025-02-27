import type { ComponentPropsWithRef, ElementType } from 'react'

export interface TrProps extends ComponentPropsWithRef<'tr'> {
    asElement?: ElementType
}

const Tr = (props: TrProps) => {
    const { asElement: Component = 'tr', children, ref, ...rest } = props

    return (
        <Component ref={ref} {...rest}>
            {children}
        </Component>
    )
}

export default Tr
