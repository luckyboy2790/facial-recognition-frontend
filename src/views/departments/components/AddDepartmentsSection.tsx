import { useEffect, useState } from 'react'
import {
    Alert,
    Button,
    Input,
    Notification,
    Select,
    toast,
} from '@/components/ui'
import { FaPlus } from 'react-icons/fa'
import { apiCreateDepartment } from '@/services/DepartmentService'
import useSWR from 'swr'
import { DepartmentCreateResponse } from '../types'
import useDepartmentList from '../hooks/useDepartmentsList'
import { apiTotalCompanies } from '@/services/CompanyService'
import { GetCompanyListResponse } from '@/views/companies/types'
import { useAuth } from '@/auth'

type DepartmentCreateData = {
    departmentName: string
    company: string | null
}

type OptionType = {
    label: string
    value: string
}

const AddDepartmentSection = () => {
    const [departmentName, setDepartmentName] = useState<string>('')
    const [company, setCompany] = useState<string | null>(null)
    const [companyNames, setCompanyNames] = useState<OptionType[]>([])

    const { mutate } = useDepartmentList()

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

    const createDepartment = async () => {
        return apiCreateDepartment<
            DepartmentCreateResponse,
            DepartmentCreateData
        >({
            departmentName,
            company,
        })
    }

    const { data, isLoading } = useSWR('/api/department/create', {
        revalidateOnFocus: false,
    })

    const { user } = useAuth()

    const handleSubmit = async () => {
        try {
            if (
                departmentName === '' ||
                ((company === null || company === '') &&
                    user.account_type === 'SuperAdmin')
            ) {
                toast.push(
                    <Notification title={'error'} type={'danger'}>
                        You have to fill department name.
                    </Notification>,
                )

                return
            }
            const newDepartment = await createDepartment()

            if (newDepartment?.department?._id) {
                mutate()

                setDepartmentName('')

                setCompany(null)
            }

            console.log(newDepartment)
        } catch (error) {
            console.error('Error creating department:', error)
        }
    }

    return (
        <>
            <div className="flex flex-col justify-between items-center gap-4">
                <Input
                    placeholder="Department Name"
                    required
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
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
                <div className="flex justify-end items-center w-full">
                    <Button
                        variant="solid"
                        icon={<FaPlus />}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </>
    )
}

export default AddDepartmentSection
