import { useMemo, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import useLeaveTypeList from '../hooks/useLeaveGroupsList'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type {
    GetLeaveGroupsListResponse,
    LeaveGroup,
    LeaveGroupCreateResponse,
} from '../types'
import type { TableQueries } from '@/@types/common'
import { Button, Dialog, Input, Select, Tooltip } from '@/components/ui'
import { TbPencil } from 'react-icons/tb'
import {
    apiLeaveGroupsList,
    apiUpdateLeaveGroup,
} from '@/services/leaveGroupService'
import useSWR from 'swr'

type LeaveGroupData = {
    _id: string
    leaveGroupName: string
    description: string
    leavePrivilege: string[]
    groupStatus: string
}

const ActionColumn = ({ onEdit }: { onEdit: () => void }) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
        </div>
    )
}

const CompanyListTable = () => {
    const {
        leaveGroupsList,
        leaveGroupsListTotal,
        tableData,
        isLeaveGroupLoading,
        setTableData,
        setSelectAllLeaveGroup,
        setSelectedLeaveGroup,
        selectedLeaveGroup,
        leaveTypesList,
        mutateLeaveGroup,
    } = useLeaveTypeList()

    console.log(leaveGroupsList)

    const [groupStatus, setGroupStatus] = useState<string>('')
    const [leaveGroupName, setLeaveGroupName] = useState('')
    const [description, setDescription] = useState('')
    const [leaveTypes, setLeaveTypes] = useState<string[]>([])
    const [groupId, setGroupId] = useState<string>('')

    const leaveGroupOptions = leaveTypesList.map((item) => ({
        value: item._id,
        label: item.leave_name,
    }))

    const statusOption = [
        {
            label: 'Active',
            value: 'Active',
        },
        {
            label: 'Disabled',
            value: 'Disabled',
        },
    ]

    const getLeaveGroup = async () => {
        return apiLeaveGroupsList<GetLeaveGroupsListResponse, TableQueries>(
            tableData,
        )
    }

    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = async (leaveGroup: LeaveGroup) => {
        const leaveGroups = await getLeaveGroup()

        const editData: any = leaveGroups.list.find(
            (item) => item._id === leaveGroup._id,
        )

        if (!editData) return

        setGroupId(leaveGroup._id)
        setLeaveGroupName(editData.group_name || '')
        setGroupStatus(editData.status || '')
        setDescription(editData.description || '')

        setLeaveTypes(
            Array.isArray(editData.leaveprivileges)
                ? editData.leaveprivileges
                : [],
        )

        setIsOpen(true)
    }

    const updateLeaveGroup = async () => {
        const updatedGroup = await apiUpdateLeaveGroup<
            LeaveGroupCreateResponse,
            LeaveGroupData
        >({
            _id: groupId,
            leaveGroupName,
            description,
            leavePrivilege: leaveTypes,
            groupStatus,
        })

        return updatedGroup
    }

    const { data, isLoading: isCreatLeaveGroupLoading } = useSWR(
        '/api/leaveGroups/create',
        {
            revalidateOnFocus: false,
        },
    )

    const onDialogClose = (
        e:
            | React.MouseEvent<HTMLSpanElement>
            | React.KeyboardEvent<HTMLSpanElement>,
    ) => {
        setIsOpen(false)
    }

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(false)

        const updatedGroup: LeaveGroupCreateResponse = await updateLeaveGroup()

        if (updatedGroup.leave_group._id === groupId) {
            mutateLeaveGroup()

            setLeaveGroupName('')
            setDescription('')
            setLeaveTypes([])
            setGroupStatus('')
        }
    }

    const columns: ColumnDef<LeaveGroup>[] = useMemo(
        () => [
            {
                header: 'Group Name',
                accessorKey: 'group_name',
            },
            {
                header: 'Description',
                accessorKey: 'description',
            },
            {
                header: 'Privilege',
                accessorKey: 'leaveTypeNames',
            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => openDialog(props.row.original)}
                    />
                ),
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedLeaveGroup.length > 0) {
            setSelectAllLeaveGroup([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: LeaveGroup) => {
        setSelectedLeaveGroup(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<LeaveGroup>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllLeaveGroup(originalRows)
        } else {
            setSelectAllLeaveGroup([])
        }
    }

    return (
        <>
            <DataTable
                selectable
                columns={columns}
                data={leaveGroupsList}
                noData={!isLeaveGroupLoading && leaveGroupsList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={isLeaveGroupLoading}
                pagingData={{
                    total: leaveGroupsListTotal,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                checkboxChecked={(row) =>
                    selectedLeaveGroup.some(
                        (selected) => selected._id === row._id,
                    )
                }
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Dialog Title</h5>

                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="Leave Group Name"
                        value={leaveGroupName}
                        onChange={(e) => setLeaveGroupName(e.target.value)}
                    />

                    <Input
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="flex flex-col gap-0.5">
                        <Select
                            isMulti
                            size="md"
                            className="mb-4"
                            placeholder="Select Leave Privileges"
                            options={leaveGroupOptions}
                            value={leaveGroupOptions.filter((option) =>
                                leaveTypes.includes(option.value),
                            )}
                            onChange={(selected) =>
                                setLeaveTypes(
                                    selected.map((option) => option.value),
                                )
                            }
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                        />

                        <Select
                            size="md"
                            className="mb-4"
                            placeholder="Select Status"
                            options={statusOption}
                            value={
                                statusOption.find(
                                    (option) => option.value === groupStatus,
                                ) || null
                            }
                            onChange={(selected) =>
                                setGroupStatus(selected ? selected.value : '')
                            }
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                        />
                    </div>
                </div>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        onClick={handleEdit}
                        loading={isCreatLeaveGroupLoading}
                    >
                        Okay
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default CompanyListTable
