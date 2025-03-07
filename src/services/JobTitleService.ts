import ApiService from './ApiService'

export async function apiJobTItlesList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/job_title',
        method: 'get',
        params,
    })
}

export async function apiCreateJobTitle<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/job_title/create',
        method: 'post',
        data,
    })
}

export async function apiDeleteJobTItles<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/job_title/delete',
        method: 'post',
        data,
    })
}
