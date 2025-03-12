import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar/Avatar'
import Notification from '@/components/ui/Notification'
import Tooltip from '@/components/ui/Tooltip'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { HiPencil, HiOutlineTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { Employee } from '../EmployeeList/types'
import { apiDeleteEmployees } from '@/services/employeeService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

type CustomerInfoFieldProps = {
    title?: string
    value?: string
}

type ProfileSectionProps = {
    data: Employee
}

type LeaveTypeData = {
    employeeIds: string[]
}

function formatDate(dateString: string) {
    const date = new Date(dateString)

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
    return (
        <div>
            <span className="font-semibold">{title}</span>
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
    console.log(data)

    const navigate = useNavigate()

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleDelete = async () => {
        setDialogOpen(false)

        const employeeIds: string[] = [data._id]

        await apiDeleteEmployees<string[], LeaveTypeData>({
            employeeIds,
        })

        navigate('/employees')
        toast.push(
            <Notification title={'Successfully Deleted'} type="success">
                Customer successfuly deleted
            </Notification>,
        )
    }

    const handleEdit = () => {
        navigate(`/employee-edit/${data._id}`)
    }

    return (
        <Card className="w-full">
            <div className="flex justify-end">
                <Tooltip title="Edit customer">
                    <button
                        className="close-button button-press-feedback"
                        type="button"
                        onClick={handleEdit}
                    >
                        <HiPencil />
                    </button>
                </Tooltip>
            </div>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4 mt-6">
                    <Avatar
                        size={90}
                        shape="circle"
                        src={`${domain}${data.img}`}
                    />
                    <h4 className="font-bold">{data.full_name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-10">
                    <CustomerInfoField title="Email" value={data.email} />
                    <CustomerInfoField
                        title="Phone"
                        value={data?.phone_number}
                    />
                    <CustomerInfoField
                        title="Date of birth"
                        value={formatDate(data?.birthday)}
                    />
                </div>
                <div className="flex flex-col gap-4 pt-7">
                    <Button
                        block
                        customColorClass={() =>
                            'text-error hover:border-error hover:ring-1 ring-error hover:text-error'
                        }
                        icon={<HiOutlineTrash />}
                        onClick={handleDialogOpen}
                    >
                        Delete
                    </Button>
                </div>
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title="Delete customer"
                    onClose={handleDialogClose}
                    onRequestClose={handleDialogClose}
                    onCancel={handleDialogClose}
                    onConfirm={handleDelete}
                >
                    <p>
                        Are you sure you want to delete this customer? All
                        record related to this customer will be deleted as well.
                        This action cannot be undone.
                    </p>
                </ConfirmDialog>
            </div>
        </Card>
    )
}

export default ProfileSection
