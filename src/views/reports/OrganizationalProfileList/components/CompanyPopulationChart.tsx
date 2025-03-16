import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const CompanyPopulation = ({
    companyChartData,
}: {
    companyChartData: {
        labels: string[]
        series: number[]
    }
}) => {
    return (
        <div className="flex flex-col justify-between">
            <div>Company Population</div>
            <Chart
                options={{
                    colors: COLORS,
                    labels: companyChartData.labels,
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
                series={companyChartData.series}
                height={300}
                type="pie"
            />
        </div>
    )
}

export default CompanyPopulation
