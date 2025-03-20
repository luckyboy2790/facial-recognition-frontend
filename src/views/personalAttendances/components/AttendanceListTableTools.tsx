import { useState } from 'react'
import AttendanceListSearch from './AttendanceListSearch'
import useAttendanceList from '../hooks/useAttendanceList'
import cloneDeep from 'lodash/cloneDeep'

const AttendancesListTableTools = () => {
    const { tableData, setTableData } = useAttendanceList()

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <AttendanceListSearch onInputChange={handleInputChange} />
        </div>
    )
}

export default AttendancesListTableTools
