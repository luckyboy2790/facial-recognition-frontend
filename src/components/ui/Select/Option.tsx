import classNames from 'classnames'
import { HiCheck } from 'react-icons/hi'
import type { ReactNode } from 'react'
import type { OptionProps as ReactSelectOptionProps } from 'react-select'

type DefaultOptionProps<T> = {
    customLabel?: (data: T, label: string) => ReactNode
}

const Option = <T,>(
    props: ReactSelectOptionProps<T> & DefaultOptionProps<T>,
) => {
    const { innerProps, label, isSelected, isDisabled, data, customLabel } =
        props

    return (
        <div
            className={classNames(
                'select-option',
                !isDisabled &&
                    !isSelected &&
                    'hover:text-gray-800 hover:dark:text-gray-100',
                isSelected && 'text-primary bg-primary-subtle',
                isDisabled && 'opacity-50 cursor-not-allowed',
            )}
            {...innerProps}
        >
            {customLabel ? (
                customLabel(data, label)
            ) : (
                <span className="ml-2">{label}</span>
            )}
            {isSelected && <HiCheck className="text-xl" />}
        </div>
    )
}

export default Option
