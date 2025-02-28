import ApiService from './ApiService'

export async function apiGetProjectTasks<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/projects/tasks',
        method: 'get',
    })
}
