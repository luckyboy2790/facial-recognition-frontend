import useSWR from 'swr'
import type { GetPermissionsRolesResponse } from '../types'
import { apiGetRolesPermissionsRoles } from '@/services/UserService'

export default function useRolePermissonsRoles() {
    const { data, isLoading, error, mutate } = useSWR(
        ['/api/rbac/roles'],
        () => apiGetRolesPermissionsRoles<GetPermissionsRolesResponse>(),
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
