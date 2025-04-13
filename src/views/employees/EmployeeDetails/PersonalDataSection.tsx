import useTranslation from '@/utils/hooks/useTranslation'
import { Employee } from '../EmployeeList/types'

type ProfileSectionProps = {
    data: Employee
}

const PersonalDataSection = ({ data }: ProfileSectionProps) => {
    const { t } = useTranslation()

    return (
        <>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.civil_status', 'Civil Status')}
                </p>
                <p className="mt-8 w-3/5">{data.civil_status}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">{t('page.employee.age', 'Age')}</p>
                <p className="mt-8 w-3/5">{data.age}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.height', 'Height')}
                </p>
                <p className="mt-8 w-3/5">{data.height}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.weight', 'Weight')}
                </p>
                <p className="mt-8 w-3/5">{data.weight}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.gender', 'Gender')}
                </p>
                <p className="mt-8 w-3/5">{data.gender}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.place_of_birthday', 'Place of Birth')}
                </p>
                <p className="mt-8 w-3/5">{data.place_of_birth}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.address', 'Address')}
                </p>
                <p className="mt-8 w-3/5">{data.address}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">
                    {t('page.employee.national_id', 'National ID')}
                </p>
                <p className="mt-8 w-3/5">{data.national_id}</p>
            </div>
        </>
    )
}

export default PersonalDataSection
