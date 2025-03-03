import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const CompanyPopulation = () => {
    return (
        <div className="flex flex-col justify-between">
            <div>Company Population</div>
            <Chart
                options={{
                    colors: COLORS,
                    labels: [
                        'Team A',
                        'Team B',
                        'Team C',
                        'Team D',
                        'Team E',
                        'Team F',
                        'Team G',
                    ],
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
                series={[44, 55, 13, 43, 22, 60, 80]}
                height={300}
                type="pie"
            />
        </div>
    )
}

export default CompanyPopulation
