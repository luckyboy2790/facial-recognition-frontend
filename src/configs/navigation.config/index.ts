import { DASHBOARDS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: '',
        path: '',
        title: '',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            {
                key: 'dashboard',
                path: `/dashboard`,
                title: 'Dashboard',
                translateKey: 'nav.dashboard.dashboard',
                icon: 'dashboardDashboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'employees',
                path: `/employees`,
                title: 'employees',
                translateKey: 'nav.dashboard.employees',
                icon: 'dashboardEmployees',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'attendance',
                path: `/attendance`,
                title: 'Attendance',
                translateKey: 'nav.dashboard.attendance',
                icon: 'dashboardAttendance',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'dashboard.analytic',
                path: `/analytic`,
                title: 'Analytic',
                translateKey: 'nav.dashboard.analytic',
                icon: 'dashboardAnalytic',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
        ],
    },
]

export default navigationConfig
