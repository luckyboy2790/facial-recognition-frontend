import Button from '@/components/ui/Button'
import { TbDots } from 'react-icons/tb'
import type { ButtonProps } from '@/components/ui/Button'

type EllipsisButtonProps = ButtonProps

const EllipsisButton = (props: EllipsisButtonProps) => {
    const { shape = 'circle', variant = 'plain', size = 'xs' } = props

    return (
        <Button
            shape={shape}
            variant={variant}
            size={size}
            icon={<TbDots />}
            {...props}
        />
    )
}

export default EllipsisButton
