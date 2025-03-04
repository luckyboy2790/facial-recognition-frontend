import { Container, StickyFooter } from '@/components/shared'
import LocalizationSetting from './LocalizationSetting'
import OptionalFeatures from './OptionalFeatures'
import SafeguardingSetting from './SafeguardingSetting'
import { Button } from '@/components/ui'
import { TbArrowNarrowLeft } from 'react-icons/tb'

const SystemSetting = () => {
    return (
        <>
            <div className="flex flex-col gap-8">
                <LocalizationSetting />
                <OptionalFeatures />
                <SafeguardingSetting />
            </div>
            <StickyFooter
                className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                stickyClass="px-6 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
                defaultClass="px-6 rounded-xl border border-gray-200 dark:border-gray-600 mt-4"
            >
                <Container>
                    <div className="flex items-center justify-between">
                        <Button
                            className="ltr:mr-3 rtl:ml-3"
                            type="button"
                            variant="plain"
                            icon={<TbArrowNarrowLeft />}
                        >
                            Back
                        </Button>

                        <Button variant="solid" type="submit">
                            Save
                        </Button>
                    </div>
                </Container>
            </StickyFooter>
        </>
    )
}

export default SystemSetting
