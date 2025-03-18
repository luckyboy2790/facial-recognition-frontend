import { useToken } from '@/store/authStore'
import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiGetProjectTasks<T>() {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: '/projects/tasks',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

//-------------------------------------------------------------------------------

export async function apiGetCustomersList<T, U extends Record<string, unknown>>(
    params: U,
) {
    const { token } = useToken()

    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee`,
        method: 'get',
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function apiGetTotalEmployeeList<T>() {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/total_employee`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function apiGetCustomer<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    const { token } = useToken()

    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/${id}`,
        method: 'get',
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function apiDeleteEmployees<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/delete_employee`,
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function apiArchiveEmployee<T, U extends Record<string, unknown>>(
    data: U,
) {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/archive_employee`,
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function apiGetTotalEmployeeDescriptor<T>() {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/total_employee_descriptor`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function apiGetAllData<T>() {
    const { token } = useToken()
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/employee/total_field`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
