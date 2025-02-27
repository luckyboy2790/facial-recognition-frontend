const CollapsibleSideSvg = ({
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
                <path d="M0 20C0 8.954 8.954 0 20 0h172v500H20c-11.046 0-20-8.954-20-20V20Z" />
            </mask>
            <path
                className="fill-white dark:fill-gray-800 "
                d="M0 20C0 8.954 8.954 0 20 0h172v500H20c-11.046 0-20-8.954-20-20V20Z"
            />
            <path
                className="fill-gray-200 dark:fill-gray-600"
                d="M0 0h192H0Zm192 500H0h192ZM0 500V0v500ZM194 0v500h-4V0h4Z"
                mask="url(#a)"
            />
            <circle
                cx={47.5}
                cy={47.5}
                r={27.5}
                className="fill-gray-200 dark:fill-gray-600"
            />
            <rect
                width={152}
                height={33}
                x={20}
                y={105}
                className="fill-primary-subtle"
                rx={6}
            />
            <rect
                width={69}
                height={13}
                x={26}
                y={115}
                className="fill-primary"
                rx={6}
            />
            <rect
                width={125}
                height={13}
                x={20}
                y={148}
                className="fill-gray-200 dark:fill-gray-600"
                rx={6}
            />
            <rect
                width={75}
                height={13}
                x={20}
                y={181}
                className="fill-gray-200 dark:fill-gray-600"
                rx={6}
            />
            <rect
                width={125}
                height={13}
                x={20}
                y={214}
                className="fill-gray-200 dark:fill-gray-600"
                rx={6}
            />
            <path
                className="fill-gray-100 dark:fill-gray-950"
                d="M192 0h308v500H192z"
            />
            <mask id="b" className="fill-white dark:fill-gray-800 ">
                <path d="M192 0h288c11.046 0 20 8.954 20 20v58H192V0Z" />
            </mask>
            <path
                className="fill-white dark:fill-gray-800 "
                d="M192 0h288c11.046 0 20 8.954 20 20v58H192V0Z"
            />
            <path
                className="fill-gray-200 dark:fill-gray-600"
                d="M192 0h308-308Zm308 79H192v-2h308v2Zm-308-1V0v78ZM500 0v78V0Z"
                mask="url(#b)"
            />
            <rect
                width={268}
                height={382}
                x={212}
                y={98}
                className="fill-white dark:fill-gray-800 "
                rx={20}
            />
        </svg>
    )
}

export default CollapsibleSideSvg
