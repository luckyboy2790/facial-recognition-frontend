import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import CustomerForm from '../EmployeeForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import type { CustomerFormSchema } from '../EmployeeForm'

const EmployeeCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: CustomerFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)

        try {
            let imageUrl = values.img

            if (values.img && values.img.startsWith('blob:')) {
                const formData = new FormData()
                const response = await fetch(values.img)
                const blob = await response.blob()
                formData.append('image', blob, 'profile.jpg')

                const uploadResponse = await fetch(
                    'http://localhost:5000/api/upload-image',
                    {
                        method: 'POST',
                        body: formData,
                    },
                )
                const uploadResult = await uploadResponse.json()

                if (!uploadResult.success) {
                    console.error(
                        '❌ Failed to upload image:',
                        uploadResult.message,
                    )
                    setIsSubmiting(false)
                    return
                }

                imageUrl = uploadResult.imageUrl
            }

            const payload = {
                ...values,
                img: imageUrl,
                faceDescriptor: values.faceDescriptor,
            }

            console.log(payload)

            const response = await fetch(
                'http://localhost:5000/api/employee/create_employee',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                },
            )

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to create employee')
            }

            toast.push(
                <Notification type="success">
                    Employee created successfully!
                </Notification>,
                { placement: 'top-center' },
            )
            navigate('/employees')
        } catch (error: any) {
            console.error('❌ Error submitting form:', error)
        }

        setIsSubmiting(false)
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Customer discardd!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/employees')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <CustomerForm
                newCustomer
                defaultValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    gender: '',
                    img: '',
                    phoneNumber: '',
                    dialCode: '',
                    address: '',
                    civilStatus: '',
                    height: '',
                    weight: '',
                    age: '',
                    birthday: '',
                    nationalId: '',
                    placeOfBirth: '',
                    company: '',
                    department: '',
                    jobTitle: '',
                    pin: '',
                    companyEmail: '',
                    leaveGroup: '',
                    employmentType: '',
                    employmentStatus: '',
                    officialStartDate: '',
                    dateRegularized: '',
                    faceDescriptor: [],
                }}
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </CustomerForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default EmployeeCreate
