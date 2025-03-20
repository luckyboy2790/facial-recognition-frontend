import { Ref, useState } from 'react'
import DatePickerRange from '@/components/ui/DatePicker/DatePickerRange'

type DatePickerRangeValue = [Date | null, Date | null] // Ensure compatibility with DatePickerRange
type CustomerListSearchProps = {
    onInputChange: (value: string) => void
    ref?: Ref<HTMLInputElement>
}

const CustomerListSearch = (props: CustomerListSearchProps) => {
    const { onInputChange, ref } = props

    const handleDateChange = (dates: DatePickerRangeValue) => {
        if (dates[0] && dates[1]) {
            onInputChange(JSON.stringify([dates[0], dates[1]]))
        } else {
            onInputChange('')
        }
    }

    return (
        <>
            <DatePickerRange
                ref={ref}
                placeholder="Select date"
                onChange={handleDateChange}
            />
        </>
    )
}

export default CustomerListSearch
