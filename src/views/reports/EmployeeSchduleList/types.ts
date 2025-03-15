import { Employee } from '@/views/employees/EmployeeList/types'

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

export type GetSchedulesListResponse = {
    list: Schedule[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Schedule = {
    _id: string
    employee: string
    employee_data: Employee
    employee_name: string
    formattedFromDate: string
    formattedTime: string
    formattedToDate: string
    from: string
    off_time: string
    rest_days: string[]
    start_time: string
    status: string
    to: string
    total_hours: string
    __v: number
}
