import Avatar from '@/components/ui/Avatar'
import acronym from '@/utils/acronym'
import useRandomBgColor from '@/utils/hooks/useRandomBgColor'
import {
    HiOutlineCalendar,
    HiOutlineClipboardCheck,
    HiOutlineBan,
} from 'react-icons/hi'

const imagePath = '/img/avatars/'

const GeneratedAvatar = ({ target }: { target: string }) => {
    const color = useRandomBgColor()
    return (
        <Avatar shape="circle" className={`text-gray-900 ${color(target)}`}>
            {acronym(target)}
        </Avatar>
    )
}

const NotificationAvatar = (props: {
    type: number
    target: string
    image: string
    status: string
}) => {
    const { type, target, image, status } = props
    switch (type) {
        case 0:
            if (image) {
                return <Avatar shape="circle" src={`${imagePath}${image}`} />
            } else {
                return <GeneratedAvatar target={target} />
            }
        case 1:
            return (
                <Avatar
                    shape="circle"
                    className="bg-sky-200 text-gray-900"
                    icon={<HiOutlineCalendar />}
                />
            )
        case 2:
            return (
                <Avatar
                    shape="circle"
                    className={
                        status === 'succeed'
                            ? 'bg-emerald-200 text-gray-900'
                            : 'bg-red-200 text-gray-900'
                    }
                    icon={
                        status === 'succeed' ? (
                            <HiOutlineClipboardCheck />
                        ) : (
                            <HiOutlineBan />
                        )
                    }
                />
            )
        default:
            return <Avatar />
    }
}

export default NotificationAvatar
