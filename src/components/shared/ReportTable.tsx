import { useMemo, useEffect, useState, useImperativeHandle } from 'react'
import classNames from 'classnames'
import Table from '@/components/ui/Table'
import TableRowSkeleton from './loaders/TableRowSkeleton'
import Loading from './Loading'
import FileNotFound from '@/assets/svg/FileNotFound'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
    ColumnSort,
    Row,
    CellContext,
} from '@tanstack/react-table'
import type { TableProps } from '@/components/ui/Table'
import type { SkeletonProps } from '@/components/ui/Skeleton'
import type { Ref, ReactNode } from 'react'

export type OnSortParam = { order: 'asc' | 'desc' | ''; key: string | number }

type DataTableProps<T> = {
    columns: ColumnDef<T>[]
    customNoDataIcon?: ReactNode
    data?: unknown[]
    loading?: boolean
    noData?: boolean
    instanceId?: string
    onCheckBoxChange?: (checked: boolean, row: T) => void
    onIndeterminateCheckBoxChange?: (checked: boolean, rows: Row<T>[]) => void
    onPaginationChange?: (page: number) => void
    onSelectChange?: (num: number) => void
    onSort?: (sort: OnSortParam) => void
    pageSizes?: number[]
    selectable?: boolean
    skeletonAvatarColumns?: number[]
    skeletonAvatarProps?: SkeletonProps
    pagingData?: {
        total: number
        pageIndex: number
        pageSize: number
    }
    checkboxChecked?: (row: T) => boolean
    indeterminateCheckboxChecked?: (row: Row<T>[]) => boolean
    ref?: Ref<DataTableResetHandle | HTMLTableElement>
} & TableProps

const { Tr, Th, Td, THead, TBody, Sorter } = Table

export type DataTableResetHandle = {
    resetSorting: () => void
    resetSelected: () => void
}

function ReportsTable<T>(props: DataTableProps<T>) {
    const {
        skeletonAvatarColumns,
        columns: columnsProp = [],
        data = [],
        customNoDataIcon,
        loading,
        noData,
        onCheckBoxChange,
        onIndeterminateCheckBoxChange,
        onPaginationChange,
        onSelectChange,
        onSort,
        pageSizes = [10, 25, 50, 100],
        selectable = false,
        skeletonAvatarProps,
        pagingData = {
            total: 0,
            pageIndex: 1,
            pageSize: 10,
        },
        checkboxChecked,
        indeterminateCheckboxChecked,
        instanceId = 'data-table',
        ref,
        ...rest
    } = props

    const { pageSize } = pagingData

    const [sorting, setSorting] = useState<ColumnSort[] | null>(null)

    useEffect(() => {
        if (Array.isArray(sorting)) {
            const sortOrder =
                sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : ''
            const id = sorting.length > 0 ? sorting[0].id : ''
            onSort?.({ order: sortOrder, key: id })
        }
    }, [sorting])

    const finalColumns: ColumnDef<T>[] = useMemo(() => {
        const columns = columnsProp

        if (selectable) {
            return [...columns]
        }
        return columns
    }, [columnsProp, selectable, loading, checkboxChecked])

    const table = useReactTable({
        data,
        columns: finalColumns as ColumnDef<unknown | object | any[], any>[],
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        manualSorting: true,
        onSortingChange: (sorter) => {
            setSorting(sorter as ColumnSort[])
        },
        state: {
            sorting: sorting as ColumnSort[],
        },
    })

    const resetSorting = () => {
        table.resetSorting()
    }

    const resetSelected = () => {
        table.resetRowSelection(true)
    }

    useImperativeHandle(ref, () => ({
        resetSorting,
        resetSelected,
    }))

    return (
        <Loading loading={Boolean(loading && data.length !== 0)} type="cover">
            <Table {...rest}>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={classNames(
                                                    header.column.getCanSort() &&
                                                        'cursor-pointer select-none point',
                                                    loading &&
                                                        'pointer-events-none',
                                                )}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                                {header.column.getCanSort() && (
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                {loading && data.length === 0 ? (
                    <TableRowSkeleton
                        columns={(finalColumns as Array<T>).length}
                        rows={pagingData.pageSize}
                        avatarInColumns={skeletonAvatarColumns}
                        avatarProps={skeletonAvatarProps}
                    />
                ) : (
                    <TBody>
                        {noData ? (
                            <Tr>
                                <Td
                                    className="hover:bg-transparent"
                                    colSpan={finalColumns.length}
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        {customNoDataIcon ? (
                                            customNoDataIcon
                                        ) : (
                                            <>
                                                <FileNotFound />
                                                <span className="font-semibold">
                                                    No data found!
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </Td>
                            </Tr>
                        ) : (
                            table
                                .getRowModel()
                                .rows.slice(0, pageSize)
                                .map((row) => {
                                    return (
                                        <Tr key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => {
                                                    return (
                                                        <Td
                                                            key={cell.id}
                                                            style={{
                                                                width: cell.column.getSize(),
                                                            }}
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext(),
                                                            )}
                                                        </Td>
                                                    )
                                                })}
                                        </Tr>
                                    )
                                })
                        )}
                    </TBody>
                )}
            </Table>
        </Loading>
    )
}

export type { ColumnDef, Row, CellContext }
export default ReportsTable
