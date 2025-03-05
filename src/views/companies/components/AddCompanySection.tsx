import { Button, Input } from '@/components/ui'
import { FaPlus } from 'react-icons/fa'

const AddCompanySection = () => {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <Input placeholder="Company name" />
                <Button variant="solid" icon={<FaPlus />}>
                    Create
                </Button>
            </div>
        </>
    )
}

export default AddCompanySection
