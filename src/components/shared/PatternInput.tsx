import { PatternFormat, PatternFormatProps } from 'react-number-format'
import Input from '@/components/ui/Input'
import type { ReactNode, ComponentType } from 'react'
import type { InputProps } from '@/components/ui'

interface InputAffix {
    inputSuffix?: string | ReactNode
    inputPrefix?: string | ReactNode
}

interface NumberInputProps
    extends Omit<InputProps, 'prefix' | 'suffix'>,
        InputAffix {}

type NumberFormatInputProps = Omit<PatternFormatProps, 'form'> & InputAffix

type PatternInputProps = NumberInputProps & NumberFormatInputProps

const NumberInput = ({
    inputSuffix,
    inputPrefix,
    ...props
}: NumberInputProps) => {
    return (
        <Input
            {...props}
            value={props.value}
            suffix={inputSuffix}
            prefix={inputPrefix}
        />
    )
}

const NumberFormatInput = ({
    onValueChange,
    ...rest
}: NumberFormatInputProps) => {
    return (
        <PatternFormat
            customInput={NumberInput as ComponentType}
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

const PatternInput = ({
    inputSuffix,
    inputPrefix,
    onValueChange,
    ...rest
}: PatternInputProps) => {
    return (
        <NumberFormatInput
            inputPrefix={inputPrefix}
            inputSuffix={inputSuffix}
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

export default PatternInput
