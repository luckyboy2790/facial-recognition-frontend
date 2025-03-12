import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiLeaveGroupsList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_group`,
        method: 'get',
        params,
    })
}

export async function apiCreateLeaveGroup<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_group/create`,
        method: 'post',
        data,
    })
}

export async function apiDeleteLeaveGroups<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_group/delete`,
        method: 'post',
        data,
    })
}

export async function apiUpdateLeaveGroup<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/leave_group/update`,
        method: 'post',
        data,
    })
}
