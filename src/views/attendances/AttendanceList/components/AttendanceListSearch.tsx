import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import { Ref } from 'react'
import DatePickerRange from '@/components/ui/DatePicker/DatePickerRange'

type CustomerListSearchProps = {
    onInputChange: (value: object) => void
    ref?: Ref<HTMLInputElement>
}

const CustomerListSearch = (props: CustomerListSearchProps) => {
    const { onInputChange, ref } = props

    return (
        <>
            <DatePickerRange
                ref={ref}
                placeholder="Select date"
                onChange={(e) => {
                    console.log(typeof e)
                    onInputChange(e)
                }}
            />
        </>
    )
}

export default CustomerListSearch
