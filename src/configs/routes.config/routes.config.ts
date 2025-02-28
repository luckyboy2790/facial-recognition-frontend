import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/dashboard')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'employees',
        path: '/employees',
        component: lazy(() => import('@/views/employees/EmployeeList')),
        authority: [],
    },
    {
        key: 'employees',
        path: '/employee-create',
        component: lazy(() => import('@/views/employees/EmployeeCreate')),
        authority: [],
    },
    {
        key: 'employees',
        path: '/employee-edit/:id',
        component: lazy(() => import('@/views/employees/EmployeeEdit')),
        authority: [],
    },
    {
        key: 'employees',
        path: '/employee-details/:id',
        component: lazy(() => import('@/views/employees/EmployeeDetails')),
        authority: [],
    },
    {
        key: 'attendance',
        path: '/attendance',
        component: lazy(() => import('@/views/attendances/AttendanceList')),
        authority: [],
    },
    {
        key: 'attendance',
        path: '/attendance-edit/:id',
        component: lazy(() => import('@/views/attendances/AttendanceEdit')),
        authority: [],
    },
    {
        key: 'schedule',
        path: '/schedule',
        component: lazy(() => import('@/views/schedule/ScheduleList')),
        authority: [],
    },
    {
        key: 'schedule',
        path: '/schedule-edit/:id',
        component: lazy(() => import('@/views/schedule/ScheduleEdit')),
        authority: [],
    },
    {
        key: 'schedule',
        path: '/schedule-create',
        component: lazy(() => import('@/views/schedule/ScheduleCreate')),
        authority: [],
    },
    ...othersRoute,
]
