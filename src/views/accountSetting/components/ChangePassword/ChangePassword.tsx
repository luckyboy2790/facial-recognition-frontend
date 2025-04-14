import { AdaptiveCard, Container, StickyFooter } from '@/components/shared'
import ChangePasswordForm from './ChangePasswordForm'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Notification, toast } from '@/components/ui'
import { FormProvider, useForm } from 'react-hook-form'
import { useToken } from '@/store/authStore'
import { useAuth } from '@/auth'
import useTranslation from '@/utils/hooks/useTranslation'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export type Password = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

const AboutContent = () => {
    const navigate = useNavigate()

    const { t } = useTranslation()

    const methods = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const { handleSubmit } = methods

    const { token } = useToken()

    const { user } = useAuth()

    const onSubmit = async (formData: Password) => {
        try {
            if (
                formData.currentPassword === '' ||
                formData.newPassword === '' ||
                formData.confirmPassword === ''
            ) {
                toast.push(
                    <Notification type="warning">
                        {t(
                            'page.account_setting.fill_all_fields_message',
                            'Fill all fields',
                        )}
                    </Notification>,
                    {
                        placement: 'top-center',
                    },
                )

                return
            }

            if (formData.newPassword !== formData.confirmPassword) {
                toast.push(
                    <Notification type="warning">
                        {t(
                            'page.account_setting.password_not_matched',
                            'Passwords are not matched',
                        )}
                    </Notification>,
                    {
                        placement: 'top-center',
                    },
                )

                return
            }

            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

            if (!passwordRegex.test(formData.newPassword)) {
                toast.push(
                    <Notification type="warning">
                        {t(
                            'page.account_setting.password_invalid',
                            'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.',
                        )}
                    </Notification>,
                    {
                        placement: 'top-center',
                    },
                )
                return
            }

            const response = await fetch(
                `${domain}/api/setting/update_password/${user._id}`,
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
                const result = await response.json()

                toast.push(
                    <Notification type="warning">
                        {result.message || 'Failed to update password'}
                    </Notification>,
                    {
                        placement: 'top-center',
                    },
                )

                return
            }

            toast.push(
                <Notification type="success">
                    {t(
                        'page.account_setting.setting_save_success',
                        'Setting Saved Successfully',
                    )}
                </Notification>,
                {
                    placement: 'top-center',
                },
            )

            methods.reset({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        } catch (error) {
            console.error('Error saving settings:', error)
            toast.push(
                <Notification type="danger">
                    An error occurred. Please try again later.
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <AdaptiveCard>
                        <div className="flex flex-col gap-10">
                            <ChangePasswordForm />
                        </div>
                    </AdaptiveCard>
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
                                    {t('page.back', 'Back')}
                                </Button>

                                <Button variant="solid" type="submit">
                                    {t('page.save', 'Save')}
                                </Button>
                            </div>
                        </Container>
                    </StickyFooter>
                </Form>
            </FormProvider>
        </div>
    )
}

export default AboutContent
