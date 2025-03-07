import ApiService from './ApiService'

export async function apiLeaveTypesList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/leave_type',
        method: 'get',
        params,
    })
}

export async function apiCreateLeaveType<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/leave_type/create',
        method: 'post',
        data,
    })
}

export async function apiDeleteLeaveTypes<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/leave_type/delete',
        method: 'post',
        data,
    })
}
