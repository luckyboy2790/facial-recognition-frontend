import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useSessionUser } from '@/store/authStore'
import { Link } from 'react-router-dom'
import { PiUserDuotone, PiGearDuotone, PiSignOutDuotone } from 'react-icons/pi'
import { FaUserLock } from 'react-icons/fa'
import { useAuth } from '@/auth'
import { useEffect, useState, type JSX } from 'react'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
    {
        label: 'Account Setting',
        path: '/concepts/account/settings',
        icon: <PiGearDuotone />,
    },
]

const _UserDropdown = () => {
    const { img, full_name, email } = useSessionUser((state) => state.user)

    const [isPersonal, setIsPersonal] = useState<boolean>(false)

    const { signOut } = useAuth()

    const handleSignOut = () => {
        signOut()
    }

    const avatarProps = {
        ...(img ? { src: `${domain}${img}` } : { icon: <PiUserDuotone /> }),
    }

    const { user } = useAuth()

    const isPersonalRoute = (): boolean => {
        const pathSegments = window.location.pathname.split('/').filter(Boolean)

        return pathSegments.length > 0 && pathSegments[0] === 'personal'
    }

    useEffect(() => {
        console.log(isPersonalRoute())

        if (isPersonalRoute()) {
            setIsPersonal(true)
        } else {
            setIsPersonal(false)
        }
    }, [])

    return (
        <Dropdown
            className="flex"
            toggleClassName="flex items-center"
            renderTitle={
                <div className="flex cursor-pointer items-center">
                    <Avatar size={32} {...avatarProps} />
                </div>
            }
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="flex gap-3 items-center px-3 py-2">
                    <Avatar {...avatarProps} />
                    <div>
                        <div className="text-gray-900 dark:text-gray-100 font-bold">
                            {full_name || 'Anonymous'}
                        </div>
                        <div className="text-xs">
                            {email || 'No email available'}
                        </div>
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            {dropdownItemList.map((item) => (
                <Dropdown.Item
                    key={item.label}
                    eventKey={item.label}
                    className="px-0"
                >
                    <Link className="flex h-full w-full px-2" to={item.path}>
                        <span className="flex w-full gap-2 items-center">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
            ))}
            {user.account_type === 'Admin' && !isPersonal && (
                <Dropdown.Item
                    key="Switch to My Account"
                    eventKey="Switch to My Account"
                    className="px-0"
                >
                    <a
                        className="flex h-full w-full px-2"
                        href="/personal/dashboard"
                        target="_blank"
                    >
                        <span className="flex w-full gap-2 items-center">
                            <span className="text-xl">
                                <FaUserLock />
                            </span>
                            <span>Switch to My Account</span>
                        </span>
                    </a>
                </Dropdown.Item>
            )}
            <Dropdown.Item variant="divider" />
            <Dropdown.Item
                eventKey="Sign Out"
                className="gap-2"
                onClick={handleSignOut}
            >
                <span className="text-xl">
                    <PiSignOutDuotone />
                </span>
                <span>Sign Out</span>
            </Dropdown.Item>
        </Dropdown>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
