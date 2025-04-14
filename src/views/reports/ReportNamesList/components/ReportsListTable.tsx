import { useMemo } from 'react'
import ReportTable from '@/components/shared/ReportTable'
import { Link } from 'react-router-dom'
import type { ColumnDef } from '@/components/shared/DataTable'
import type { Report } from '../types'
import { TbUserSquare } from 'react-icons/tb'
import {
    FaChartPie,
    FaRegCalendarAlt,
    FaUsers,
    FaCalendarPlus,
    FaBirthdayCake,
    FaClock,
} from 'react-icons/fa'
import useTranslation from '@/utils/hooks/useTranslation'

const CustomerListTable = () => {
    const { t } = useTranslation()

    const NameColumn = ({ row }: { row: Report }) => {
        return (
            <div className="flex items-center">
                {row.icon}
                <Link
                    className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                    to={`/reports/${row.id}`}
                >
                    {(() => {
                        switch (row.reportName) {
                            case 'Employee Attendance Report':
                                return (
                                    <span>
                                        {t(
                                            'page.report.employee_attendance_report',
                                            'Employee Attendance Report',
                                        )}
                                    </span>
                                )
                            case 'Employee Birthdays':
                                return (
                                    <span>
                                        {t(
                                            'page.report.employee_birthday',
                                            'Employee Birthdays',
                                        )}
                                    </span>
                                )

                            case 'Employee Leave Report':
                                return (
                                    <span>
                                        {t(
                                            'page.report.employee_leave_report',
                                            'Employee Leave Report',
                                        )}
                                    </span>
                                )

                            case 'Employee List Report':
                                return (
                                    <span>
                                        {t(
                                            'page.report.employee_list_report',
                                            'Employee List Report',
                                        )}
                                    </span>
                                )

                            case 'Employee Schedule Report':
                                return (
                                    <span>
                                        {t(
                                            'page.report.employee_schedule_report',
                                            'Employee Schedule Report',
                                        )}
                                    </span>
                                )

                            case 'Organizational Profile':
                                return (
                                    <span>
                                        {t(
                                            'page.report.organizational_profile',
                                            'Organizational Profile',
                                        )}
                                    </span>
                                )

                            case 'User Accounts Report':
                                return (
                                    <span>
                                        {t(
                                            'page.report.user_account_report',
                                            'User Accounts Report',
                                        )}
                                    </span>
                                )
                            default:
                                return row.reportName
                        }
                    })()}
                </Link>
            </div>
        )
    }

    const columns: ColumnDef<Report>[] = useMemo(
        () => [
            {
                header: t('page.report.report_name', 'Report name'),
                accessorKey: 'reportName',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
        ],
        [t],
    )

    const customerList = [
        {
            id: 'employee-attendance',
            icon: <FaClock />,
            reportName: 'Employee Attendance Report',
            lastViewed: 'Mar, 02 2025',
        },
        {
            id: 'employee-birthdays',
            icon: <FaBirthdayCake />,
            reportName: 'Employee Birthdays',
            lastViewed: 'Mar, 02 2025',
        },
        {
            id: 'employee-leaves',
            icon: <FaCalendarPlus />,
            reportName: 'Employee Leave Report',
            lastViewed: 'Mar, 02 2025',
        },
        {
            id: 'employee-list',
            icon: <FaUsers />,
            reportName: 'Employee List Report',
            lastViewed: 'Mar, 02 2025',
        },
        {
            id: 'employee-schedule',
            icon: <FaRegCalendarAlt />,
            reportName: 'Employee Schedule Report',
            lastViewed: 'Mar, 02 2025',
        },
        {
            id: 'organization-profile',
            icon: <FaChartPie />,
            reportName: 'Organizational Profile',
            lastViewed: 'Mar, 02 2025',
        },
        {
            id: 'user-accounts',
            icon: <TbUserSquare />,
            reportName: 'User Accounts Report',
            lastViewed: 'Mar, 02 2025',
        },
    ]

    return (
        <ReportTable
            selectable
            columns={columns}
            data={customerList}
            noData={customerList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
        />
    )
}

export default CustomerListTable
