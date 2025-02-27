import { TbQuote } from 'react-icons/tb'
import ToolButton from './ToolButton'
import type { BaseToolButtonProps } from './types'

type ToolButtonBlockquoteProp = BaseToolButtonProps

const ToolButtonBlockquote = ({ editor }: ToolButtonBlockquoteProp) => {
    return (
        <ToolButton
            title="Blockquote"
            active={editor.isActive('blockquote')}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
            <TbQuote />
        </ToolButton>
    )
}

export default ToolButtonBlockquote
