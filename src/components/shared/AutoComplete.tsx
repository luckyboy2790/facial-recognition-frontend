import { ReactNode, ChangeEvent, useRef, useState, useEffect } from 'react'
import {
    autoUpdate,
    size,
    flip,
    useId,
    useDismiss,
    useFloating,
    useInteractions,
    useListNavigation,
    useRole,
    FloatingFocusManager,
    FloatingPortal,
} from '@floating-ui/react'
import Input, { InputProps } from '@/components/ui/Input'

interface ItemProps {
    children: React.ReactNode
    active: boolean
    ref?: React.Ref<HTMLDivElement>
}

type AutoCompleteProps<T> = Omit<InputProps, 'onChange'> & {
    data: Array<T>
    optionKey: (obj: T) => string
    value: string
    onInputChange: (value: string) => void
    onOptionSelected: (option: T) => void
    renderOption: (option: T) => ReactNode
}

const Item = ({
    children,
    active,
    ref,
    ...rest
}: ItemProps & React.HTMLProps<HTMLDivElement>) => {
    const id = useId()
    return (
        <div
            ref={ref}
            role="option"
            id={id}
            aria-selected={active}
            {...rest}
            className="select-option hover:text-gray-800 hover:dark:text-gray-100"
        >
            {children}
        </div>
    )
}

function AutoComplete<T>(props: AutoCompleteProps<T>) {
    const {
        data = [],
        optionKey,
        value,
        onInputChange,
        onOptionSelected,
        renderOption,
        ...rest
    } = props
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const [options, setOptions] = useState<Array<T>>([])

    const listRef = useRef<Array<HTMLElement | null>>([])

    useEffect(() => {
        const items = data.filter((item) =>
            optionKey(item).toLowerCase().includes(value.toLowerCase()),
        )
        setOptions(items)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
        whileElementsMounted: autoUpdate,
        open,
        onOpenChange: setOpen,
        middleware: [
            flip({ padding: 10 }),
            size({
                apply({ rects, availableHeight, elements }) {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`,
                        maxHeight: `${availableHeight}px`,
                    })
                },
                padding: 10,
            }),
        ],
    })

    const role = useRole(context, { role: 'listbox' })
    const dismiss = useDismiss(context)
    const listNav = useListNavigation(context, {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
        virtual: true,
        loop: true,
    })

    const { getReferenceProps, getFloatingProps, getItemProps } =
        useInteractions([role, dismiss, listNav])

    function onAutoCompleteChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        onInputChange(value)
        const items = data.filter((item) =>
            optionKey(item).toLowerCase().includes(value.toLowerCase()),
        )
        if (value && items.length > 0) {
            setOpen(true)
            setActiveIndex(0)
        } else {
            setOpen(false)
        }
    }

    return (
        <>
            <Input
                {...rest}
                {...getReferenceProps({
                    ref: refs.setReference,
                    onChange: onAutoCompleteChange,
                    value: value,
                    'aria-autocomplete': 'list',
                    onKeyDown(event) {
                        if (
                            event.key === 'Enter' &&
                            activeIndex != null &&
                            options[activeIndex]
                        ) {
                            onInputChange(optionKey(options[activeIndex]))
                            setActiveIndex(null)
                            setOpen(false)
                        }
                    },
                })}
            />
            <FloatingPortal>
                {open && (
                    <FloatingFocusManager
                        visuallyHiddenDismiss
                        context={context}
                        initialFocus={-1}
                    >
                        <div
                            {...getFloatingProps({
                                ref: refs.setFloating,
                                style: {
                                    ...floatingStyles,
                                },
                                className: 'select-menu py-1',
                            })}
                        >
                            {options.map((item, index) => (
                                <Item
                                    {...getItemProps({
                                        key: optionKey(item),
                                        ref(node) {
                                            listRef.current[index] = node
                                        },
                                        onClick() {
                                            onInputChange(optionKey(item))
                                            onOptionSelected(item)
                                            setOpen(false)
                                            refs.domReference.current?.focus()
                                        },
                                    })}
                                    key={`auto-complete-item-${index}`}
                                    active={activeIndex === index}
                                >
                                    {renderOption(item)}
                                </Item>
                            ))}
                        </div>
                    </FloatingFocusManager>
                )}
            </FloatingPortal>
        </>
    )
}

export default AutoComplete
