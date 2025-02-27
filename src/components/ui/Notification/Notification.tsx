import { useCallback, useState } from 'react'
import classNames from 'classnames'
import useTimeout from '../hooks/useTimeout'
import CloseButton from '../CloseButton'
import StatusIcon from '../StatusIcon'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type { ReactNode, MouseEvent, Ref } from 'react'

export interface NotificationProps extends CommonProps {
    closable?: boolean
    customIcon?: ReactNode | string
    duration?: number
    onClose?: (e: MouseEvent<HTMLSpanElement>) => void
    ref?: Ref<HTMLDivElement>
    title?: string
    triggerByToast?: boolean
    type?: TypeAttributes.Status
    width?: number | string
}

const Notification = (props: NotificationProps) => {
    const {
        className,
        children,
        closable = false,
        customIcon,
        duration = 3000,
        onClose,
        style,
        ref,
        title,
        triggerByToast,
        type,
        width = 350,
        ...rest
    } = props

    const [display, setDisplay] = useState('show')

    const { clear } = useTimeout(onClose as () => void, duration, duration > 0)

    const handleClose = useCallback(
        (e: MouseEvent<HTMLSpanElement>) => {
            setDisplay('hiding')
            onClose?.(e)
            clear()
            if (!triggerByToast) {
                setTimeout(() => {
                    setDisplay('hide')
                }, 400)
            }
        },
        [onClose, clear, triggerByToast],
    )

    const notificationClass = classNames('notification', className)

    if (display === 'hide') {
        return null
    }

    return (
        <div
            ref={ref}
            {...rest}
            className={notificationClass}
            style={{ width: width, ...style }}
        >
            <div
                className={classNames(
                    'notification-content',
                    !children && 'no-child',
                )}
            >
                {type && !customIcon ? (
                    <div className="mr-3 mt-0.5">
                        <StatusIcon type={type} />
                    </div>
                ) : null}
                {customIcon && <div className="mr-3">{customIcon}</div>}
                <div className="mr-4">
                    {title && (
                        <div
                            className={classNames(
                                'notification-title',
                                children ? 'mb-2' : '',
                            )}
                        >
                            {title}
                        </div>
                    )}
                    <div
                        className={classNames(
                            'notification-description',
                            !title && children ? 'mt-1' : '',
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
            {closable && (
                <CloseButton
                    className="notification-close"
                    absolute={true}
                    onClick={handleClose}
                />
            )}
        </div>
    )
}

export default Notification
