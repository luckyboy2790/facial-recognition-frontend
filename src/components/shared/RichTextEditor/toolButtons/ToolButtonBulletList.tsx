import { TbList } from 'react-icons/tb'
import ToolButton from './ToolButton'
import type { BaseToolButtonProps } from './types'

type ToolButtonBulletListProp = BaseToolButtonProps

const ToolButtonBulletList = ({ editor }: ToolButtonBulletListProp) => {
    return (
        <ToolButton
            title="Bullet List"
            active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
            <TbList />
        </ToolButton>
    )
}

export default ToolButtonBulletList
