import { Suspense, useRef, useState } from 'react'
import ProjectDetailsNavigation from './components/ProjectDetailsNavigation'
import useResponsive from '@/utils/hooks/useResponsive'
import { Spinner } from '@/components/ui'
import { ToggleDrawer } from '@/components/shared'
import type { ToggleDrawerRef } from '@/components/shared/ToggleDrawer'
import SystemSetting from './components/SystemSetting'
import AboutContent from './components/About'
import Attributions from './components/Attributions'

const defaultNavValue = 'system'

const Setting = () => {
    const [selectedNav, setSelectedNav] = useState(defaultNavValue)

    const { larger, smaller } = useResponsive()

    const handleNavigationChange = (val: string) => {
        setSelectedNav(val)
    }

    const drawerRef = useRef<ToggleDrawerRef>(null)

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-start gap-2">
                    {smaller.xl && (
                        <ToggleDrawer ref={drawerRef} title="Navigation">
                            <ProjectDetailsNavigation
                                selected={selectedNav}
                                onChange={handleNavigationChange}
                            />
                        </ToggleDrawer>
                    )}
                    <h3>Employee List Report</h3>
                </div>
                <div className="mt-6 flex gap-12">
                    {larger.xl && (
                        <ProjectDetailsNavigation
                            selected={selectedNav}
                            onChange={handleNavigationChange}
                        />
                    )}
                    <div className="w-full">
                        <Suspense
                            fallback={
                                <div className="my-4 mx-auto text-center flex justify-center">
                                    <Spinner size={40} />
                                </div>
                            }
                        >
                            {selectedNav === defaultNavValue && (
                                <SystemSetting />
                            )}
                            {selectedNav === 'about' && <AboutContent />}
                            {selectedNav === 'attributions' && <Attributions />}
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting
