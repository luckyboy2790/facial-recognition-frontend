import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { GiReturnArrow } from 'react-icons/gi'
import useTranslation from '@/utils/hooks/useTranslation'

const LeaveListActionTools = () => {
    const navigate = useNavigate()

    const { t } = useTranslation()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="default"
                icon={<GiReturnArrow className="text-xl" />}
                onClick={() => navigate('/reports')}
            >
                {t('page.return', 'Return')}
            </Button>
        </div>
    )
}

export default LeaveListActionTools
