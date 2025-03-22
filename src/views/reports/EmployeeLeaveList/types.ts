import { Employee } from '@/views/employees/EmployeeList/types'
import { LeaveType } from '@/views/leaveTypes/types'

export type GetLeavesListResponse = {
    list: Leave[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Leave = {
    _id: string
    employee: string
    leaveType: string
    leaveFrom: string
    leaveTo: string
    leaveReturn: string
    reason: string
    status: string
    comment: string
    leaveTypeData: LeaveType
    employeeData: Employee
}
