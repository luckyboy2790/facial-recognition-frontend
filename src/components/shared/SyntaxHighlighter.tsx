import { Prism } from 'react-syntax-highlighter'
<<<<<<< HEAD
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
=======
import  docco  from 'react-syntax-highlighter/dist/esm/styles/hljs/docco'

>>>>>>> 348bafa (fix: update)
import type { SyntaxHighlighterProps as ReactSyntaxHighlighterProps } from 'react-syntax-highlighter'

type SyntaxHighlighterProps = ReactSyntaxHighlighterProps

const SyntaxHighlighter = (props: SyntaxHighlighterProps) => {
    const { children, ...rest } = props

    return (
<<<<<<< HEAD
        <Prism style={oneDark} {...rest}>
=======
        <Prism style={docco} {...rest}>
>>>>>>> 348bafa (fix: update)
            {children}
        </Prism>
    )
}

export default SyntaxHighlighter
