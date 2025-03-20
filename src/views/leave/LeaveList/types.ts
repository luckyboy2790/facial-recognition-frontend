import { Employee } from '@/views/employees/EmployeeList/types'
import { LeaveType } from '@/views/leaveTypes/types'

type PersonalInfo = {
    location: string
    title: string
    birthday: string
    phoneNumber: string
    dialCode: string
    address: string
    postcode: string
    city: string
    country: string
    facebook: string
    twitter: string
    pinterest: string
    linkedIn: string
}

type OrderHistory = {
    id: string
    item: string
    status: string
    amount: number
    date: number
}

type PaymentMethod = {
    cardHolderName: string
    cardType: string
    expMonth: string
    expYear: string
    last4Number: string
    primary: boolean
}

type Subscription = {
    plan: string
    status: string
    billing: string
    nextPaymentDate: number
    amount: number
}

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
