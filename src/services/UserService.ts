import ApiService from './ApiService'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

export async function apiGetRolesPermissionsRoles<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/user/get_role`,
        method: 'get',
    })
}

export async function apiGetUsersList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/user/get_users`,
        method: 'get',
        params,
    })
}

export async function apiGetUserDetail<T, U extends Record<string, unknown>>({
    id,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/user/get_user/${id}`,
        method: 'get',
    })
}

export async function apiDeleteUsers<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `${domain}/api/user/delete_user`,
        method: 'post',
        data,
    })
}
