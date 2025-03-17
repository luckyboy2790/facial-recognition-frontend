import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import CustomerForm from '../UserForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import type { CustomerFormSchema } from '../UserForm'
import type { User } from '../UserList/types'
import { apiGetUserDetail } from '@/services/UserService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

type UserDetailType = {
    userDetail: User
}

const CustomerEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { data, isLoading } = useSWR(
        [`/api/user/${id}`, { id: id as string }],
        ([_, params]) =>
            apiGetUserDetail<UserDetailType, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: CustomerFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)

        const response = await fetch(`${domain}/api/user/update_user/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })

        if (!response.ok) {
            toast.push(
                <Notification type="warning">
                    Something went wrong!
                </Notification>,
                {
                    placement: 'top-center',
                },
            )

            return
        }

        setIsSubmiting(false)
        toast.push(<Notification type="success">Changes Saved!</Notification>, {
            placement: 'top-center',
        })
        await sleep(800)
        window.location.href = '/users'
    }

    const getDefaultValues = () => {
        console.log(data)

        if (data) {
            const { employee, email, account_type, status, role } =
                data.userDetail

            return {
                employee,
                email,
                account_type,
                status,
                role,
            }
        }

        return {}
    }

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">Customer deleted!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/customers/customer-list')
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
                    <CustomerForm
                        defaultValues={getDefaultValues() as CustomerFormSchema}
                        newCustomer={false}
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
                    </CustomerForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remove customers"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want to remove this customer? This
                            action can&apos;t be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default CustomerEdit
