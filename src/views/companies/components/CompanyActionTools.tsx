import Button from '@/components/ui/Button'
import { TbCloudDownload, TbCloudUpload } from 'react-icons/tb'
import { CSVLink } from 'react-csv'

const CompanyActionTools = () => {
    const companyList: any = []

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="companyList.csv"
                data={companyList}
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
        </div>
    )
}

export default CompanyActionTools
