import { AdaptiveCard } from '@/components/shared'
import AboutFeatures from './AboutFeatures'

const AboutContent = () => {
    return (
        <div className="flex flex-col gap-4">
            <h5>Workday a time clock application for employees</h5>
            <AdaptiveCard>
                <div className="flex flex-col gap-10">
                    <AboutFeatures />
                </div>
            </AdaptiveCard>
        </div>
    )
}

export default AboutContent
