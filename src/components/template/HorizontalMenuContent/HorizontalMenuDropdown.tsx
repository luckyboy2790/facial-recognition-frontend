import { useEffect, useState, useRef, useContext, createContext } from 'react'
import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingList,
    FloatingNode,
    FloatingPortal,
    FloatingTree,
    offset,
    safePolygon,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useFloatingTree,
    useHover,
    useInteractions,
    useListItem,
    useListNavigation,
    useMergeRefs,
    useRole,
    useTypeahead,
    useTransitionStyles,
} from '@floating-ui/react'
import type {
    CSSProperties,
    HTMLProps,
    Dispatch,
    SetStateAction,
    ReactNode,
} from 'react'

interface HorizontalMenuDropdownProps {
    dropdownLean?: boolean
    triggerContent?: (payload: {
        ref: ((instance: HTMLElement | null) => void) | null
        props: { [x: string]: unknown }
        isOpen: boolean
        hasFocusInside: boolean
    }) => ReactNode
    menuContent?: (props: {
        styles: CSSProperties
        handleDropdownClose: () => void
    }) => ReactNode
}

const MenuContext = createContext<{
    getItemProps: (
        userProps?: HTMLProps<HTMLElement>,
    ) => Record<string, unknown>
    activeIndex: number | null
    setActiveIndex: Dispatch<SetStateAction<number | null>>
    setHasFocusInside: Dispatch<SetStateAction<boolean>>
    isOpen: boolean
}>({
    getItemProps: () => ({}),
    activeIndex: null,
    setActiveIndex: () => {},
    setHasFocusInside: () => {},
    isOpen: false,
})

const HorizontalMenuDropdown = (props: HorizontalMenuDropdownProps) => {
    const { menuContent, triggerContent, dropdownLean } = props

    const [isOpen, setIsOpen] = useState(false)
    const [hasFocusInside, setHasFocusInside] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([])
    const labelsRef = useRef<Array<string | null>>([])
    const parent = useContext(MenuContext)

    const tree = useFloatingTree()
    const nodeId = useFloatingNodeId()
    const parentId = useFloatingParentNodeId()
    const item = useListItem()

    const isNested = parentId != null

    const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
        nodeId,
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: isNested
            ? 'right-start'
            : dropdownLean
              ? 'bottom-start'
              : 'bottom',
        middleware: [
            offset({
                mainAxis: isNested ? 0 : 4,
                alignmentAxis: isNested ? -4 : 0,
            }),
            flip(),
            shift(),
        ],
        whileElementsMounted: autoUpdate,
    })

    const { isMounted, styles } = useTransitionStyles(context, {
        common: ({ side }) => ({
            transformOrigin: {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left',
            }[side],
        }),
        initial: {
            transform: 'translateY(-5%)',
            opacity: 0,
        },
        duration: 200,
        open: {
            opacity: 1,
            transform: 'translateY(0%)',
        },
        close: {
            opacity: 0,
            transform: 'translateY(-5%)',
        },
    })

    const hover = useHover(context, {
        enabled: isNested,
        handleClose: safePolygon({ blockPointerEvents: true }),
    })
    const click = useClick(context, {
        event: 'mousedown',
        toggle: !isNested,
        ignoreMouse: isNested,
    })
    const role = useRole(context, { role: 'menu' })
    const dismiss = useDismiss(context, { bubbles: true })
    const listNavigation = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        nested: isNested,
        onNavigate: setActiveIndex,
    })
    const typeahead = useTypeahead(context, {
        listRef: labelsRef,
        onMatch: isOpen ? setActiveIndex : undefined,
        activeIndex,
    })

    const { getReferenceProps, getFloatingProps, getItemProps } =
        useInteractions([
            hover,
            click,
            role,
            dismiss,
            listNavigation,
            typeahead,
        ])

    const handleDropdownClose = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        if (!tree) return

        function handleTreeClick() {
            handleDropdownClose()
        }

        function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
            if (event.nodeId !== nodeId && event.parentId === parentId) {
                handleDropdownClose()
            }
        }

        tree.events.on('click', handleTreeClick)
        tree.events.on('menuopen', onSubMenuOpen)

        return () => {
            tree.events.off('click', handleTreeClick)
            tree.events.off('menuopen', onSubMenuOpen)
        }
    }, [tree, nodeId, parentId])

    useEffect(() => {
        if (isOpen && tree) {
            tree.events.emit('menuopen', { parentId, nodeId })
        }
    }, [tree, isOpen, nodeId, parentId])

    const dropdownRef = useMergeRefs([refs.setReference, item.ref])
    const dropdownProps = {
        ...getReferenceProps(
            parent.getItemProps({
                ...props,
                onFocus() {
                    setHasFocusInside(false)
                    parent.setHasFocusInside(true)
                },
            }),
        ),
    }

    return (
        <FloatingTree>
            <FloatingNode id={nodeId}>
                {triggerContent?.({
                    ref: dropdownRef,
                    props: dropdownProps,
                    hasFocusInside,
                    isOpen: isMounted,
                })}
                <MenuContext.Provider
                    value={{
                        activeIndex,
                        setActiveIndex,
                        getItemProps,
                        setHasFocusInside,
                        isOpen,
                    }}
                >
                    <FloatingList
                        elementsRef={elementsRef}
                        labelsRef={labelsRef}
                    >
                        {isMounted && (
                            <FloatingPortal>
                                <FloatingFocusManager
                                    context={context}
                                    modal={false}
                                    initialFocus={isNested ? -1 : 0}
                                    returnFocus={!isNested}
                                >
                                    <div
                                        ref={refs.setFloating}
                                        style={floatingStyles}
                                        className="outline-none z-30"
                                        {...getFloatingProps()}
                                    >
                                        {menuContent?.({
                                            styles,
                                            handleDropdownClose,
                                        })}
                                    </div>
                                </FloatingFocusManager>
                            </FloatingPortal>
                        )}
                    </FloatingList>
                </MenuContext.Provider>
            </FloatingNode>
        </FloatingTree>
    )
}

export default HorizontalMenuDropdown
