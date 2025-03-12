import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { apiGetCustomer } from '@/services/employeeService'
import CustomerForm from '../EmployeeForm'
import sleep from '@/utils/sleep'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import type { CustomerFormSchema } from '../EmployeeForm'
import type { Employee } from '../EmployeeList/types'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

type ProfileSectionProps = {
    data: Employee
}

const CustomerEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { data, isLoading } = useSWR(
        [`/api/customers/${id}`, { id: id as string }],
        ([_, params]) =>
            apiGetCustomer<ProfileSectionProps, { id: string }>(params),
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
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
                    `${domain}/api/upload-image`,
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
                _id: id,
            }

            console.log(payload)

            const response = await fetch(
                `${domain}/api/employee/update_employee`,
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
            window.location.href = '/employees'
        } catch (error: any) {
            console.error('❌ Error submitting form:', error)
        }

        setIsSubmiting(false)
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

    const mapEmployeeToCustomerForm = (
        employee: Employee,
    ): CustomerFormSchema => {
        return {
            firstName: employee.first_name,
            lastName: employee.last_name,
            email: employee.email,
            dialCode: employee.dial_code,
            phoneNumber: employee.phone_number,
            address: employee.address,
            gender: employee.gender,
            civilStatus: employee.civil_status,
            height: employee.height,
            weight: employee.weight,
            age: employee.age,
            birthday: employee.birthday,
            nationalId: employee.national_id,
            placeOfBirth: employee.place_of_birth,
            img: employee.img,
            company: employee.company_id,
            department: employee.department_id,
            jobTitle: String(employee.job_title_id),
            pin: employee.pin,
            companyEmail: employee.company_email,
            leaveGroup: employee.leave_group_id,
            employmentType: employee.employee_type,
            employmentStatus: employee.employee_status,
            officialStartDate: employee.official_start_date,
            dateRegularized: employee.date_regularized,
            faceDescriptor: Array.isArray(employee.face_info?.descriptors[0])
                ? employee.face_info?.descriptors[0].map(String)
                : [],
        }
    }

    const defaultFormValues: CustomerFormSchema =
        data && data.data
            ? mapEmployeeToCustomerForm(data.data)
            : {
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
                        defaultValues={defaultFormValues}
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
