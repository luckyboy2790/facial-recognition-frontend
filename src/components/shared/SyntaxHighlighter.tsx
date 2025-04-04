import { Prism } from 'react-syntax-highlighter'
import  docco  from 'react-syntax-highlighter/dist/esm/styles/hljs/docco'

import type { SyntaxHighlighterProps as ReactSyntaxHighlighterProps } from 'react-syntax-highlighter'

type SyntaxHighlighterProps = ReactSyntaxHighlighterProps

const SyntaxHighlighter = (props: SyntaxHighlighterProps) => {
    const { children, ...rest } = props

    return (
        <Prism style={docco} {...rest}>
            {children}
        </Prism>
    )
}

export default SyntaxHighlighter
