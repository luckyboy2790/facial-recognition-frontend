import { TbBold } from 'react-icons/tb'
import ToolButton from './ToolButton'
import type { ToolButtonProps } from './ToolButton'
import type { BaseToolButtonProps } from './types'

type ToolButtonBoldProp = BaseToolButtonProps & ToolButtonProps

const ToolButtonBold = ({ editor, ...rest }: ToolButtonBoldProp) => {
    return (
        <ToolButton
            title="Bold"
            disabled={!editor.can().chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
            {...rest}
        >
            <TbBold />
        </ToolButton>
    )
}

export default ToolButtonBold
