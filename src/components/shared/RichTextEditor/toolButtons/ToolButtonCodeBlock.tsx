import { TbCodeDots } from 'react-icons/tb'
import ToolButton from './ToolButton'
import type { BaseToolButtonProps } from './types'

type ToolButtonCodeBlockProp = BaseToolButtonProps

const ToolButtonCodeBlock = ({ editor }: ToolButtonCodeBlockProp) => {
    return (
        <ToolButton
            title="Code Block"
            active={editor.isActive('codeBlock')}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
            <TbCodeDots />
        </ToolButton>
    )
}

export default ToolButtonCodeBlock
