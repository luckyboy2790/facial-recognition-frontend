import { DASHBOARDS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig = [
    {
        key: 'dashboard.ecommerce',
        path: `/home`,
        title: 'Ecommerce',
        translateKey: 'nav.dashboard.ecommerce',
        icon: 'dashboardEcommerce',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
    },
    {
        key: 'dashboard.project',
        path: `/project`,
        title: 'Project',
        translateKey: 'nav.dashboard.project',
        icon: 'dashboardProject',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
    },
    {
        key: 'dashboard.marketing',
        path: `/marketing`,
        title: 'Marketing',
        translateKey: 'nav.dashboard.marketing',
        icon: 'dashboardMarketing',
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
]

export default navigationConfig
