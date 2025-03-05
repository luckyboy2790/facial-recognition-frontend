import { Button, Input, Select } from '@/components/ui'
import { FaPlus } from 'react-icons/fa'

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
]

const AddCompanySection = () => {
    return (
        <>
            <div className="flex flex-col gap-4">
                <Input placeholder="Job Title" />
                <Select
                    size="lg"
                    className="mb-4"
                    placeholder="Select Department"
                    options={colourOptions}
                ></Select>
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
