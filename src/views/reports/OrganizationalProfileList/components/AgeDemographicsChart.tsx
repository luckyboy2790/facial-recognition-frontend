import { Chart } from '@/components/shared'
import { COLORS } from '@/constants/chart.constant'
import useTranslation from '@/utils/hooks/useTranslation'

interface AgeDemographicsProps {
    ageChartData: {
        labels: string[]
        series: number[]
    }
}

const AgeDemographics = ({ ageChartData }: AgeDemographicsProps) => {
    const { t } = useTranslation()
    return (
        <div className="flex flex-col justify-between">
            <div>{t('page.report.age_demographics', 'Age Demographics')}</div>
            <Chart
                type="radar"
                customOptions={{
                    xaxis: {
                        categories: ageChartData.labels,
                    },
                    yaxis: {
                        show: false,
                    },
                    tooltip: {
                        custom: function ({ dataPointIndex }) {
                            return `
                                <div class="py-2 px-4 rounded-xl">
                                    <div class="flex items-center gap-2">
                                        <div class="h-[10px] w-[10px] rounded-full" style="background-color: ${COLORS[0]}"></div>
                                        <div class="flex gap-2">${ageChartData.labels[dataPointIndex]}:
                                            <span class="font-bold">${ageChartData.series[dataPointIndex]}</span>
                                        </div>
                                    </div>
                                </div>
                            `
                        },
                    },
                }}
                series={[
                    {
                        name: 'Age Group Count',
                        data: ageChartData.series,
                    },
                ]}
            />
        </div>
    )
}

export default AgeDemographics
