import { useEffect, useState } from 'react'
import { Button, Input, Notification, Select, toast } from '@/components/ui'
import { FaPlus } from 'react-icons/fa'
import Radio from '@/components/ui/Radio'
import { LeaveTypeCreateResponse } from '../types'
import { apiCreateLeaveType } from '@/services/leaveTypeService'
import useSWR from 'swr'
import useLeaveTypeList from '../hooks/useLeaveTypesList'
import { apiTotalCompanies } from '@/services/CompanyService'
import { GetCompanyListResponse } from '@/views/companies/types'
import { useAuth } from '@/auth'
import useTranslation from '@/utils/hooks/useTranslation'

type LeaveTypeCreateData = {
    leaveName: string
    company: string | null
}

type OptionType = {
    label: string
    value: string
}

const AddLeaveTypeSection = () => {
    const [leaveName, setLeaveName] = useState('')
    const [company, setCompany] = useState<string | null>(null)
    const [companyNames, setCompanyNames] = useState<OptionType[]>([])
    const { mutate } = useLeaveTypeList()

    const { t } = useTranslation()

    const { user } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            const response: GetCompanyListResponse = await apiTotalCompanies()

            setCompanyNames(
                response.list.map((item) => ({
                    label: item.company_name,
                    value: item._id,
                })),
            )
        }

        fetchData()
    }, [])

    const createLeaveType = async () => {
        return apiCreateLeaveType<LeaveTypeCreateResponse, LeaveTypeCreateData>(
            {
                leaveName,
                company,
            },
        )
    }

    const { data, isLoading } = useSWR('/api/company/create', {
        revalidateOnFocus: false,
    })

    const handleSubmit = async () => {
        try {
            if (
                leaveName === '' ||
                ((company === null || company === '') &&
                    user.account_type === 'SuperAdmin')
            ) {
                toast.push(
                    <Notification title={'error'} type={'danger'}>
                        {'You have to fill company name.'}
                    </Notification>,
                )

                return
            }

            const newLeaveType = await createLeaveType()

            if (newLeaveType?.company?._id) {
                mutate()

                setLeaveName('')

                setCompany(null)
            }
        } catch (error) {
            console.error('Error creating company:', error)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4 mb-5">
                <Input
                    placeholder={t(
                        'page.leave_type.leave_type_name_placeholder',
                        'Leave Name (e.g. "Vacation Leave, Sick Leave")',
                    )}
                    value={leaveName}
                    onChange={(e) => setLeaveName(e.target.value)}
                />
                {user.account_type === 'SuperAdmin' && (
                    <Select
                        placeholder={t(
                            'page.leave_type.select_company_placeholder',
                            'Select company',
                        )}
                        className="w-full"
                        options={companyNames}
                        value={
                            companyNames.find(
                                (option) => option.value === company,
                            ) || null
                        }
                        onChange={(selectedOption) =>
                            setCompany(selectedOption?.value || null)
                        }
                    />
                )}
            </div>
            <div className="flex justify-end">
                <Button
                    variant="solid"
                    icon={<FaPlus />}
                    onClick={handleSubmit}
                    loading={isLoading}
                >
                    {t('page.create', 'Create')}
                </Button>
            </div>
        </>
    )
}

export default AddLeaveTypeSection
