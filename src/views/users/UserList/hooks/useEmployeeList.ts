import useSWR from 'swr'
import { useUserListStore } from '../store/employeeListStore'
import type { GetUsersListResponse } from '../types'
import type { TableQueries } from '@/@types/common'
import { apiGetUsersList } from '@/services/UserService'

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetUsersList<GetUsersListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const userList = data?.list || []

    const userListTotal = data?.total || 0

    return {
        userList,
        userListTotal,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        selectedUser,
        setSelectedUser,
        setSelectAllUser,
    }
}
