import type { KeyedMutator } from 'swr'

export type GetUsersListResponse = {
    list: User[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type User = {
    _id: string
    employee: string
    email: string
    account_type: string
    role: string
    status: string
}

export type Users = User[]

export type RoleFilter = {
    role?: string
    status?: string
}

export type Role = {
    _id: string
    name: string
    status: string
    accessRight: Record<string, string[]>
}

export type Roles = Role[]

export type GetPermissionsRolesResponse = {
    roleList: Role[]
    message: string
}

export type MutateRolesPermissionsRolesResponse =
    KeyedMutator<GetPermissionsRolesResponse>
