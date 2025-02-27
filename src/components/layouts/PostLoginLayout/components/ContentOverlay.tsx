import Header from '@/components/template/Header'
import SidePanel from '@/components/template/SidePanel'
import UserProfileDropdown from '@/components//template/UserProfileDropdown'
import LanguageSelector from '@/components/template/LanguageSelector'
import Notification from '@/components/template/Notification'
import HeaderLogo from '@/components/template/HeaderLogo'
import Search from '@/components/template/Search'
import MobileNav from '@/components/template/MobileNav'
import HorizontalNav from '@/components/template/HorizontalNav'
import LayoutBase from '@/components//template/LayoutBase'
import classNames from '@/utils/classNames'
import useScrollTop from '@/utils/hooks/useScrollTop'
import useResponsive from '@/utils/hooks/useResponsive'
import { LAYOUT_CONTENT_OVERLAY } from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import type { FooterPageContainerType } from '@/components/template/Footer'
import QuickAccessDropdown from '@/components/template/QuickAccessDropdown'

const ContentOverlay = ({ children }: CommonProps) => {
    const { isSticky } = useScrollTop()

    const { larger, smaller } = useResponsive()

    return (
        <LayoutBase
            type={LAYOUT_CONTENT_OVERLAY}
            className="app-layout-content-overlay flex flex-auto flex-col min-h-screen"
            pageContainerReassemble={({
                children,
                defaultClass,
                header,
                pageBackgroundType,
                pageContainerType,
                pageContainerGutterClass,
                footer,
                PageContainerHeader,
                PageContainerBody,
                PageContainerFooter,
            }) => (
                <>
                    <div
                        className={classNames(
                            defaultClass,
                            'sm:px-0 px-4',
                            header?.title ? '-mt-60' : '-mt-60 sm:-mt-40',
                        )}
                    >
                        <main className="h-full">
                            <div className="dark container mx-auto relative">
                                <PageContainerHeader
                                    {...header}
                                    className="mb-20"
                                    customeHeader={() => (
                                        <>
                                            {header?.title &&
                                                typeof header?.title ===
                                                    'string' && (
                                                    <h2 className="mb-2">
                                                        {header.title}
                                                    </h2>
                                                )}
                                            {header?.description && (
                                                <p className="text-base text-white opacity-60">
                                                    {header.description}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                            <PageContainerBody pageContainerType={'contained'}>
                                {pageBackgroundType === 'plain' ? (
                                    <div
                                        className={classNames(
                                            'bg-white dark:bg-gray-900 rounded-2xl',
                                            pageContainerGutterClass,
                                        )}
                                    >
                                        {children}
                                    </div>
                                ) : (
                                    children
                                )}
                                <PageContainerFooter
                                    className="-mb-40 mt-4 md:px-0"
                                    footer={footer}
                                    pageContainerType={
                                        pageContainerType as FooterPageContainerType
                                    }
                                />
                            </PageContainerBody>
                        </main>
                    </div>
                </>
            )}
        >
            <div className="flex flex-auto min-w-0">
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        container
                        className={classNames(
                            'fixed',
                            isSticky
                                ? 'shadow dark:shadow-2xl'
                                : 'bg-transparent dark',
                        )}
                        wrapperClass="px-0"
                        headerStart={
                            <>
                                {smaller.lg && <MobileNav />}
                                <HeaderLogo
                                    {...(!isSticky ? { mode: 'dark' } : {})}
                                />
                            </>
                        }
                        headerMiddle={<>{larger.lg && <HorizontalNav />}</>}
                        headerEnd={
                            <>
                                <LanguageSelector />
                                <SidePanel />
                                <QuickAccessDropdown />
                                <UserProfileDropdown hoverable={false} />
                            </>
                        }
                    />
                    <div className="h-[400px] bg-[linear-gradient(220deg,_rgb(9,_12,_17)_10%,_#15122f_35%,_#2b1e38_55%,_#0c2239_70%,_rgb(9,_12,_17)_90%)]">
                        <div className="container mx-auto h-full"></div>
                    </div>
                    {children}
                </div>
            </div>
        </LayoutBase>
    )
}

export default ContentOverlay
