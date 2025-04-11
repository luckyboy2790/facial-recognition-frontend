import useTranslation from '@/utils/hooks/useTranslation'

const DashboardHeader = () => {
    const { t } = useTranslation()

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <h3>{t('page.dashboard.projects', 'Projects')}</h3>
            </div>
        </>
    )
}

export default DashboardHeader
