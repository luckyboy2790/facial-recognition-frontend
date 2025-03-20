import ApiService from './ApiService'
import { useToken } from '@/store/authStore'

const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiLeaveList<T, U extends Record<string, unknown>>(
    params: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave/personal/get_personal_leaves`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiLeaveDetail<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/get_attendance/${id}`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiLeaveCheckOut<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/checkout_attendance/${id}`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiDeleteLeaves<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/delete_attendance`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiArchiveLeave<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/archive_attendance`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiLeaveTotalList<T>() {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/total_attendance`,
        method: 'get',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}
