import { TbSpacingVertical } from 'react-icons/tb'
import ToolButton from './ToolButton'
import type { BaseToolButtonProps } from './types'

type ToolButtonHardBreakProp = BaseToolButtonProps

const ToolButtonHardBreak = ({ editor }: ToolButtonHardBreakProp) => {
    return (
        <ToolButton
            title="Horizontal Rule"
            onClick={() => editor.chain().focus().setHardBreak().run()}
        >
            <TbSpacingVertical />
        </ToolButton>
    )
}

export default ToolButtonHardBreak
