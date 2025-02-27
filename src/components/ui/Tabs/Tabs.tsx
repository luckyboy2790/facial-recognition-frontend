import { TabsContextProvider } from './context'
import useControllableState from '../hooks/useControllableState'
import classNames from 'classnames'
import type { CommonProps } from '../@types/common'
import type { TabsVariant, TabsValue } from './context'
import type { Ref } from 'react'

export interface TabsProps extends CommonProps {
    defaultValue?: TabsValue
    onChange?: (tabValue: TabsValue) => void
    ref?: Ref<HTMLDivElement>
    value?: TabsValue
    variant?: TabsVariant
}

const Tabs = (props: TabsProps) => {
    const {
        className,
        defaultValue,
        onChange,
        ref,
        value: valueProp,
        variant = 'underline',
        ...rest
    } = props

    const [value, setValue] = useControllableState({
        prop: valueProp,
        onChange: onChange,
        defaultProp: defaultValue,
    })

    const tabsClass = classNames('tabs', className)

    return (
        <TabsContextProvider
            value={{
                value: value,
                onValueChange: setValue,
                variant,
            }}
        >
            <div className={tabsClass} {...rest} ref={ref} />
        </TabsContextProvider>
    )
}

export default Tabs
