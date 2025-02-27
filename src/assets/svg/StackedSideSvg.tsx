const StackedSideSvg = ({
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
            <mask id="a" className="fill-white dark:fill-gray-800 ">
                <path d="M0 20C0 8.954 8.954 0 20 0h44v500H20c-11.046 0-20-8.954-20-20V20Z" />
            </mask>
            <path
                className="fill-white dark:fill-gray-800 "
                d="M0 20C0 8.954 8.954 0 20 0h44v500H20c-11.046 0-20-8.954-20-20V20Z"
            />
            <path
                className="fill-gray-200 dark:fill-gray-600"
                d="M0 0h64H0Zm64 500H0h64Zm-64 0V0v500ZM65 0v500h-2V0h2Z"
                mask="url(#a)"
            />
            <circle
                cx={32}
                cy={37}
                r={17}
                className="fill-gray-200 dark:fill-gray-600"
            />
            <rect
                width={34}
                height={33}
                x={15}
                y={84}
                className="fill-primary-subtle"
                rx={6}
            />
            <rect
                width={13}
                height={13}
                x={25.5}
                y={94}
                className="fill-primary"
                rx={6}
            />
            <rect
                width={17}
                height={17}
                x={23.5}
                y={127}
                className="fill-gray-200 dark:fill-gray-600"
                rx={8.5}
            />
            <rect
                width={17}
                height={17}
                x={23.5}
                y={164}
                className="fill-gray-200 dark:fill-gray-600"
                rx={8.5}
            />
            <rect
                width={17}
                height={17}
                x={23.5}
                y={201}
                className="fill-gray-200 dark:fill-gray-600"
                rx={8.5}
            />
            <mask id="b" className="fill-white dark:fill-gray-800 ">
                <path d="M64 0h149v500H64V0Z" />
            </mask>
            <path
                className="fill-gray-200 dark:fill-gray-600"
                d="M211 0v500h4V0h-4Z"
                mask="url(#b)"
            />
            <rect
                width={119}
                height={33}
                x={79}
                y={20}
                className="fill-primary-subtle"
                rx={6}
            />
            <rect
                width={69}
                height={13}
                x={85}
                y={30}
                className="fill-primary"
                rx={6}
            />
            <rect
                width={119}
                height={13}
                x={79}
                y={63}
                className="fill-gray-200 dark:fill-gray-600"
                rx={6}
            />
            <rect
                width={75}
                height={13}
                x={79}
                y={96}
                className="fill-gray-200 dark:fill-gray-600"
                rx={6}
            />
            <rect
                width={119}
                height={13}
                x={79}
                y={129}
                className="fill-gray-200 dark:fill-gray-600"
                rx={6}
            />
            <path
                className="fill-gray-100 dark:fill-gray-950"
                d="M213 0h287v500H213z"
            />
            <mask id="c" className="fill-white dark:fill-gray-800 ">
                <path d="M213 0h267c11.046 0 20 8.954 20 20v58H213V0Z" />
            </mask>
            <path
                className="fill-white dark:fill-gray-800 "
                d="M213 0h267c11.046 0 20 8.954 20 20v58H213V0Z"
            />
            <path
                className="fill-gray-200 dark:fill-gray-600"
                d="M213 0h287-287Zm287 79H213v-2h287v2Zm-287-1V0v78ZM500 0v78V0Z"
                mask="url(#c)"
            />
            <rect
                width={247}
                height={382}
                x={233}
                y={98}
                className="fill-white dark:fill-gray-800 "
                rx={20}
            />
        </svg>
    )
}

export default StackedSideSvg
