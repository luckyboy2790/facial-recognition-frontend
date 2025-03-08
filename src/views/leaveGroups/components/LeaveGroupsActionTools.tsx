import Button from '@/components/ui/Button'
import { TbCloudDownload, TbCloudUpload } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'

const CompanyActionTools = () => {
    const navigate = useNavigate()

    const customerList: any = []

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={customerList}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbCloudUpload className="text-xl" />}
            >
                Import
            </Button>
            <Button
                variant="solid"
                icon={
                    <FaPlus
                        className="text-xl"
                        onClick={() => navigate('/leavegroup')}
                    />
                }
            >
                Add
            </Button>
        </div>
    )
}

export default CompanyActionTools
