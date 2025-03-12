import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiDepartmentsList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/department`,
        method: 'get',
        params,
    })
}

export async function apiCreateDepartment<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/department/create`,
        method: 'post',
        data,
    })
}

export async function apiDeleteDepartments<
    T,
    U extends Record<string, unknown>,
>(data: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/department/delete`,
        method: 'post',
        data,
    })
}
