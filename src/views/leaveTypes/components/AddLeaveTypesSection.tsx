import { useState } from 'react'
import { Button, Input } from '@/components/ui'
import { FaPlus } from 'react-icons/fa'
import Radio from '@/components/ui/Radio'

const AddCompanySection = () => {
    const [value, setValue] = useState('Banana')

    const onChange = (val: string) => {
        setValue(val)
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <Input placeholder="Job Title" />
                <Input placeholder="Credits" />
                <Radio.Group vertical value={value} onChange={onChange}>
                    <Radio value={'monthly'}>Monthly</Radio>
                    <Radio value={'yearly'}>Yearly</Radio>
                </Radio.Group>
            </div>
            <div className="flex justify-end">
                <Button variant="solid" icon={<FaPlus />}>
                    Create
                </Button>
            </div>
        </>
    )
}

export default AddCompanySection
