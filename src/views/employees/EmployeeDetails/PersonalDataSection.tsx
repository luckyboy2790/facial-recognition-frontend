import { Employee } from '../EmployeeList/types'

type ProfileSectionProps = {
    data: Employee
}

const PersonalDataSection = ({ data }: ProfileSectionProps) => {
    return (
        <>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">Civil Status</p>
                <p className="mt-8 w-3/5">{data.civil_status}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">Age</p>
                <p className="mt-8 w-3/5">{data.age}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">Height (cm)</p>
                <p className="mt-8 w-3/5">{data.height}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">Weight (pounds)</p>
                <p className="mt-8 w-3/5">{data.weight}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">Gender</p>
                <p className="mt-8 w-3/5">{data.gender}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">Place of Birth</p>
                <p className="mt-8 w-3/5">{data.place_of_birth}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">Home Address</p>
                <p className="mt-8 w-3/5">{data.address}</p>
            </div>
            <div className="w-full flex justify-between">
                <p className="mt-8 w-2/5">National ID</p>
                <p className="mt-8 w-3/5">{data.national_id}</p>
            </div>
        </>
    )
}

export default PersonalDataSection
