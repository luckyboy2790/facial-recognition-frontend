import { Suspense, useRef, useState } from 'react'
import ProjectDetailsNavigation from './components/ProjectDetailsNavigation'
import useResponsive from '@/utils/hooks/useResponsive'
import { Spinner } from '@/components/ui'
import { ToggleDrawer } from '@/components/shared'
import type { ToggleDrawerRef } from '@/components/shared/ToggleDrawer'
import SystemSetting from './components/UserInfo'
import AboutContent from './components/ChangePassword'

const defaultNavValue = 'userInfo'

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
                <div className="flex justify-start gap-2 items-center">
                    {smaller.xl && (
                        <ToggleDrawer ref={drawerRef} title="Navigation">
                            <ProjectDetailsNavigation
                                selected={selectedNav}
                                onChange={handleNavigationChange}
                            />
                        </ToggleDrawer>
                    )}
                    <h3>Setting</h3>
                </div>
                <div className="flex gap-12 mt-6">
                    {larger.xl && (
                        <ProjectDetailsNavigation
                            selected={selectedNav}
                            onChange={handleNavigationChange}
                        />
                    )}
                    <div className="w-full">
                        <Suspense
                            fallback={
                                <div className="flex justify-center text-center mx-auto my-4">
                                    <Spinner size={40} />
                                </div>
                            }
                        >
                            {selectedNav === defaultNavValue && (
                                <SystemSetting />
                            )}
                            {selectedNav === 'changePassword' && (
                                <AboutContent />
                            )}
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting
