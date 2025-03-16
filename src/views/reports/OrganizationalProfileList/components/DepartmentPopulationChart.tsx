import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const DepartmentPopulation = ({
    departmentChartData,
}: {
    departmentChartData: {
        labels: string[]
        series: number[]
    }
}) => {
    return (
        <div className="flex flex-col justify-between">
            <div>Department Population</div>
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
