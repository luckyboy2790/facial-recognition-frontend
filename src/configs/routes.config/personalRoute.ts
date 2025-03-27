import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const personalRoute: Routes = [
    {
        key: 'personal_dashboard',
        path: `/personal/dashboard`,
        component: lazy(() => import('@/views/personalDashboard')),
        routeAuthority: [],
    },
    {
        key: 'personal_attendance',
        path: `/personal/attendance`,
        component: lazy(() => import('@/views/personalAttendances')),
        routeAuthority: [],
    },
    {
        key: 'personal_schedule',
        path: `/personal/schedule`,
        component: lazy(() => import('@/views/personalSchedule')),
        routeAuthority: [],
    },
    {
        key: 'personal_leave',
        path: `/personal/leave`,
        component: lazy(() => import('@/views/personalLeave/LeaveList')),
        routeAuthority: [],
    },
    {
        key: 'personal_leave',
        path: `/personal/leave-create`,
        component: lazy(() => import('@/views/personalLeave/LeaveCreate')),
        routeAuthority: [],
    },
    {
        key: 'personal_leave',
        path: `/personal/leave-edit/:id`,
        component: lazy(() => import('@/views/personalLeave/LeaveEdit')),
        routeAuthority: [],
    },
    {
        key: 'personal_setting',
        path: `/personal/setting`,
        component: lazy(() => import('@/views/personalSetting')),
        routeAuthority: [],
    },
    {
        key: 'personal_account',
        path: '/personal/account-setting',
        component: lazy(() => import('@/views/accountSetting')),
        routeAuthority: [],
    },
    {
        key: 'clock',
        path: '/clock',
        component: lazy(() => import('@/views/checkInOut')),
        routeAuthority: [],
    },
]

export default personalRoute
