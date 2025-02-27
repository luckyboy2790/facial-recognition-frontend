import classNames from '@/utils/classNames'
import HorizontalMenuNavLink from './HorizontalMenuNavLink'
import type { CommonProps } from '@/@types/common'
import type { HorizontalMenuNavLinkProps } from './HorizontalMenuNavLink'
import type { ButtonHTMLAttributes, Ref } from 'react'

interface HorizontalMenuDropdownTriggerCommonProps extends CommonProps {
    active?: boolean
}

interface ButtonProps
    extends HorizontalMenuDropdownTriggerCommonProps,
        ButtonHTMLAttributes<HTMLButtonElement> {
    asElement?: 'button'
    ref?: Ref<HTMLButtonElement>
}

interface AnchorProps
    extends HorizontalMenuNavLinkProps,
        HorizontalMenuDropdownTriggerCommonProps {
    asElement?: 'a'
    path: string
    isExternalLink?: boolean
}

type HorizontalMenuDropdownTriggerProps = ButtonProps | AnchorProps

const HorizontalMenuDropdownTrigger = (
    props: HorizontalMenuDropdownTriggerProps,
) => {
    const { className, active, asElement = 'button', ...rest } = props
    const commonProps = {
        className: classNames(
            'font-semibold inline-flex h-9 w-max items-center justify-center rounded-lg bg-background px-4 py-2 dark:text-gray-300 dark:hover:text-gray-100 text-gray-900 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors',
            className,
            active &&
                'bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20',
        ),
    }

    if (asElement === 'a') {
        const { path, isExternalLink, ...anchorProps } = rest as AnchorProps
        return (
            <HorizontalMenuNavLink
                path={path as string}
                isExternalLink={isExternalLink}
                {...commonProps}
                {...anchorProps}
            />
        )
    }

    if (asElement === 'button') {
        return (
            <button
                ref={(rest as ButtonProps).ref}
                {...commonProps}
                {...(rest as ButtonProps)}
            />
        )
    }

    return <></>
}

export default HorizontalMenuDropdownTrigger
