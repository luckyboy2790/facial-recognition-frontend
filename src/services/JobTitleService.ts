import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT
import { useToken } from '@/store/authStore'

export async function apiJobTitlesList<T, U extends Record<string, unknown>>(
    params: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/job_title`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiCreateJobTitle<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/job_title/create`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiDeleteJobTitles<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/job_title/delete`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}
