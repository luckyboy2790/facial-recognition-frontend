import { useState } from 'react'
import { Button, Input, Notification, Select, toast } from '@/components/ui'
import { FaPlus } from 'react-icons/fa'
import { LeaveGroupCreateResponse } from '../types'
import useSWR from 'swr'
import useLeaveTypeList from '../hooks/useLeaveGroupsList'
import { apiCreateLeaveGroup } from '@/services/leaveGroupService'

type LeaveGroupCreateData = {
    leaveGroupName: string
    description: string
    leavePrivilege: string[]
    groupStatus: string
}

const AddLeaveTypeSection = () => {
    const [groupStatus, setGroupStatus] = useState<string>('')
    const [leaveGroupName, setLeaveGroupName] = useState('')
    const [description, setDescription] = useState('')
    const [leaveTypes, setLeaveTypes] = useState<string[]>([])
    const { mutateLeaveGroup, leaveTypesList } = useLeaveTypeList()

    const leaveGroupOptions = leaveTypesList.map((item) => ({
        value: item._id,
        label: item.leave_name,
    }))

    const statusOption = [
        {
            label: 'Active',
            value: 'Active',
        },
        {
            label: 'Disabled',
            value: 'Disabled',
        },
    ]

    const createLeaveType = async () => {
        return apiCreateLeaveGroup<
            LeaveGroupCreateResponse,
            LeaveGroupCreateData
        >({
            leaveGroupName,
            description,
            leavePrivilege: leaveTypes,
            groupStatus,
        })
    }

    const { data, isLoading } = useSWR('/api/company/create', {
        revalidateOnFocus: false,
    })

    const handleSubmit = async () => {
        try {
            if (
                leaveGroupName === '' ||
                description === '' ||
                leaveTypes.length <= 0 ||
                groupStatus === ''
            ) {
                toast.push(
                    <Notification title={'error'} type={'danger'}>
                        You have to fill company name.
                    </Notification>,
                )

                return
            }

            const newLeaveType = await createLeaveType()

            if (newLeaveType?.leave_group?._id) {
                mutateLeaveGroup()

                setLeaveGroupName('')
                setDescription('')
                setLeaveTypes([])
                setGroupStatus('')
            }

            console.log(newLeaveType)
        } catch (error) {
            console.error('Error creating company:', error)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <Input
                    placeholder="Leave Group Name"
                    value={leaveGroupName}
                    onChange={(e) => setLeaveGroupName(e.target.value)}
                />

                <Input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex flex-col gap-0.5">
                    <Select
                        isMulti
                        size="md"
                        className="mb-4"
                        placeholder="Select Leave Privileges"
                        options={leaveGroupOptions}
                        value={leaveGroupOptions.filter((option) =>
                            leaveTypes.includes(option.value),
                        )}
                        onChange={(selected) =>
                            setLeaveTypes(
                                selected.map((option) => option.value),
                            )
                        }
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                    />

                    <Select
                        size="md"
                        className="mb-4"
                        placeholder="Select Status"
                        options={statusOption}
                        value={
                            statusOption.find(
                                (option) => option.value === groupStatus,
                            ) || null
                        }
                        onChange={(selected) =>
                            setGroupStatus(selected ? selected.value : '')
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
            </div>
        </>
    )
}

export default AddLeaveTypeSection
