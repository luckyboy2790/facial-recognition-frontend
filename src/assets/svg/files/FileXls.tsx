const FileXls = ({
    height = 100,
    width = 100,
}: {
    height?: number
    width?: number
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 287.82 384"
            width={width}
            height={height}
        >
            <path
                fill="#00a971"
                d="M652.52 792.45h192s50.06.1 49-59.26 0-210.58 0-210.58H785.16l-1-114.16H652.52s-45.94 1.52-46.52 53 0 284.71 0 284.71 4.19 44.97 46.52 46.29z"
                transform="translate(-605.74 -408.45)"
            ></path>
            <path
                fill="#3dbe93"
                d="M178.39 0L287.82 114.16 179.42 114.16 178.39 0z"
            ></path>
            <path
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="10"
                d="M143.91 228.27v92.93m-83.65-46.47h167.29M60.26 228.27h167.29M90.01 321.2h107.8c10.41 0 15.62 0 19.59-2a18.58 18.58 0 008.12-8.12c2-4 2-9.18 2-19.59v-89.25c0-10.4 0-15.61-2-19.58a18.55 18.55 0 00-8.12-8.13c-4-2-9.18-2-19.59-2H90.01c-10.41 0-15.61 0-19.59 2a18.6 18.6 0 00-8.12 8.13c-2 4-2 9.18-2 19.58v89.22c0 10.41 0 15.61 2 19.59a18.63 18.63 0 008.12 8.12c3.98 2.03 9.18 2.03 19.59 2.03z"
            ></path>
        </svg>
    )
}

export default FileXls
