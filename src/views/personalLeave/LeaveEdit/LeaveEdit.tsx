import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import LeaveForm from '../LeaveForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import type { Leave } from '../LeaveList/types'
import { apiLeaveDetail, apiDeleteLeaves } from '@/services/LeaveService'
import { LeaveFormSchema } from '../LeaveForm/types'
import { useToken } from '@/store/authStore'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

type LeaveDetailResponse = {
    message: string
    leave: Leave
}

type LeaveData = {
    leaveIds: string[]
}

const LeaveEdit = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        [`/api/leaves${id}`, { id: id as string }],
        ([_, params]) =>
            apiLeaveDetail<LeaveDetailResponse, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const convertToUTCFormat = (input: string): string => {
        if (!input) return ''

        const date = new Date(input)

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format')
        }

        return date.toISOString().split('T')[1]
    }

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { token } = useToken()

    const handleFormSubmit = async (values: LeaveFormSchema) => {
        console.log('Submitted values', values)

        if (values.reason === '') {
            toast.push(
                <Notification type="warning">Please write reason</Notification>,
                {
                    placement: 'top-center',
                },
            )

            return
        }

        setIsSubmiting(true)

        const response = await fetch(`${domain}/api/leave/update_leave/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(values),
        })

        const data = await response.json()

        const toastStatus = response.ok ? 'success' : 'warning'

        setIsSubmiting(false)

        toast.push(
            <Notification type={toastStatus}>{data.message}</Notification>,
            {
                placement: 'top-center',
            },
        )

        await sleep(1500)

        window.location.href = '/leave'
    }

    const getDefaultValues = () => {
        console.log(data)

        if (data) {
            const { leaveType, leaveFrom, leaveTo, leaveReturn, reason } =
                data.leave

            return {
                leaveType,
                leaveFrom,
                leaveTo,
                leaveReturn,
                reason,
            }
        }

        return {}
    }

    const handleConfirmDelete = async () => {
        setDeleteConfirmationOpen(true)

        const leaveIds: string[] = [id!]

        await apiDeleteLeaves<string[], LeaveData>({
            leaveIds,
        })

        toast.push(
            <Notification type="success">Schedule deleted!</Notification>,
            { placement: 'top-center' },
        )

        await sleep(1000)

        window.location.href = '/leave'
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="flex flex-col h-full justify-center items-center">
                    <NoUserFound height={280} width={280} />
                    <h3 className="mt-8">No user found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <LeaveForm
                        defaultValues={getDefaultValues() as LeaveFormSchema}
                        newLeave={false}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex justify-between items-center px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft />}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash />}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmiting}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </LeaveForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remove leaves"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want to remove this leave? This
                            action can&apos;t be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default LeaveEdit
