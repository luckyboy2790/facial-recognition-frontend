import type { Control, FieldErrors } from 'react-hook-form'

export type UserFields = {
    firstName: string
    lastName: string
    email: string
    dialCode: string
    phoneNumber: string
    faceDescriptor: string[]
    address: string
    gender: string
    civilStatus: string
    height: string
    weight: string
    age: string
    birthday: string
    nationalId: string
    placeOfBirth: string
}

export type EmployeeDetail = {
    company: string
    department: string
    jobTitle: string
    pin: string
    companyEmail: string
    leaveGroup: string
    employmentType: string
    employmentStatus: string
    officialStartDate: string
    dateRegularized: string
}

export type ProfileImageFields = {
    img: string
}

export type CustomerFormSchema = UserFields &
    ProfileImageFields &
    EmployeeDetail

export type FormSectionBaseProps = {
    control: Control<CustomerFormSchema>
    errors: FieldErrors<CustomerFormSchema>
}
