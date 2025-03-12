import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiScheduleList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/schedule/get_schedule`,
        method: 'get',
        params,
    })
}

export async function apiScheduleDetail<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/schedule/get_schedule/${id}`,
        method: 'get',
        params,
    })
}

export async function apiDeleteSchedules<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/schedule/delete_schedule`,
        method: 'post',
        data,
    })
}

export async function apiArchiveSchedule<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/schedule/archive_schedule`,
        method: 'post',
        data,
    })
}
