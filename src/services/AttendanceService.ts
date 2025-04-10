import { AxiosError } from 'axios'
import ApiService from './ApiService'
import { useToken } from '@/store/authStore'

const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiAttendanceList<T, U extends Record<string, unknown>>(
    params: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/get_attendance`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiAttendanceDetail<
    T,
    U extends Record<string, unknown>,
>({ id, ...params }: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/get_attendance/${id}`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiAttendanceCheckOut<
    T,
    U extends Record<string, unknown>,
>({ id, ...params }: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/checkout_attendance/${id}`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
        .then((data) => data)
        .catch((error: any) => {
            const errorMessage =
                error?.response?.data?.message || 'An unexpected error occurred'

            throw new Error(errorMessage)
        })
}

export async function apiPinEmployeeCheckOut<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/pin_checkout_employee`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
        .then((data) => data)
        .catch((error: any) => {
            const errorMessage =
                error?.response?.data?.message || 'An unexpected error occurred'

            throw new Error(errorMessage)
        })
}

export async function apiDeleteAttendances<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/delete_attendance`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiArchiveAttendance<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/archive_attendance`,
        method: 'post',
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiPersonalAttendanceList<
    T,
    U extends Record<string, unknown>,
>(params: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/personal/get_attendance`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}

export async function apiTotalAttendanceList<
    T,
    U extends Record<string, unknown>,
>(params?: U) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/total_attendance`,
        method: 'get',
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
}
