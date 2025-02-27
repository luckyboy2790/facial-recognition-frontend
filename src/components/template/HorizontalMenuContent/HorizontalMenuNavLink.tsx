import { Link } from 'react-router-dom'
import classNames from 'classnames'
import type { CommonProps } from '@/@types/common'
import type { AnchorHTMLAttributes } from 'react'

export interface HorizontalMenuNavLinkProps
    extends CommonProps,
        AnchorHTMLAttributes<HTMLAnchorElement> {
    path: string
    isExternalLink?: boolean
    className?: string
}

const HorizontalMenuNavLink = ({
    path,
    children,
    isExternalLink,
    className,
    onClick,
}: HorizontalMenuNavLinkProps) => {
    return (
        <Link
            className={classNames(
                'w-full flex items-center outline-0',
                className,
            )}
            to={path}
            target={isExternalLink ? '_blank' : ''}
            onClick={onClick}
        >
            {children}
        </Link>
    )
}

export default HorizontalMenuNavLink
