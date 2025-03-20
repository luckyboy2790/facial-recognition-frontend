import { useState } from 'react'
import { Button, Input, Notification, toast } from '@/components/ui'
import { FaPlus } from 'react-icons/fa'
import Radio from '@/components/ui/Radio'
import { LeaveTypeCreateResponse } from '../types'
import { apiCreateLeaveType } from '@/services/leaveTypeService'
import useSWR from 'swr'
import useLeaveTypeList from '../hooks/useLeaveTypesList'

type LeaveTypeCreateData = {
    leaveName: string
    credits: string
    percalendar: string
}

const AddLeaveTypeSection = () => {
    const [termValue, setTermValue] = useState('Monthly')
    const [leaveName, setLeaveName] = useState('')
    const [credits, setCredits] = useState('')
    const { mutate } = useLeaveTypeList()

    const onChange = (val: string) => {
        setTermValue(val)
    }

    const createLeaveType = async () => {
        return apiCreateLeaveType<LeaveTypeCreateResponse, LeaveTypeCreateData>(
            {
                leaveName,
                credits,
                percalendar: termValue,
            },
        )
    }

    const { data, isLoading } = useSWR('/api/company/create', {
        revalidateOnFocus: false,
    })

    const handleSubmit = async () => {
        try {
            if (leaveName === '') {
                toast.push(
                    <Notification title={'error'} type={'danger'}>
                        You have to fill company name.
                    </Notification>,
                )

                return
            }

            const numericCredits = Number(credits)
            if (
                isNaN(numericCredits) ||
                numericCredits < 0 ||
                numericCredits > 365
            ) {
                toast.push(
                    <Notification title={'error'} type={'danger'}>
                        Credits must be a number between 0 and 365.
                    </Notification>,
                )
                return
            }

            const newLeaveType = await createLeaveType()

            if (newLeaveType?.company?._id) {
                mutate()

                setLeaveName('')
                setCredits('')
                setTermValue('Monthly')
            }

            console.log(newLeaveType)
        } catch (error) {
            console.error('Error creating company:', error)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4 mb-5">
                <Input
                    placeholder='Leave Name (e.g. "Vacation Leave, Sick Leave")'
                    value={leaveName}
                    onChange={(e) => setLeaveName(e.target.value)}
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

export default AddLeaveTypeSection
