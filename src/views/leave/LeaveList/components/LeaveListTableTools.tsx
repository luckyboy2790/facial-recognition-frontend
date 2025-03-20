import useCustomerList from '../hooks/useLeaveList'
import CustomerListSearch from './LeaveListSearch'
import cloneDeep from 'lodash/cloneDeep'

const CustomersListTableTools = () => {
    const { tableData, setTableData } = useCustomerList()

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
    }

    return (
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CustomerListSearch onInputChange={handleInputChange} />
        </div>
    )
}

export default CustomersListTableTools
