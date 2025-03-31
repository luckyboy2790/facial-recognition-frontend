import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const adminRoute: Routes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/dashboard')),
        routeAuthority: ['dashboard.read'],
    },
    {
        key: 'employees',
        path: '/employees',
        component: lazy(() => import('@/views/employees/EmployeeList')),
        routeAuthority: ['employee.read'],
    },
    {
        key: 'employees',
        path: '/employee-create',
        component: lazy(() => import('@/views/employees/EmployeeCreate')),
        routeAuthority: ['employee.create'],
    },
    {
        key: 'employees',
        path: '/employee-edit/:id',
        component: lazy(() => import('@/views/employees/EmployeeEdit')),
        routeAuthority: ['employee.update'],
    },
    {
        key: 'employees',
        path: '/employee-details/:id',
        component: lazy(() => import('@/views/employees/EmployeeDetails')),
        routeAuthority: ['employee.read'],
    },
    {
        key: 'attendance',
        path: '/attendance',
        component: lazy(() => import('@/views/attendances/AttendanceList')),
        routeAuthority: ['attendance.read'],
    },
    {
        key: 'attendance',
        path: '/attendance-create',
        component: lazy(() => import('@/views/attendances/AttendanceCreate')),
        routeAuthority: ['attendance.create'],
    },
    {
        key: 'attendance',
        path: '/attendance-edit/:id',
        component: lazy(() => import('@/views/attendances/AttendanceEdit')),
        routeAuthority: ['attendance.update'],
    },
    {
        key: 'schedule',
        path: '/schedule',
        component: lazy(() => import('@/views/schedule/ScheduleList')),
        routeAuthority: ['schedule.read'],
    },
    {
        key: 'schedule',
        path: '/schedule-edit/:id',
        component: lazy(() => import('@/views/schedule/ScheduleEdit')),
        routeAuthority: ['schedule.update'],
    },
    {
        key: 'schedule',
        path: '/schedule-create',
        component: lazy(() => import('@/views/schedule/ScheduleCreate')),
        routeAuthority: ['schedule.create'],
    },
    {
        key: 'leave',
        path: '/leave-list',
        component: lazy(() => import('@/views/leave/LeaveList')),
        routeAuthority: ['leave.read'],
    },
    {
        key: 'leave',
        path: '/leave-edit/:id',
        component: lazy(() => import('@/views/leave/LeaveEdit')),
        routeAuthority: ['leave.update'],
    },
    {
        key: 'reports',
        path: '/reports',
        component: lazy(() => import('@/views/reports/ReportNamesList')),
        routeAuthority: ['report.read'],
    },
    {
        key: 'reports',
        path: '/reports/employee-attendance',
        component: lazy(() => import('@/views/reports/EmployeeAttendanceList')),
        routeAuthority: ['report.read'],
    },
    {
        key: 'reports',
        path: '/reports/employee-birthdays',
        component: lazy(() => import('@/views/reports/EmployeeBirthdayList')),
        routeAuthority: ['report.read'],
    },
    {
        key: 'reports',
        path: '/reports/employee-leaves',
        component: lazy(() => import('@/views/reports/EmployeeLeaveList')),
        routeAuthority: ['report.read'],
    },
    {
        key: 'reports',
        path: '/reports/employee-list',
        component: lazy(() => import('@/views/reports/EmployeeList')),
        routeAuthority: ['report.read'],
    },
    {
        key: 'reports',
        path: '/reports/employee-schedule',
        component: lazy(() => import('@/views/reports/EmployeeSchduleList')),
        routeAuthority: ['report.read'],
    },
    {
        key: 'reports',
        path: '/reports/organization-profile',
        component: lazy(
            () => import('@/views/reports/OrganizationalProfileList'),
        ),
        routeAuthority: ['report.read'],
    },
    {
        key: 'reports',
        path: '/reports/user-accounts',
        component: lazy(() => import('@/views/reports/UserAccountsList')),
        routeAuthority: ['report.read'],
    },
    {
        key: 'users',
        path: '/users',
        component: lazy(() => import('@/views/users/UserList')),
        routeAuthority: [],
    },
    {
        key: 'users',
        path: '/users-create',
        component: lazy(() => import('@/views/users/UserCreate')),
        routeAuthority: ['user.create'],
    },
    {
        key: 'users',
        path: '/users-edit/:id',
        component: lazy(() => import('@/views/users/UserEdit')),
        routeAuthority: ['user.update'],
    },
    {
        key: 'setting',
        path: '/setting',
        component: lazy(() => import('@/views/setting')),
        routeAuthority: ['setting.read'],
    },
    {
        key: 'company',
        path: '/company',
        component: lazy(() => import('@/views/companies')),
        routeAuthority: ['company.read'],
    },
    {
        key: 'department',
        path: '/department',
        component: lazy(() => import('@/views/departments')),
        routeAuthority: ['department.read'],
    },
    {
        key: 'jobtitle',
        path: '/jobtitle',
        component: lazy(() => import('@/views/jobTitles')),
        routeAuthority: ['jobTitles.read'],
    },
    {
        key: 'leavetype',
        path: '/leavetype',
        component: lazy(() => import('@/views/leaveTypes')),
        routeAuthority: ['leaveType.read'],
    },
    {
        key: 'leavegroup',
        path: '/leavegroup',
        component: lazy(() => import('@/views/leaveGroups')),
        routeAuthority: ['leaveGroup.read'],
    },
    // {
    //     key: 'clock',
    //     path: '/clock',
    //     component: lazy(() => import('@/views/checkInOut')),
    //     routeAuthority: [],
    // },
    {
        key: 'account',
        path: '/account-setting',
        component: lazy(() => import('@/views/accountSetting')),
        routeAuthority: [],
    },
]

export default adminRoute
