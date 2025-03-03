import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'

const CustomerListActionTools = () => {
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
        </div>
    )
}

export default CustomerListActionTools
