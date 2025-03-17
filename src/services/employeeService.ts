import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiGetProjectTasks<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/projects/tasks',
        method: 'get',
    })
}

//-------------------------------------------------------------------------------

export async function apiGetCustomersList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee`,
        method: 'get',
        params,
    })
}

export async function apiGetTotalEmployeeList<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/total_employee`,
        method: 'get',
    })
}

export async function apiGetCustomer<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/${id}`,
        method: 'get',
        params,
    })
}

export async function apiDeleteEmployees<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/delete_employee`,
        method: 'post',
        data,
    })
}

export async function apiArchiveEmployee<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/archive_employee`,
        method: 'post',
        data,
    })
}

export async function apiGetTotalEmployeeDescriptor<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/total_employee_descriptor`,
        method: 'get',
    })
}

export async function apiGetAllData<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/total_field`,
        method: 'get',
    })
}
