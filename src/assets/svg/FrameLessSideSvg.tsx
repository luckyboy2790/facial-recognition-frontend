const FrameLessSideSvg = ({
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
                className="fill-gray-100 dark:fill-gray-950"
                rx={20}
            />
            <circle
                cx={47.5}
                cy={47.5}
                r={27.5}
                className="fill-gray-300 dark:fill-gray-700"
            />
            <path
                className="fill-primary"
                d="M20 111a6 6 0 0 1 6-6h63a6 6 0 0 1 6 6v1a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6v-1Z"
            />
            <rect
                width={125}
                height={13}
                x={20}
                y={138}
                className="fill-gray-300 dark:fill-gray-700"
                rx={6}
            />
            <rect
                width={75}
                height={13}
                x={20}
                y={171}
                className="fill-gray-300 dark:fill-gray-700"
                rx={6}
            />
            <rect
                width={125}
                height={13}
                x={20}
                y={204}
                className="fill-gray-300 dark:fill-gray-700"
                rx={6}
            />
            <rect
                width={336}
                height={500}
                x={164}
                className="fill-gray-100 dark:fill-gray-950"
                rx={20}
            />
            <rect
                width={296}
                height={460}
                x={184}
                y={20}
                className="fill-white dark:fill-gray-800 "
                rx={20}
            />
        </svg>
    )
}

export default FrameLessSideSvg
