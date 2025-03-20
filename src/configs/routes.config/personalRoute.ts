import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const personalRoute: Routes = [
    {
        key: 'personal_dashboard',
        path: `/personal/dashboard`,
        component: lazy(() => import('@/views/personalDashboard')),
        authority: [],
    },
    {
        key: 'personal_attendance',
        path: `/personal/attendance`,
        component: lazy(() => import('@/views/personalAttendances')),
        authority: [],
    },
    {
        key: 'personal_schedule',
        path: `/personal/schedule`,
        component: lazy(() => import('@/views/personalSchedule')),
        authority: [],
    },
    {
        key: 'personal_leave',
        path: `/personal/leave`,
        component: lazy(() => import('@/views/personalLeave/LeaveList')),
        authority: [],
    },
    {
        key: 'personal_leave',
        path: `/personal/leave-create`,
        component: lazy(() => import('@/views/personalLeave/LeaveCreate')),
        authority: [],
    },
    {
        key: 'personal_leave',
        path: `/personal/leave-edit/:id`,
        component: lazy(() => import('@/views/personalLeave/LeaveEdit')),
        authority: [],
    },
    {
        key: 'personal_setting',
        path: `/personal/setting`,
        component: lazy(() => import('@/views/personalSetting')),
        authority: [],
    },
]

export default personalRoute
