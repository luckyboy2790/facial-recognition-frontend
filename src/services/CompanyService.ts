import ApiService from './ApiService'

export async function apiCompaniesList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/company',
        method: 'get',
        params,
    })
}

export async function apiCreateCompany<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/company/create',
        method: 'post',
        data,
    })
}

export async function apiDeleteCompanies<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'http://localhost:5000/api/company/delete',
        method: 'post',
        data,
    })
}
