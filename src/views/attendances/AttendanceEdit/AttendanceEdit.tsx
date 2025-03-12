import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import AttendanceForm from '../AttendanceForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import type { Attendance } from '../AttendanceList/types'
import {
    apiAttendanceDetail,
    apiDeleteAttendances,
} from '@/services/AttendanceService'
import { AttendanceFormSchema } from '../AttendanceForm/types'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

type AttendanceDetailResponse = {
    message: string
    attendance: Attendance
}

type AttendanceData = {
    attendanceIds: string[]
}

const AttendanceEdit = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        [`/api/attendances${id}`, { id: id as string }],
        ([_, params]) =>
            apiAttendanceDetail<AttendanceDetailResponse, { id: string }>(
                params,
            ),
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

    const handleFormSubmit = async (values: AttendanceFormSchema) => {
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

        const response = await fetch(
            `${domain}/api/attendance/update_attendance/${id}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            },
        )

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

        window.location.href = '/attendance'
    }

    const getDefaultValues = () => {
        console.log(data)

        if (data) {
            const { employee, date, time_in, time_out, reason } =
                data.attendance

            console.log({
                employee,
                date,
                time_in: convertToUTCFormat(time_in || ''),
                time_out: convertToUTCFormat(time_out || ''),
            })

            return {
                employee,
                date,
                time_in: convertToUTCFormat(time_in || ''),
                time_out: convertToUTCFormat(time_out || ''),
                reason: reason,
            }
        }

        return {}
    }

    const handleConfirmDelete = async () => {
        setDeleteConfirmationOpen(true)

        const attendanceIds: string[] = [id!]

        await apiDeleteAttendances<string[], AttendanceData>({
            attendanceIds,
        })

        toast.push(
            <Notification type="success">Schedule deleted!</Notification>,
            { placement: 'top-center' },
        )

        await sleep(1000)

        window.location.href = '/attendance'
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
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280} />
                    <h3 className="mt-8">No user found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <AttendanceForm
                        defaultValues={
                            getDefaultValues() as AttendanceFormSchema
                        }
                        newAttendance={false}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
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
                    </AttendanceForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remove attendances"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want to remove this attendance?
                            This action can&apos;t be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default AttendanceEdit
