import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'
import { TbColumns1 } from 'react-icons/tb'
import { TbColumns2 } from 'react-icons/tb'

interface EmployeeListActionToolProps {
    isViewed: boolean
    handleChange: (isViewed: boolean) => void
}

const EmployeeListActionTools = ({
    isViewed,
    handleChange,
}: EmployeeListActionToolProps) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="default"
                icon={<GiReturnArrow className="text-xl" />}
                onClick={() => navigate('/reports')}
            >
                Return
            </Button>

            <Button
                icon={
                    isViewed === true ? (
                        <TbColumns2 className="text-xl" />
                    ) : (
                        <TbColumns1 className="text-xl" />
                    )
                }
                className="w-full"
                onClick={() => handleChange(isViewed)}
            >
                View
            </Button>
        </div>
    )
}

export default EmployeeListActionTools
