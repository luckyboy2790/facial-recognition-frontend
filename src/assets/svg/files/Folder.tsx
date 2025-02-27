const Folder = ({
    height = 100,
    width = 100,
}: {
    height?: number
    width?: number
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            width={width}
            height={height}
        >
            <path
                fill="#FFA000"
                d="M853.333 256h-384L384 170.667H170.667c-46.934 0-85.334 38.4-85.334 85.333v170.667h853.334v-85.334c0-46.933-38.4-85.333-85.334-85.333z"
            ></path>
            <path
                fill="#FFCA28"
                d="M853.333 256H170.667c-46.934 0-85.334 38.4-85.334 85.333V768c0 46.933 38.4 85.333 85.334 85.333h682.666c46.934 0 85.334-38.4 85.334-85.333V341.333c0-46.933-38.4-85.333-85.334-85.333z"
            ></path>
        </svg>
    )
}

export default Folder
