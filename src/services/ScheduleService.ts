import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT
import { useToken } from '@/store/authStore'

export async function apiScheduleList<T, U extends Record<string, unknown>>(
    params: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/schedule/get_schedule`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiScheduleDetail<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/schedule/get_schedule/${id}`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiDeleteSchedules<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/schedule/delete_schedule`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiArchiveSchedule<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/schedule/archive_schedule`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiPersonalScheduleList<
    T,
    U extends Record<string, unknown>,
>(params: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/schedule/personal/get_schedule`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}
