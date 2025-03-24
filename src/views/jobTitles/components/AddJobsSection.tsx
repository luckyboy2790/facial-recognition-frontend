import { Button, Input, Notification, Select, toast } from '@/components/ui'
import { FaPlus } from 'react-icons/fa'
import useJobTitleList from '../hooks/useJobsList'
import { useEffect, useState } from 'react'
import { apiCreateJobTitle } from '@/services/JobTitleService'
import { JobTitleCreateResponse } from '../types'
import useSWR from 'swr'
import { GetCompanyListResponse } from '@/views/companies/types'
import { apiTotalCompanies } from '@/services/CompanyService'
import { useAuth } from '@/auth'

type JobTitleCreateData = {
    departmentId: string | null
    jobTitle: string
    company: string | null
}

type OptionType = {
    label: string
    value: string
}

const AddJobTitleSection = () => {
    const { departmentList, mutateJobTitles } = useJobTitleList()
    const [department, setDepartment] = useState<string | null>(null)
    const [jobTitle, setJobTitle] = useState<string>('')
    const [company, setCompany] = useState<string | null>(null)
    const [companyNames, setCompanyNames] = useState<OptionType[]>([])

    const [optionData, setOptionData] = useState<OptionType[]>([])

    const { user } = useAuth()

    useEffect(() => {
        const fetchData = () => {
            if (user.account_type === 'Admin') {
                setOptionData(
                    departmentList
                        .filter((item) => item.company === company)
                        .map((item) => ({
                            value: item._id,
                            label: item.department_name,
                        })),
                )
            } else {
                setOptionData(
                    departmentList.map((item) => ({
                        value: item._id,
                        label: item.department_name,
                    })),
                )
            }
        }

        fetchData()
    }, [departmentList, company])

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

    const createJobTitle = async () => {
        return apiCreateJobTitle<JobTitleCreateResponse, JobTitleCreateData>({
            departmentId: department || null,
            jobTitle,
            company,
        })
    }

    const { data, isLoading } = useSWR('/api/department/create', {
        revalidateOnFocus: false,
    })

    const handleSubmit = async () => {
        try {
            if (
                department === '' ||
                jobTitle === '' ||
                ((company === null || company === '') &&
                    user.account_type === 'SuperAdmin')
            ) {
                toast.push(
                    <Notification title={'error'} type={'danger'}>
                        You have to fill all fields.
                    </Notification>,
                )

                return
            }
            const newJobTitle = await createJobTitle()

            if (newJobTitle?.job_title?._id) {
                mutateJobTitles()

                setJobTitle('')
                setDepartment(null)
                setCompany(null)
            }
        } catch (error) {
            console.error('Error creating department:', error)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <Input
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />
                {user.account_type === 'SuperAdmin' && (
                    <Select
                        placeholder="Select company"
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
                <Select
                    className="mb-4"
                    placeholder="Select Department"
                    options={optionData}
                    value={
                        optionData.find(
                            (option) => option.value === department,
                        ) || null
                    }
                    onChange={(selected) =>
                        setDepartment(selected ? selected.value : '')
                    }
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                />
            </div>
            <div className="flex justify-end">
                <Button
                    variant="solid"
                    icon={<FaPlus />}
                    onClick={handleSubmit}
                    loading={isLoading}
                >
                    Create
                </Button>
            </div>
        </>
    )
}

export default AddJobTitleSection
