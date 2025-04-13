import Button from '@/components/ui/Button'
import useTranslation from '@/utils/hooks/useTranslation'
import { TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const ScheduleListActionTools = () => {
    const navigate = useNavigate()

    const { t } = useTranslation()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/schedule-create')}
            >
                {t('page.add_new', 'Add new')}
            </Button>
        </div>
    )
}

export default ScheduleListActionTools
