import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useSessionUser } from '@/store/authStore'
import type { CommonProps } from '@/@types/common'
import { Link } from 'react-router-dom'
import {
    PiUserDuotone,
    PiGearDuotone,
    PiPulseDuotone,
    PiLinkBold,
} from 'react-icons/pi'
import {
    FaRegClock,
    FaUserPlus,
    FaUniversity,
    FaCubes,
    FaPencilAlt,
    FaRegCalendarAlt,
} from 'react-icons/fa'
import { useAuth } from '@/auth'
import type { JSX } from 'react'
import classNames from 'classnames'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

type SidePanelProps = CommonProps

const clockItemList: DropdownList[] = [
    {
        label: 'Clock In/Out',
        path: '/concepts/account/settings',
        icon: <FaRegClock />,
    },
]

const employeeItemList: DropdownList[] = [
    {
        label: 'New Employee',
        path: '/employee-create',
        icon: <FaUserPlus />,
    },
]

const dropdownItemList: DropdownList[] = [
    {
        label: 'Company',
        path: '/company',
        icon: <FaUniversity />,
    },
    {
        label: 'Department',
        path: '/department',
        icon: <FaCubes />,
    },
    {
        label: 'Job Title',
        path: '/jobtitle',
        icon: <FaPencilAlt />,
    },
    {
        label: 'Leave Type',
        path: '/leavetype',
        icon: <FaRegCalendarAlt />,
    },
]

const _QuickAccessDropdown = (props: SidePanelProps) => {
    const { className } = props

    return (
        <Dropdown
            className="flex"
            toggleClassName="flex items-center"
            renderTitle={
                <div className={classNames('text-2xl', className)}>
                    <PiLinkBold />
                </div>
            }
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="py-2 px-3 flex items-center gap-3">
                    <PiLinkBold className="text-xl" />
                    <div className="font-bold text-gray-900 dark:text-gray-100">
                        QUICK ACCESS
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            {clockItemList.map((item) => (
                <Dropdown.Item
                    key={item.label}
                    eventKey={item.label}
                    className="px-0"
                >
                    <Link className="flex h-full w-full px-2" to={item.path}>
                        <span className="flex gap-2 items-center w-full">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
            ))}
            <Dropdown.Item variant="divider" />
            {employeeItemList.map((item) => (
                <Dropdown.Item
                    key={item.label}
                    eventKey={item.label}
                    className="px-0"
                >
                    <Link className="flex h-full w-full px-2" to={item.path}>
                        <span className="flex gap-2 items-center w-full">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
            ))}
            <Dropdown.Item variant="divider" />
            {dropdownItemList.map((item) => (
                <Dropdown.Item
                    key={item.label}
                    eventKey={item.label}
                    className="px-0"
                >
                    <Link className="flex h-full w-full px-2" to={item.path}>
                        <span className="flex gap-2 items-center w-full">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

const QuickAccessDropdown = withHeaderItem(_QuickAccessDropdown)

export default QuickAccessDropdown
