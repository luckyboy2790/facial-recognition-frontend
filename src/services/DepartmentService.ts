import ApiService from './ApiService'

export async function apiDepartmentsList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/department',
        method: 'get',
        params,
    })
}

export async function apiCreateDepartment<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/department/create',
        method: 'post',
        data,
    })
}

export async function apiDeleteDepartments<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/department/delete',
        method: 'post',
        data,
    })
}
