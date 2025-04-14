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
import useTranslation from '@/utils/hooks/useTranslation'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

type SidePanelProps = CommonProps

const _QuickAccessDropdown = (props: SidePanelProps) => {
    const { t } = useTranslation()

    const clockItemList: DropdownList[] = [
        {
            label: t('page.header.clock_in_out', 'Clock In/Out'),
            path: '/clock',
            icon: <FaRegClock />,
        },
    ]

    const employeeItemList: DropdownList[] = [
        {
            label: t('page.header.new_employee', 'New Employee'),
            path: '/employee-create',
            icon: <FaUserPlus />,
        },
    ]

    const dropdownItemList: DropdownList[] = [
        {
            label: t('page.employee.company', 'Company'),
            path: '/company',
            icon: <FaUniversity />,
        },
        {
            label: t('page.employee.department', 'Department'),
            path: '/department',
            icon: <FaCubes />,
        },
        {
            label: t('page.employee.job_title', 'Job Title'),
            path: '/jobtitle',
            icon: <FaPencilAlt />,
        },
        {
            label: t('page.leave.leave_type', 'Leave Type'),
            path: '/leavetype',
            icon: <FaRegCalendarAlt />,
        },
    ]
    const { className } = props

    const { user } = useAuth()

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
                        {t('page.header.quick_access', 'QUICK ACCESS')}
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
                    <a
                        className="flex h-full w-full px-2"
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="flex gap-2 items-center w-full">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </span>
                    </a>
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

            {dropdownItemList.map((item) =>
                user.account_type === 'Admin' ? (
                    item.label !== 'Company' && (
                        <Dropdown.Item
                            key={item.label}
                            eventKey={item.label}
                            className="px-0"
                        >
                            <Link
                                className="flex h-full w-full px-2"
                                to={item.path}
                            >
                                <span className="flex gap-2 items-center w-full">
                                    <span className="text-xl">{item.icon}</span>
                                    <span>{item.label}</span>
                                </span>
                            </Link>
                        </Dropdown.Item>
                    )
                ) : (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="px-0"
                    >
                        <Link
                            className="flex h-full w-full px-2"
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ),
            )}
        </Dropdown>
    )
}

const QuickAccessDropdown = withHeaderItem(_QuickAccessDropdown)

export default QuickAccessDropdown
