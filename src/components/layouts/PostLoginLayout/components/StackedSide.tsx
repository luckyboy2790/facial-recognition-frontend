import StackedSideNav from '@/components/template/StackedSideNav'
import Header from '@/components/template/Header'
import MobileNav from '@/components/template/MobileNav'
import Search from '@/components/template/Search'
import LanguageSelector from '@/components/template/LanguageSelector'
import Notification from '@/components/template/Notification'
import UserProfileDropdown from '@/components//template/UserProfileDropdown'
import SidePanel from '@/components//template/SidePanel'
import LayoutBase from '@/components//template/LayoutBase'
import useResponsive from '@/utils/hooks/useResponsive'
import { LAYOUT_STACKED_SIDE } from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import QuickAccessDropdown from '@/components/template/QuickAccessDropdown'

const StackedSide = ({ children }: CommonProps) => {
    const { larger, smaller } = useResponsive()

    return (
        <LayoutBase
            type={LAYOUT_STACKED_SIDE}
            className="app-layout-stacked-side flex flex-auto flex-col"
        >
            <div className="flex flex-auto min-w-0">
                {larger.lg && location.pathname !== '/clock' && (
                    <StackedSideNav />
                )}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    {location.pathname !== '/clock' && (
                        <Header
                            className="shadow dark:shadow-2xl"
                            headerStart={<>{smaller.lg && <MobileNav />}</>}
                            headerEnd={
                                <>
                                    <LanguageSelector />
                                    <SidePanel />
                                    <QuickAccessDropdown />
                                    <UserProfileDropdown hoverable={false} />
                                </>
                            }
                        />
                    )}
                    {location.pathname === '/clock' && (
                        <SidePanel className="z-10 fixed ltr:right-0 rtl:left-0 top-96 p-3 rounded-none ltr:rounded-tl-lg ltr:rounded-bl-lg rtl:rounded-tr-lg rtl:rounded-br-lg text-white text-xl cursor-pointer select-none bg-primary hover:!bg-primary hover:text-white" />
                    )}
                    <div className="h-full flex flex-auto flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </LayoutBase>
    )
}

export default StackedSide
