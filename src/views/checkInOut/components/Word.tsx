import classNames from 'classnames'

type WordProps = {
    value: string
    hidden: boolean
}

export const Word = ({ value, hidden = false }: WordProps) => {
    return (
        <div className="digital">
            <p>{value}</p>
            <p className={classNames(hidden ? 'invisible' : 'visible')}>
                {value}
            </p>
        </div>
    )
}
