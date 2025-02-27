import { CgRedo } from 'react-icons/cg'
import ToolButton from './ToolButton'
import type { BaseToolButtonProps } from './types'

type ToolButtonRedoProp = BaseToolButtonProps

const ToolButtonRedo = ({ editor }: ToolButtonRedoProp) => {
    return (
        <ToolButton
            title="Code"
            disabled={!editor.can().chain().focus().redo().run()}
            onClick={() => editor.chain().focus().redo().run()}
        >
            <CgRedo />
        </ToolButton>
    )
}

export default ToolButtonRedo
