import useSWR from 'swr'
import { useUserListStore } from '../store/employeeListStore'
import type { GetUsersListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiDeleteUsers, apiGetUsersList } from '@/services/UserService'

type UserData = {
    userIds: string[]
}

export default function useUserList() {
    const {
        tableData,
        setTableData,
        selectedUser,
        setSelectedUser,
        setSelectAllUser,
    } = useUserListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/users', { ...tableData }],
        ([_, params]) =>
            apiGetUsersList<GetUsersListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const deleteUsers = async (userIds: string[]) => {
        await apiDeleteUsers<string[], UserData>({
            userIds,
        })
        mutate()
        setSelectAllUser([])
    }

    const userList = data?.list || []

    const userListTotal = data?.total || 0

    return {
        userList,
        userListTotal,
        error,
        isLoading,
        tableData,
        mutate,
        deleteUsers,
        setTableData,
        selectedUser,
        setSelectedUser,
        setSelectAllUser,
    }
}
