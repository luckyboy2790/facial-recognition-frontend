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
    {
        key: 'reports',
        path: '/reports',
        component: lazy(() => import('@/views/reports/ReportNamesList')),
        authority: [],
    },
    {
        key: 'reports',
        path: '/reports/employee-attendance',
        component: lazy(() => import('@/views/reports/EmployeeAttendanceList')),
        authority: [],
    },
    {
        key: 'reports',
        path: '/reports/employee-birthdays',
        component: lazy(() => import('@/views/reports/EmployeeBirthdayList')),
        authority: [],
    },
    {
        key: 'reports',
        path: '/reports/employee-leaves',
        component: lazy(() => import('@/views/reports/EmployeeLeaveList')),
        authority: [],
    },
    {
        key: 'reports',
        path: '/reports/employee-list',
        component: lazy(() => import('@/views/reports/EmployeeList')),
        authority: [],
    },
    {
        key: 'reports',
        path: '/reports/employee-schedule',
        component: lazy(() => import('@/views/reports/EmployeeSchduleList')),
        authority: [],
    },
    {
        key: 'reports',
        path: '/reports/organization-profile',
        component: lazy(
            () => import('@/views/reports/OrganizationalProfileList'),
        ),
        authority: [],
    },
    {
        key: 'reports',
        path: '/reports/user-accounts',
        component: lazy(() => import('@/views/reports/UserAccountsList')),
        authority: [],
    },
    {
        key: 'users',
        path: '/users',
        component: lazy(() => import('@/views/users/UserList')),
        authority: [],
    },
    {
        key: 'users',
        path: '/users-create',
        component: lazy(() => import('@/views/users/UserCreate')),
        authority: [],
    },
    {
        key: 'users',
        path: '/users-edit/:id',
        component: lazy(() => import('@/views/users/UserEdit')),
        authority: [],
    },
    {
        key: 'users',
        path: '/users-details/:id',
        component: lazy(() => import('@/views/users/UserDetails')),
        authority: [],
    },
    ...othersRoute,
]
