import { useState } from 'react'
import { Alert, Button, Input, Notification, toast } from '@/components/ui'
import { FaPlus } from 'react-icons/fa'
import { apiCreateDepartment } from '@/services/DepartmentService'
import useSWR from 'swr'
import { DepartmentCreateResponse } from '../types'
import useDepartmentList from '../hooks/useDepartmentsList'

type DepartmentCreateData = {
    departmentName: string
}

const AddDepartmentSection = () => {
    const [departmentName, setDepartmentName] = useState<string>('')
    const { mutate } = useDepartmentList()

    const createDepartment = async () => {
        return apiCreateDepartment<
            DepartmentCreateResponse,
            DepartmentCreateData
        >({
            departmentName,
        })
    }

    const { data, isLoading } = useSWR('/api/department/create', {
        revalidateOnFocus: false,
    })

    const handleSubmit = async () => {
        try {
            if (departmentName === '') {
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
            }

            console.log(newDepartment)
        } catch (error) {
            console.error('Error creating department:', error)
        }
    }

    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <Input
                    placeholder="Department Name"
                    required
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
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
        </>
    )
}

export default AddDepartmentSection
