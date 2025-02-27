import { useRef, useState, useEffect, ReactNode } from 'react'
import classNames from 'classnames'
import useDebounce from '@/utils/hooks/useDebounce'
import type { HTMLAttributes } from 'react'

interface StickyFooterProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    stickyClass?: string
    defaultClass?: string
    children?: ReactNode | ((isSticky: boolean) => ReactNode)
}

const StickyFooter = (props: StickyFooterProps) => {
    const { children, className, stickyClass, defaultClass, ...rest } = props

    const [isSticky, setIsSticky] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    function handleDebounceFn(val: boolean) {
        setIsSticky(val)
    }

    const debounceFn = useDebounce(handleDebounceFn, 100)

    useEffect(() => {
        const cachedRef = ref.current
        const observer = new IntersectionObserver(
            ([e]) => {
                console.log(
                    'e.intersectionRatio < 1',
                    e.intersectionRatio,
                    e.intersectionRatio < 1,
                )
                if (!(e.intersectionRatio < 1)) {
                    window.scrollTo({
                        top: document.body.scrollHeight - 1,
                        behavior: 'smooth',
                    })
                }
                debounceFn(e.intersectionRatio < 1)
            },
            {
                threshold: [1],
            },
        )

        observer.observe(cachedRef as Element)

        return function () {
            observer.unobserve(cachedRef as Element)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            ref={ref}
            className={classNames(
                'static -bottom-[1px]',
                className,
                isSticky ? classNames(stickyClass, 'sticky') : defaultClass,
            )}
            {...rest}
        >
            {typeof children === 'function' ? children(isSticky) : children}
        </div>
    )
}

export default StickyFooter
