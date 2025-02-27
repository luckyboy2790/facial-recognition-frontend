import classNames from '@/utils/classNames'
import useLayout from '@/utils/hooks/useLayout'
import type { CommonProps } from '@/@types/common'
import { LAYOUT_CONTENT_OVERLAY } from '@/constants/theme.constant'

export interface BottomStickyBarProps extends CommonProps {}

const BottomStickyBar = ({ children }: BottomStickyBarProps) => {
    const { type } = useLayout()

    return (
        <div
            className={classNames(
                'bottom-0 left-0 right-0 z-10 mt-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 -mx-4 sm:-mx-8 py-4',
                type === LAYOUT_CONTENT_OVERLAY ? 'fixed' : 'sticky',
            )}
        >
            {children}
        </div>
    )
}

export default BottomStickyBar
