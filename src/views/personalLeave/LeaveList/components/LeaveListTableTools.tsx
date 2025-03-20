import { useState } from 'react'
import LeaveListSearch from './LeaveListSearch'
import useLeaveList from '../hooks/useLeaveList'
import cloneDeep from 'lodash/cloneDeep'

const LeavesListTableTools = () => {
    const { tableData, setTableData } = useLeaveList()

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }

        console.log(val)
    }

    return (
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <LeaveListSearch onInputChange={handleInputChange} />
        </div>
    )
}

export default LeavesListTableTools
