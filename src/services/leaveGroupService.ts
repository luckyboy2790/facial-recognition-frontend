import ApiService from './ApiService'

export async function apiLeaveGroupsList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/leave_group',
        method: 'get',
        params,
    })
}

export async function apiCreateLeaveGroup<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/leave_group/create',
        method: 'post',
        data,
    })
}

export async function apiDeleteLeaveGroups<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/leave_group/delete',
        method: 'post',
        data,
    })
}

export async function apiUpdateLeaveGroup<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/leave_group/update',
        method: 'post',
        data,
    })
}
