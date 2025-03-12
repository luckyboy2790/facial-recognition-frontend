import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiCompaniesList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/company`,
        method: 'get',
        params,
    })
}

export async function apiCreateCompany<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/company/create`,
        method: 'post',
        data,
    })
}

export async function apiDeleteCompanies<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/company/delete`,
        method: 'post',
        data,
    })
}
