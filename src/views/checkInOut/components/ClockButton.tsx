import Card from '@/components/ui/Card'
import { ReactElement, useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import VideoInputWithRouter from './VideoInput'

interface BoardCardProps {
    title: String
    description: String
    icon: ReactElement
    timezone: string
}

const ClockButton = (props: BoardCardProps) => {
    const { title, description, icon, timezone } = props

    const [dialogIsOpen, setIsOpen] = useState(false)

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
                    type={`${title === 'Check In' ? 'time_in' : 'time_out'}`}
                    timezone={timezone}
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
        </>
    )
}

export default ClockButton
