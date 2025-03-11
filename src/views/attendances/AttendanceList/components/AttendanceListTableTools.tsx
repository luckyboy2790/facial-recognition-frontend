import CustomerListSearch from './AttendanceListSearch'

const CustomersListTableTools = () => {
    const handleInputChange = (val: object) => {
        // const newTableData = cloneDeep(tableData)
        // newTableData.query = val
        // newTableData.pageIndex = 1
        // if (typeof val === 'string' && val.length > 1) {
        //     setTableData(newTableData)
        // }
        // if (typeof val === 'string' && val.length === 0) {
        //     setTableData(newTableData)
        // }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <CustomerListSearch onInputChange={handleInputChange} />
        </div>
    )
}

export default CustomersListTableTools
