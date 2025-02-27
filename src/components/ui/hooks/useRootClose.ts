/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback, useRef } from 'react'
import type { RefObject, ReactEventHandler } from 'react'

type Options = {
    disabled: boolean
    triggerTarget: RefObject<HTMLElement | null>
    overlayTarget: RefObject<HTMLElement | null>
    listenEscape?: boolean
}

interface CustomEventListener<T = any> {
    (evt: T): void
}

const domContains = (context: Element, node: (Node & ParentNode) | null) => {
    if (context.contains) {
        return context.contains(node)
    } else if (context.compareDocumentPosition) {
        return (
            context === node ||
            !!(context.compareDocumentPosition(node as Node) & 16)
        )
    }
    if (node) {
        do {
            if (node === context) {
                return true
            }
        } while ((node = node.parentNode))
    }
    return false
}

function isLeftClickEvent(e: MouseEvent) {
    return e?.button === 0
}

function isModifiedEvent(e: MouseEvent) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e?.shiftKey)
}

function onEventListener<K extends keyof DocumentEventMap>(
    target: Element | Window | Document | EventTarget,
    eventType: K,
    listener: EventListenerOrEventListenerObject | CustomEventListener,
    options: boolean | AddEventListenerOptions = false,
): { off: () => void } {
    target.addEventListener(eventType, listener, options)

    return {
        off() {
            target.removeEventListener(eventType, listener, options)
        },
    }
}

function useRootClose(
    onRootClose: ReactEventHandler | undefined,
    { disabled, triggerTarget, overlayTarget }: Options,
) {
    const handleDocumentMouseDown = useCallback(
        (event: any) => {
            const triggerElement = triggerTarget?.current
            const overlayElement = overlayTarget?.current

            if (triggerElement && domContains(triggerElement, event.target)) {
                return
            }

            if (overlayElement && domContains(overlayElement, event.target)) {
                return
            }

            if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
                return
            }

            onRootClose?.(event)
        },
        [onRootClose, triggerTarget, overlayTarget],
    )

    const handleDocumentMouseDownRef = useRef(handleDocumentMouseDown)

    useEffect(() => {
        handleDocumentMouseDownRef.current = handleDocumentMouseDown
    }, [handleDocumentMouseDown])

    useEffect(() => {
        const currentTarget = triggerTarget?.current

        if (disabled || !currentTarget) return

        const doc = () =>
            (currentTarget && currentTarget.ownerDocument) || document
        const onDocumentMouseDownListener = onEventListener(
            doc(),
            'mousedown',
            (event: any) => handleDocumentMouseDownRef.current(event),
            true,
        )

        return () => {
            onDocumentMouseDownListener?.off()
        }
    }, [triggerTarget, disabled])
}

export default useRootClose
