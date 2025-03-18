import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT
import { useToken } from '@/store/authStore'

export async function apiLeaveTypesList<T, U extends Record<string, unknown>>(
    params: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_type`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiTotalLeaveTypesList<T>() {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_type`,
        method: 'get',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiCreateLeaveType<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_type/create`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiDeleteLeaveTypes<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_type/delete`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}
