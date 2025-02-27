import classNames from '@/utils/classNames'
import type { ComponentProps } from 'react'

export type ToolButtonProps = ComponentProps<'button'> & {
    active?: boolean
    title?: string
}

const ToolButton = (props: ToolButtonProps) => {
    const { className, disabled, active, ...rest } = props

    return (
        <button
            className={classNames(
                'tool-button text-xl heading-text hover:text-primary flex items-center p-1.5 rounded-lg',
                active && 'text-primary',
                disabled && 'opacity-20 cursor-not-allowed',
                className,
            )}
            type="button"
            disabled={disabled}
            {...rest}
        />
    )
}

export default ToolButton
