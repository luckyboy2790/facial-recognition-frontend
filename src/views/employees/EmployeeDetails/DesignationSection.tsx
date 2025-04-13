import useTranslation from '@/utils/hooks/useTranslation'
import { Employee } from '../EmployeeList/types'

type ProfileSectionProps = {
    data: Employee
}

function formatDate(dateString: string) {
    if (!dateString) return '-'

    const date = new Date(dateString)

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const DesignationSection = ({ data }: ProfileSectionProps) => {
    const { t } = useTranslation()

    return (
        <>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.company', 'Company')}
                </p>
                <p className="mt-8 w-3/5">{data.company.company_name}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.department', 'Department')}
                </p>
                <p className="mt-8 w-3/5">{data.department.department_name}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.position', 'Position')}
                </p>
                <p className="mt-8 w-3/5">{data.job_title.job_title}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.leave_privilege', 'Leave Privilege')}
                </p>
                <p className="mt-8 w-3/5">{data.leave_group.group_name}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.employment_type', 'Employment Type')}
                </p>
                <p className="mt-8 w-3/5">{data.employee_type}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.employment_status', 'Employment Status')}
                </p>
                <p className="mt-8 w-3/5">{data.employee_status}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    label=
                    {t(
                        'page.employee.official_start_date',
                        'Official Start Date',
                    )}
                </p>
                <p className="mt-8 w-3/5">
                    {formatDate(data.official_start_date)}
                </p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.date_regularized', 'Date Regularized')}
                </p>
                <p className="mt-8 w-3/5">
                    {formatDate(data.date_regularized)}
                </p>
            </div>
        </>
    )
}

export default DesignationSection
