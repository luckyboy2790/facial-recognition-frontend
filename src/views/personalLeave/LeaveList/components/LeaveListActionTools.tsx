import Button from '@/components/ui/Button'
import { TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const LeaveListActionTools = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-3 md:flex-row">
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/personal/leave-create')}
            >
                Add new
            </Button>
        </div>
    )
}

export default LeaveListActionTools
