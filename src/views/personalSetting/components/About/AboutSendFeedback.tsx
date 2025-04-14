import useTranslation from '@/utils/hooks/useTranslation'

const AboutSendFeedback = () => {
    const { t } = useTranslation()

    return (
        <div className="pb-6">
            <h6>{t('page.setting.send_feedback', 'Send Feedback')}</h6>
            <p>
                {t(
                    'page.setting.send_feedback_description',
                    "Write your feedback and send it to our developer's email address jairo.visionam@gmail.com",
                )}
            </p>
        </div>
    )
}

export default AboutSendFeedback
