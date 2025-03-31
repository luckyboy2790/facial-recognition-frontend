import { Employee } from '../EmployeeList/types'

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

export type GetCustomersListResponse = {
    list: Attendance[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Attendance = {
    _id: string
    comment?: string
    date?: string
    employee: string
    employeeData: Employee
    reason?: string
    time_in?: string
    time_in_24?: string
    time_out?: string
    time_out_24?: string
    break_in?: string
    break_in_24?: string
    break_out?: string
    break_out_24?: string
    total_hours?: string
    __v: 0
    status_timein: string
    status_timeout: string
}
