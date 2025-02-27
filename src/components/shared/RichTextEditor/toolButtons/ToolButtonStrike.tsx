import { TbStrikethrough } from 'react-icons/tb'
import ToolButton from './ToolButton'
import type { BaseToolButtonProps } from './types'

type ToolButtonStrikeProp = BaseToolButtonProps

const ToolButtonStrike = ({ editor }: ToolButtonStrikeProp) => {
    return (
        <ToolButton
            title="Strikethrough"
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            onClick={() => editor.chain().focus().toggleStrike().run()}
        >
            <TbStrikethrough />
        </ToolButton>
    )
}

export default ToolButtonStrike
