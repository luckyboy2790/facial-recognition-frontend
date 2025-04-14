import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
import useTranslation from '@/utils/hooks/useTranslation'

const DepartmentPopulation = ({
    departmentChartData,
}: {
    departmentChartData: {
        labels: string[]
        series: number[]
    }
}) => {
    const { t } = useTranslation()
    return (
        <div className="flex flex-col justify-between">
            <div>
                {t(
                    'page.report.department_population',
                    'Department Population',
                )}
            </div>
            <Chart
                options={{
                    colors: COLORS,
                    labels: departmentChartData.labels,
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                }}
                series={departmentChartData.series}
                height={300}
                type="pie"
            />
        </div>
    )
}

export default DepartmentPopulation
