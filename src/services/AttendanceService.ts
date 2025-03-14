import ApiService from './ApiService'

const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiAttendanceList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/get_attendance`,
        method: 'get',
        params,
    })
}

export async function apiAttendanceDetail<
    T,
    U extends Record<string, unknown>,
>({ id, ...params }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/get_attendance/${id}`,
        method: 'get',
        params,
    })
}

export async function apiAttendanceCheckOut<
    T,
    U extends Record<string, unknown>,
>({ id, ...params }: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/checkout_attendance/${id}`,
        method: 'get',
        params,
    })
}

export async function apiDeleteAttendances<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/delete_attendance`,
        method: 'post',
        data,
    })
}

export async function apiArchiveAttendance<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/attendance/archive_attendance`,
        method: 'post',
        data,
    })
}
