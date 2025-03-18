import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT
import { useToken } from '@/store/authStore'

export async function apiGetRolesPermissionsRoles<T>() {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/user/get_role`,
        method: 'get',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiGetUsersList<T, U extends Record<string, unknown>>(
    params: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/user/get_users`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiGetUserDetail<T, U extends Record<string, unknown>>({
    id,
}: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/user/get_user/${id}`,
        method: 'get',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiDeleteUsers<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/user/delete_user`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}
