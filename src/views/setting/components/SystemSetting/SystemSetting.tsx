import { Container, StickyFooter } from '@/components/shared'
import LocalizationSetting from './LocalizationSetting'
import OptionalFeatures from './OptionalFeatures'
import SafeguardingSetting from './SafeguardingSetting'
import { Button, Form, Notification, toast } from '@/components/ui'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { System } from '../../type'
import { useNavigate } from 'react-router-dom'
import { useSessionUser, useToken } from '@/store/authStore'
import { permissionChecker } from '@/services/PermissionChecker'
import { useAuth } from '@/auth'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

const SystemSetting = () => {
    const navigate = useNavigate()

    const setSetting = useSessionUser((state) => state.setSetting)

    const methods = useForm({
        defaultValues: {
            country: '',
            timezone: '',
            timeFormat: '',
            rfidClock: false,
            ipRestriction: '',
        },
    })

    const { user } = useAuth()

    const { handleSubmit, setValue } = methods

    const [settingId, setSettingId] = useState<string>('')

    const { token } = useToken()

    useEffect(() => {
        const fetchSettings = async () => {
            const response = await fetch(`${domain}/api/setting/get_setting`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            })
            const data = await response.json()

            setSetting(data.settingData)

            setValue('country', data.settingData?.country || '')
            setValue('timezone', data.settingData?.timezone || '')
            setValue('timeFormat', data.settingData?.timeFormat || '')
            setValue('rfidClock', data.settingData?.rfidClock || false)
            setValue('ipRestriction', data.settingData?.ipRestriction || '')
            setSettingId(data.settingData?._id)
        }

        fetchSettings()
    }, [setValue])

    const onSubmit = async (formData: System) => {
        if (
            permissionChecker(user, 'setting', 'update') === false &&
            user.account_type === 'Admin'
        ) {
            navigate('/access-denied')

            return
        } else {
            try {
                if (!formData.timeFormat || formData.timeFormat === '') {
                    toast.push(
                        <Notification type="warning">
                            You have to select time format.
                        </Notification>,
                        {
                            placement: 'top-center',
                        },
                    )

                    return
                }

                const response = await fetch(
                    `${domain}/api/setting/set_setting/${settingId ? settingId : undefined}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(token
                                ? { Authorization: `Bearer ${token}` }
                                : {}),
                        },
                        body: JSON.stringify(formData),
                    },
                )

                if (!response.ok) {
                    throw new Error('Failed to save settings')
                }

                setSetting(formData)

                toast.push(
                    <Notification type="success">
                        Setting Saved Successfully
                    </Notification>,
                    {
                        placement: 'top-center',
                    },
                )
            } catch (error) {
                console.error('Error saving settings:', error)
                alert('Failed to save settings. Try again!')
            }
        }
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-8">
                    <LocalizationSetting />
                    <OptionalFeatures />
                    <SafeguardingSetting />
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
