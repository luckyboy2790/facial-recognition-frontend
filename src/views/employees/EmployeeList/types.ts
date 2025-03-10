import { Company } from '@/views/companies/types'
import { Department } from '@/views/departments/types'
import { JobTitle } from '@/views/jobTitles/types'
import { LeaveGroup } from '@/views/leaveGroups/types'
import { String } from 'lodash'

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
    list: Employee[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type FaceInfo = {
    name: string
    descriptors: number[]
}

export type Employee = {
    _id: string
    full_name: string
    img: string
    email: string
    dial_code: string
    phone_number: string
    face_info: FaceInfo
    address: string
    gender: string
    civil_status: string
    height: string
    weight: string
    age: string
    birthday: string
    national_id: string
    place_of_birth: string
    company: Company
    department: Department
    job_title: JobTitle
    company_id: string
    department_id: string
    job_title_id: String
    pin: string
    company_email: string
    leave_group_id: string
    leave_group: LeaveGroup
    employee_type: string
    employee_status: string
    official_start_date: string
    date_regularized: string
    __v: number
}
