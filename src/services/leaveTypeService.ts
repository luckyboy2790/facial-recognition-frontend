import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiLeaveTypesList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_type`,
        method: 'get',
        params,
    })
}

export async function apiTotalLeaveTypesList<
    T,
    U extends Record<string, unknown>,
>() {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_type`,
        method: 'get',
    })
}

export async function apiCreateLeaveType<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_type/create`,
        method: 'post',
        data,
    })
}

export async function apiDeleteLeaveTypes<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_type/delete`,
        method: 'post',
        data,
    })
}
