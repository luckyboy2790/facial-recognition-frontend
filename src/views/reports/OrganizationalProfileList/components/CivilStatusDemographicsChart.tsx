import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
import useTranslation from '@/utils/hooks/useTranslation'

const CivilStatusDemographics = ({
    civilStatusChartData,
}: {
    civilStatusChartData: {
        labels: string[]
        series: number[]
    }
}) => {
    const { t } = useTranslation()

    return (
        <>
            <div>
                {t(
                    'page.report.civil_status_demographics',
                    'Civil Status Demographics',
                )}
            </div>
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
