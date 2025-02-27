import { createContext } from 'react'

export type CheckboxValue = string | number | boolean
export type CheckboxGroupValue = string[]

export interface CheckboxGroupContextProps {
    checkboxClass?: string
    name?: string
    onChange?: (
        value: CheckboxValue,
        checked: boolean,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void
    value?: CheckboxGroupValue
    vertical?: boolean
}

const CheckboxGroupContext = createContext<CheckboxGroupContextProps>({})

export const CheckboxGroupContextProvider = CheckboxGroupContext.Provider

export default CheckboxGroupContext
