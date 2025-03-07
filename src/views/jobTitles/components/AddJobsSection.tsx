import { Button, Input, Notification, Select, toast } from '@/components/ui'
import { FaPlus } from 'react-icons/fa'
import useJobTitleList from '../hooks/useJobsList'
import { useState } from 'react'
import { apiCreateJobTitle } from '@/services/JobTitleService'
import { JobTitleCreateResponse } from '../types'
import useSWR from 'swr'

type JobTitleCreateData = {
    departmentId: string
    jobTitle: string
}

const AddJobTitleSection = () => {
    const { departmentList, mutateJobTitles } = useJobTitleList()
    const [department, setDepartment] = useState<string>('')
    const [jobTitle, setJobTitle] = useState<string>('')

    const optionData = [
        { value: '', label: 'Select Department' },
        ...departmentList.map((item) => ({
            value: item._id,
            label: item.department_name,
        })),
    ]

    const createJobTitle = async () => {
        return apiCreateJobTitle<JobTitleCreateResponse, JobTitleCreateData>({
            departmentId: department,
            jobTitle,
        })
    }

    const { data, isLoading } = useSWR('/api/department/create', {
        revalidateOnFocus: false,
    })

    const handleSubmit = async () => {
        try {
            if (department === '' || jobTitle === '') {
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
                setDepartment('')
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
                <Select
                    size="lg"
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
                >
                    Create
                </Button>
            </div>
        </>
    )
}

export default AddJobTitleSection
