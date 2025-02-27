import { TbListNumbers } from 'react-icons/tb'
import ToolButton from './ToolButton'
import type { BaseToolButtonProps } from './types'

type ToolButtonOrderedListProp = BaseToolButtonProps

const ToolButtonOrderedList = ({ editor }: ToolButtonOrderedListProp) => {
    return (
        <ToolButton
            title="Ordered List"
            active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
            <TbListNumbers />
        </ToolButton>
    )
}

export default ToolButtonOrderedList
