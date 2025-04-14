import Button from '@/components/ui/Button'
import useTranslation from '@/utils/hooks/useTranslation'
import { TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const LeaveListActionTools = () => {
    const navigate = useNavigate()

    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-3 md:flex-row">
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/personal/leave-create')}
            >
                {t('page.add_new', 'Add new')}
            </Button>
        </div>
    )
}

export default LeaveListActionTools
