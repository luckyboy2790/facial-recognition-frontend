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
]

export default personalRoute
