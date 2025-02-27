import { TbMinus } from 'react-icons/tb'
import ToolButton from './ToolButton'
import type { BaseToolButtonProps } from './types'

type ToolButtonHorizontalRuleProp = BaseToolButtonProps

const ToolButtonHorizontalRule = ({ editor }: ToolButtonHorizontalRuleProp) => {
    return (
        <ToolButton
            title="Horizontal Rule"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
            <TbMinus />
        </ToolButton>
    )
}

export default ToolButtonHorizontalRule
