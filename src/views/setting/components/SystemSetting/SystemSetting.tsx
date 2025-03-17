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
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

const SystemSetting = () => {
    const navigate = useNavigate()

    const methods = useForm({
        defaultValues: {
            country: '',
            timezone: '',
            timeFormat: '',
            rfidClock: false,
            timeInComments: false,
            ipRestriction: '',
        },
    })

    const { handleSubmit, setValue } = methods

    const [settingId, setSettingId] = useState<string>('')

    useEffect(() => {
        const fetchSettings = async () => {
            const response = await fetch(`${domain}/api/setting/get_setting`)
            const data = await response.json()

            setValue('country', data.settingData.country || '')
            setValue('timezone', data.settingData.timezone || '')
            setValue('timeFormat', data.settingData.timeFormat || '')
            setValue('rfidClock', data.settingData.rfidClock || false)
            setValue('timeInComments', data.settingData.timeInComments || false)
            setValue('ipRestriction', data.settingData.ipRestriction || '')
            setSettingId(data.settingData._id)
        }

        fetchSettings()
    }, [setValue])

    const onSubmit = async (formData: System) => {
        try {
            console.log(JSON.stringify(formData))

            const response = await fetch(
                `${domain}/api/setting/set_setting/${settingId}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
