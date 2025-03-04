import { PiHouseLineDuotone } from 'react-icons/pi'
import {
    FaUsers,
    FaRegClock,
    FaRegCalendarAlt,
    FaChartBar,
    FaRegUserCircle,
} from 'react-icons/fa'
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    dashboardDashboard: <PiHouseLineDuotone />,
    dashboardEmployees: <FaUsers />,
    dashboardAttendance: <FaRegClock />,
    dashboardSchedule: <FaRegCalendarAlt />,
    dashboardReports: <FaChartBar />,
    dashboardUsers: <FaRegUserCircle />,
}

export default navigationIcon
