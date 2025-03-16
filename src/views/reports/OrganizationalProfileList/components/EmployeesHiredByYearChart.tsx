import Chart from 'react-apexcharts'
import { COLOR_1 } from '@/constants/chart.constant'

const EmployeesHiredByYear = ({
    hiredByYearChartData,
}: {
    hiredByYearChartData: {
        labels: string[]
        series: number[]
    }
}) => {
    return (
        <Chart
            options={{
                chart: {
                    zoom: {
                        enabled: false,
                    },
                },
                colors: [COLOR_1],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 80, 100],
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 3,
                },
                labels: hiredByYearChartData.labels,
                xaxis: {
                    type: 'category',
                },
                yaxis: {
                    opposite: true,
                },
                legend: {
                    horizontalAlign: 'left',
                },
            }}
            type="area"
            series={[
                {
                    name: 'Employees Hired',
                    data: hiredByYearChartData.series,
                },
            ]}
            height={300}
        />
    )
}

export default EmployeesHiredByYear
