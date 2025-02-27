import { CommonProps } from '@/@types/common'
import LayoutBase from '@/components//template/LayoutBase'
import SidePanel from '@/components//template/SidePanel'
import { LAYOUT_BLANK } from '@/constants/theme.constant'

const Blank = ({ children }: CommonProps) => {
    return (
        <LayoutBase
            type={LAYOUT_BLANK}
            className="app-layout-blank flex flex-auto flex-col h-[100vh]"
        >
            <div className="flex min-w-0 w-full flex-1">
                {children}
                <SidePanel className="fixed ltr:right-0 rtl:left-0 top-96 p-3 rounded-none ltr:rounded-tl-lg ltr:rounded-bl-lg rtl:rounded-tr-lg rtl:rounded-br-lg text-white text-xl cursor-pointer select-none bg-primary hover:!bg-primary hover:text-white" />
            </div>
        </LayoutBase>
    )
}

export default Blank
