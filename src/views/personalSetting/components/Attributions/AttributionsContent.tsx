import { AdaptiveCard } from '@/components/shared'
import AttributionCard from './AttributionCard'

type AttributionCardProps = {
    title: string
    copyright: string
}

const attributionData: AttributionCardProps[] = [
    {
        title: 'Laravel',
        copyright: 'Copyright (c) Taylor Otwell',
    },
    {
        title: 'Bootstrap',
        copyright: 'Copyright 2011-2020 Twitter, Inc.',
    },
    {
        title: 'Semantic UI',
        copyright: 'Copyright (c) 2015 Semantic Org',
    },
    {
        title: 'jQuery JavaScript Library',
        copyright: 'Copyright jQuery Foundation and other contributors',
    },
    {
        title: 'DataTables',
        copyright: 'Copyright 2008-2020 SpryMedia Ltd',
    },
    {
        title: 'Chart.js',
        copyright: 'Copyright 201 Chart.js Contributors',
    },
    {
        title: 'Moment.js',
        copyright: 'Copyright (c) JS Foundation and other contributors',
    },
    {
        title: 'Air Datepicker',
        copyright: 'Copyright (c) 2016 Timofey Marochkin',
    },
    {
        title: 'MDTimePicker',
        copyright: 'Copyright (c) 2017 Dionlee Uy',
    },
]

const AttributionsContent = () => {
    return (
        <div className="flex flex-col gap-4">
            <h5>Legal Notice</h5>
            <p>Copyright (c) 2020 Brian Luna. All rights reserved.</p>
            <AdaptiveCard>
                <div className="flex flex-col gap-8 py-4">
                    {attributionData.map((item, index) => (
                        <AttributionCard
                            key={index}
                            title={item.title}
                            copyright={item.copyright}
                        />
                    ))}
                </div>
            </AdaptiveCard>
        </div>
    )
}

export default AttributionsContent
