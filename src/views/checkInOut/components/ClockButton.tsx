import Card from '@/components/ui/Card'
import { ReactElement, useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import VideoInputWithRouter from './VideoInput'
import { useNavigate } from 'react-router-dom'
import { Notification, toast } from '@/components/ui'
import { NumericInput, PasswordInput } from '@/components/shared'
import PinInput from './PinInput'

interface BoardCardProps {
    title: String
    description: String
    icon: ReactElement
    timezone: string
}

const ClockButton = (props: BoardCardProps) => {
    const { title, description, icon, timezone } = props
    const navigate = useNavigate()

    const [dialogIsOpen, setIsOpen] = useState(false)

    const [pinDialogIsOpen, setPinDialogIsOpen] = useState(false)

    const [recoStatus, setRecoStatus] = useState<boolean>(true)

    const openPinDialog = () => {
        setPinDialogIsOpen(true)
    }

    const onPinDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setPinDialogIsOpen(false)
    }

    const onPinDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setPinDialogIsOpen(false)
    }

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }

    useEffect(() => {
        if (recoStatus === false) {
            toast.push(
                <Notification type="warning">
                    Your face is not recognized, you have to input PIN.
                </Notification>,
                {
                    placement: 'top-center',
                },
            )

            openPinDialog()
        }
    }, [recoStatus])

    return (
        <>
            <Card
                clickable
                className="w-full flex gap-4 justify-between rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-5 min-h-20 2xl:min-h-20 cursor-pointer"
                bodyClass="p-4 w-full flex gap-8 justify-between"
                onClick={() => openDialog()}
            >
                <div className="text-6xl">{icon}</div>
                <div className="grow flex flex-col justify-evenly">
                    <h3>{title}</h3>
                    <p className="text-md">{description}</p>
                </div>
            </Card>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={(e: any) => onDialogClose(e)}
                onRequestClose={(e: any) => onDialogClose(e)}
            >
                <h5 className="mb-4">{title}</h5>
                <VideoInputWithRouter
                    onCloseDialog={() => setIsOpen(false)}
                    type={`${
                        title === 'Check In'
                            ? 'time_in'
                            : title === 'Break In'
                              ? 'break_in'
                              : title === 'Break Out'
                                ? 'break_out'
                                : 'time_out'
                    }`}
                    timezone={timezone}
                    navigate={navigate}
                    setRecoStatus={setRecoStatus}
                />
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={(e: any) => onDialogClose(e)}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={(e: any) => onDialogOk(e)}>
                        Okay
                    </Button>
                </div>
            </Dialog>
            <Dialog
                isOpen={pinDialogIsOpen}
                onClose={(e: any) => onPinDialogClose(e)}
                onRequestClose={(e: any) => onPinDialogClose(e)}
            >
                <h5 className="mb-4">{title}</h5>
                <PinInput
                    onPinDialogClose={() => setPinDialogIsOpen(false)}
                    type={`${
                        title === 'Check In'
                            ? 'time_in'
                            : title === 'Break In'
                              ? 'break_in'
                              : title === 'Break Out'
                                ? 'break_out'
                                : 'time_out'
                    }`}
                    timezone={timezone}
                    onPinDialogOk={onPinDialogOk}
                />
            </Dialog>
        </>
    )
}

export default ClockButton
