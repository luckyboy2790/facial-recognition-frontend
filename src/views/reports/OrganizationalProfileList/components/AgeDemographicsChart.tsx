import { Chart } from '@/components/shared'
import { COLORS } from '@/constants/chart.constant'

interface LeadPerformanceData {
    categories: string[]
    series: number[]
}

const data: LeadPerformanceData = {
    categories: [
        'Headcount1',
        'Headcount2',
        'Headcount3',
        'Headcount4',
        'Headcount5',
    ],
    series: [1, 4, 2, 0, 3],
}

const AgeDemographics = () => {
    return (
        <div className="flex flex-col justify-between">
            <div>Company Population</div>
            <Chart
                type="radar"
                customOptions={{
                    xaxis: {
                        categories: data.categories,
                        labels: {
                            formatter: (val) => {
                                return `${data.categories.indexOf(val) + 1}`
                            },
                        },
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
                                            <div class="flex gap-2">${data.categories[dataPointIndex]}: <span class="font-bold">${data.series[dataPointIndex]}</span></div>
                                        </div>
                                    </div>
                                `
                        },
                    },
                }}
                series={[
                    {
                        name: 'Lead performance score',
                        data: data.series,
                    },
                ]}
            />
        </div>
    )
}

export default AgeDemographics
