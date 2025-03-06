import { Button, Input, Notification, toast } from '@/components/ui'
import { apiCreateCompany } from '@/services/CompanyService'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import useSWR from 'swr'
import { CompanyCreateResponse } from '../types'
import useCompanyList from '../hooks/useCompanyList'

type CompanyCreateData = {
    companyName: string
}

const AddCompanySection = () => {
    const [companyName, setCompanyName] = useState<string>('')
    const { mutate } = useCompanyList()

    const createCompany = async () => {
        return apiCreateCompany<CompanyCreateResponse, CompanyCreateData>({
            companyName,
        })
    }

    const { data, isLoading } = useSWR('/api/company/create', {
        revalidateOnFocus: false,
    })

    const handleSubmit = async () => {
        try {
            if (companyName === '') {
                toast.push(
                    <Notification title={'error'} type={'danger'}>
                        You have to fill company name.
                    </Notification>,
                )

                return
            }

            const newCompany = await createCompany()

            if (newCompany?.company?._id) {
                mutate()

                setCompanyName('')
            }

            console.log(newCompany)
        } catch (error) {
            console.error('Error creating company:', error)
        }
    }

    return (
        <div className="flex justify-between items-center gap-4">
            <Input
                placeholder="Company name"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <Button
                variant="solid"
                icon={<FaPlus />}
                onClick={handleSubmit}
                disabled={isLoading}
            >
                Create
            </Button>
        </div>
    )
}

export default AddCompanySection
