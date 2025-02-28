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
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView1'),
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    ...othersRoute,
]
