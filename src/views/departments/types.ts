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

export type GetDepartmentsListResponse = {
    list: Department[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Department = {
    _id: string
    department_name: string
}

export type DepartmentCreateResponse = {
    department: Department
    message: string
}
