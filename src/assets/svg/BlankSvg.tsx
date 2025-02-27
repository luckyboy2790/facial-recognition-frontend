const BlankSvg = ({
    height = 100,
    width = 100,
}: {
    height?: number | string
    width?: number | string
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500" // Adjusted viewBox
            width={width}
            height={height}
            fill="none"
        >
            <rect
                width={500}
                height={500}
                className="fill-white dark:fill-gray-800 "
                rx={20}
            />
            <path
                className="fill-gray-100 dark:fill-gray-950"
                d="M0 0h500v500H0z"
            />
            <rect
                width={460}
                height={460}
                x={20}
                y={20}
                className="fill-white dark:fill-gray-800 "
                rx={20}
            />
        </svg>
    )
}

export default BlankSvg
