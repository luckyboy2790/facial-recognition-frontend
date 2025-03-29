import Button from '@/components/ui/Button'
import { TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { FaCloudArrowDown } from 'react-icons/fa6'
import { Dialog } from '@/components/ui'
import { useState } from 'react'
import DatePickerRange, {
    DatePickerRangeValue,
} from '@/components/ui/DatePicker/DatePickerRange'
import { apiTotalAttendanceList } from '@/services/AttendanceService'
import * as XLSX from 'xlsx'
import { GetAttendancesListResponse } from '../types'

const AttendanceListActionTools = () => {
    const navigate = useNavigate()

    const [dialogIsOpen, setIsOpen] = useState(false)

    const [date, setDate] = useState('')

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    ) => {
        setIsOpen(false)
    }

    const onDialogOk = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        console.log(date)

        const attendanceData: GetAttendancesListResponse =
            await apiTotalAttendanceList({ query: date })

        console.log(attendanceData)

        const exportData = attendanceData.list.map((attendance) => ({
            date: attendance.date,
            employee: attendance.employeeData.full_name,
            time_in: attendance.time_in_24,
            time_out: attendance.time_out_24,
            break_in: attendance.break_in_24,
            break_out: attendance.break_out_24,
            total_hours: attendance.total_hours || 'N/A',
            status: `${attendance.status_timein} / ${attendance.status_timeout}`,
        }))

        const columns = [
            { header: 'Date', key: 'date' },
            { header: 'Employee', key: 'employee' },
            { header: 'Time In', key: 'time_in' },
            { header: 'Time Out', key: 'time_out' },
            { header: 'Break In', key: 'break_in' },
            { header: 'Break Out', key: 'break_out' },
            { header: 'Total Hours', key: 'total_hours' },
            { header: 'Status (In/Out)', key: 'status' },
        ]

        const ws = XLSX.utils.json_to_sheet(exportData, {
            header: columns.map((col) => col.key),
        })

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance Data')

        XLSX.writeFile(wb, 'attendance_data.xlsx')

        setDate('')

        setIsOpen(false)
    }

    const handleDateChange = (dates: DatePickerRangeValue) => {
        if (dates[0] && dates[1]) {
            setDate(JSON.stringify([dates[0], dates[1]]))
        } else {
            setDate('')
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="default"
                icon={<FaCloudArrowDown className="text-xl" />}
                onClick={openDialog}
            >
                Export Excel
            </Button>
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/attendance-create')}
            >
                Add new
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Download Attendance Data</h5>
                <DatePickerRange
                    placeholder="Select date"
                    onChange={handleDateChange}
                />
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}>
                        Okay
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default AttendanceListActionTools
