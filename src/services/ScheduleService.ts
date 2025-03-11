import ApiService from './ApiService'

export async function apiScheduleList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/schedule/get_schedule',
        method: 'get',
        params,
    })
}

export async function apiScheduleDetail<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `http://localhost:5000/api/schedule/get_schedule/${id}`,
        method: 'get',
        params,
    })
}
