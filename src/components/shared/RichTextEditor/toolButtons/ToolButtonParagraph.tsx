import { BiParagraph } from 'react-icons/bi'
import ToolButton from './ToolButton'
import type { BaseToolButtonProps } from './types'

type ToolButtonParagraphProp = BaseToolButtonProps

const ToolButtonParagraph = ({ editor }: ToolButtonParagraphProp) => {
    return (
        <ToolButton
            title="Paragraph"
            active={editor.isActive('paragraph')}
            onClick={() => editor.chain().focus().setParagraph().run()}
        >
            <BiParagraph />
        </ToolButton>
    )
}

export default ToolButtonParagraph
