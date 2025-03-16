import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const CivilStatusDemographics = ({
    civilStatusChartData,
}: {
    civilStatusChartData: {
        labels: string[]
        series: number[]
    }
}) => {
    return (
        <>
            <div>Civil Status Demographics</div>
            <Chart
                options={{
                    colors: COLORS,
                    labels: civilStatusChartData.labels,
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
                series={civilStatusChartData.series}
                height={300}
                type="donut"
            />
        </>
    )
}

export default CivilStatusDemographics
