import { AdaptiveCard } from '@/components/shared'
import AboutFeatures from './AboutFeatures'
import AboutSendFeedback from './AboutSendFeedback'
import useTranslation from '@/utils/hooks/useTranslation'

const AboutContent = () => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-4">
            <h5>
                {t(
                    'page.setting.workday',
                    'Workday a time clock application for employees',
                )}
            </h5>
            <p>
                {t(
                    'page.setting.workday_description',
                    'Easily track and manage employee work hours on jobs, improve your payroll process and collaborate with your timekeeping employees like never before.',
                )}
            </p>
            <AdaptiveCard>
                <div className="flex flex-col gap-10">
                    <AboutFeatures />
                    <AboutSendFeedback />
                </div>
            </AdaptiveCard>
        </div>
    )
}

export default AboutContent
