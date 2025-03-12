import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiJobTitlesList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/job_title`,
        method: 'get',
        params,
    })
}

export async function apiCreateJobTitle<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/job_title/create`,
        method: 'post',
        data,
    })
}

export async function apiDeleteJobTitles<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/job_title/delete`,
        method: 'post',
        data,
    })
}
