import classNames from 'classnames'
import Segment from '@/components/ui/Segment'
import { useThemeStore } from '@/store/themeStore'
import {
    LAYOUT_COLLAPSIBLE_SIDE,
    LAYOUT_STACKED_SIDE,
    LAYOUT_TOP_BAR_CLASSIC,
    LAYOUT_FRAMELESS_SIDE,
    LAYOUT_CONTENT_OVERLAY,
    LAYOUT_BLANK,
} from '@/constants/theme.constant'
import CollapsibleSideSvg from '@/assets/svg/CollapsibleSideSvg'
import StackedSideSvg from '@/assets/svg/StackedSideSvg'
import TopBarClassicSvg from '@/assets/svg/TopBarClassicSvg'
import FrameLessSideSvg from '@/assets/svg/FrameLessSideSvg'
import ContentOverlaySvg from '@/assets/svg/ContentOverlaySvg'
import BlankSvg from '@/assets/svg/BlankSvg'
import type { LayoutType } from '@/@types/theme'
import useTranslation from '@/utils/hooks/useTranslation'

const LayoutSwitcher = () => {
    const themeLayout = useThemeStore((state) => state.layout)
    const setLayout = useThemeStore((state) => state.setLayout)

    const { t } = useTranslation()

    const layouts = [
        {
            value: LAYOUT_COLLAPSIBLE_SIDE,
            label: t('page.header.collapsible', 'Collapsible'),
            src: '/img/thumbs/layouts/classic.jpg',
            srcDark: '/img/thumbs/layouts/classic-dark.jpg',
            svg: <CollapsibleSideSvg height={'100%'} width={'100%'} />,
        },
        {
            value: LAYOUT_STACKED_SIDE,
            label: t('page.header.stacked', 'Stacked'),
            src: '/img/thumbs/layouts/modern.jpg',
            srcDark: '/img/thumbs/layouts/modern-dark.jpg',
            svg: <StackedSideSvg height={'100%'} width={'100%'} />,
        },
        {
            value: LAYOUT_TOP_BAR_CLASSIC,
            label: t('page.header.top_bar', 'Top bar'),
            src: '/img/thumbs/layouts/stackedSide.jpg',
            srcDark: '/img/thumbs/layouts/stackedSide-dark.jpg',
            svg: <TopBarClassicSvg height={'100%'} width={'100%'} />,
        },
        {
            value: LAYOUT_FRAMELESS_SIDE,
            label: t('page.header.frameless', 'Frameless'),
            src: '/img/thumbs/layouts/simple.jpg',
            srcDark: '/img/thumbs/layouts/simple-dark.jpg',
            svg: <FrameLessSideSvg height={'100%'} width={'100%'} />,
        },
        {
            value: LAYOUT_CONTENT_OVERLAY,
            label: t('page.header.overlay', 'Overlay'),
            src: '/img/thumbs/layouts/decked.jpg',
            srcDark: '/img/thumbs/layouts/decked-dark.jpg',
            svg: <ContentOverlaySvg height={'100%'} width={'100%'} />,
        },
    ]

    return (
        <div>
            <Segment
                className="w-full bg-transparent dark:bg-transparent p-0"
                value={[]}
                onChange={(val) => setLayout(val as LayoutType)}
            >
                <div className="grid grid-cols-3 gap-4 w-full">
                    {layouts.map((layout) => (
                        <Segment.Item key={layout.value} value={layout.value}>
                            {({ onSegmentItemClick }) => {
                                const active = themeLayout.type === layout.value
                                return (
                                    <div className="text-center">
                                        <button
                                            className={classNames(
                                                'border-2 rounded-xl overflow-hidden',
                                                active
                                                    ? 'border-primary dark:border-primary'
                                                    : 'border-gray-200 dark:border-gray-700',
                                            )}
                                            onClick={onSegmentItemClick}
                                        >
                                            {layout.svg}
                                        </button>
                                        <div className="mt-2 font-semibold">
                                            {layout.label}
                                        </div>
                                    </div>
                                )
                            }}
                        </Segment.Item>
                    ))}
                </div>
            </Segment>
        </div>
    )
}

export default LayoutSwitcher
