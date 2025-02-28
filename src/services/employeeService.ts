import ApiService from './ApiService'

export async function apiGetProjectTasks<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/projects/tasks',
        method: 'get',
    })
}

export async function apiGetCustomersList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/customers',
        method: 'get',
        params,
    })
}
