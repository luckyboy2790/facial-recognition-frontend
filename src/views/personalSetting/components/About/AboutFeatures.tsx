import useTranslation from '@/utils/hooks/useTranslation'

const AboutFeatures = () => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-6 pb-6 border-b-slate-500 border-b-[1px] border-solid">
            <h6>{t('page.setting.features', 'Features')}</h6>
            <div>
                <ul className="list-disc pl-5">
                    <li>
                        {t(
                            'page.setting.employee_management',
                            'Employee Management (HRIS)',
                        )}
                    </li>
                    <li>
                        {t(
                            'page.setting.time_attendance_management',
                            'Time and Attendance Management',
                        )}
                    </li>
                    <li>
                        {t(
                            'page.setting.employee_time_tracking',
                            'Employee Time Tracking',
                        )}
                    </li>
                    <li>
                        {t('page.setting.shift_management', 'Shift Management')}
                    </li>
                    <li>
                        {t('page.setting.leave_management', 'Leave Management')}
                    </li>
                    <li>
                        {t(
                            'page.setting.reporting_analytics',
                            'Reporting and Analytics',
                        )}
                    </li>
                    <li>{t('page.setting.multi_company', 'Multi-company')}</li>
                    <li>
                        {t(
                            'page.setting.manager_employee_self_service',
                            'Manager and Employee self-service',
                        )}
                    </li>
                </ul>
            </div>
            <div>
                <p>{t('page.setting.version', 'Version')} 1.6</p>
                <p>
                    {t(
                        'page.setting.version_description',
                        'Copyright (c) 2020 Codefactor. All rights reserved.',
                    )}
                </p>
            </div>
        </div>
    )
}

export default AboutFeatures
