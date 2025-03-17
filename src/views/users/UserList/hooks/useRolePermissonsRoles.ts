import { apiGetRolesPermissionsRoles } from '@/services/employeeService'
import useSWR from 'swr'
import type { GetRolesPermissionsRolesResponse } from '../types'

export default function useRolePermissonsRoles() {
    const { data, isLoading, error, mutate } = useSWR(
        ['/api/rbac/roles'],
        () => apiGetRolesPermissionsRoles<GetRolesPermissionsRolesResponse>(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    const roleList = data?.roleList || []

    return {
        roleList,
        error,
        isLoading,
        mutate,
    }
}
