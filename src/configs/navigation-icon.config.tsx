import {
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone,
    PiBagSimpleDuotone,
} from 'react-icons/pi'
import {
    FaUsers,
    FaRegClock,
    FaRegCalendarAlt,
    FaChartBar,
} from 'react-icons/fa'
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    dashboardDashboard: <PiHouseLineDuotone />,
    dashboardEmployees: <FaUsers />,
    dashboardAttendance: <FaRegClock />,
    dashboardSchedule: <FaRegCalendarAlt />,
    dashboardReports: <FaChartBar />,
    groupMenu: <PiBagSimpleDuotone />,
}

export default navigationIcon
