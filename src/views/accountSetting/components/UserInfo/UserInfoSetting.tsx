import { Container, StickyFooter } from '@/components/shared'
import LocalizationSetting from './UserInfoSettingForm'
import { Button, Form, Notification, toast } from '@/components/ui'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { UserInfo } from '../../type'
import { useNavigate } from 'react-router-dom'
import { useSessionUser, useToken } from '@/store/authStore'
import { useAuth } from '@/auth'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

const SystemSetting = () => {
    const navigate = useNavigate()

    const methods = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            role: '',
            status: '',
        },
    })

    const { handleSubmit, setValue } = methods

    const { token } = useToken()

    const { user } = useAuth()

    const setUser = useSessionUser((state) => state.setUser)

    useEffect(() => {
        const fetchSettings = async () => {
            const response = await fetch(
                `${domain}/api/user/get_user/${user._id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                },
            )

            const data = await response.json()

            setValue(
                'first_name',
                data.userDetail?.employeeData?.first_name || '',
            )
            setValue(
                'last_name',
                data.userDetail?.employeeData?.last_name || '',
            )
            setValue('email', data.userDetail?.email || '')
            setValue('role', data.userDetail?.roleData?.name || '')
            setValue('status', data.userDetail?.status || '')

            console.log(data)

            const userData = {
                _id: data.userDetail._id,
                email: data.userDetail.email,
                full_name: data.userDetail.employeeData.full_name,
                account_type: data.userDetail.account_type,
                img: data.userDetail.employeeData?.img || null,
            }

            setUser(userData)
        }

        fetchSettings()
    }, [setValue])

    const onSubmit = async (formData: UserInfo) => {
        try {
            console.log(JSON.stringify(formData))

            const response = await fetch(
                `${domain}/api/setting/account_setting/${user._id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify(formData),
                },
            )

            if (!response.ok) {
                throw new Error('Failed to save settings')
            }

            toast.push(
                <Notification type="success">
                    Setting Saved Successfully
                </Notification>,
                {
                    placement: 'top-center',
                },
            )

            const data = await response.json()

            setUser(data.user)

            console.log(data.user)
        } catch (error) {
            console.error('Error saving settings:', error)
            alert('Failed to save settings. Try again!')
        }
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-8">
                    <LocalizationSetting />
                </div>
                <StickyFooter
                    className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                    stickyClass="px-6 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                    defaultClass="px-6 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                >
                    <Container>
                        <div className="flex items-center justify-between">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                variant="plain"
                                icon={<TbArrowNarrowLeft />}
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </Button>

                            <Button variant="solid" type="submit">
                                Save
                            </Button>
                        </div>
                    </Container>
                </StickyFooter>
            </Form>
        </FormProvider>
    )
}

export default SystemSetting
