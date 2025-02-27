import Lightbox, { LightboxProps } from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { ReactNode } from 'react'

export type ImageGalleryProps = Partial<LightboxProps> & {
    children?: ReactNode
    index?: number
    onClose?: () => void
}

const ImageGallery = ({
    children,
    index = -1,
    slides,
    onClose,
    ...rest
}: ImageGalleryProps) => {
    return (
        <>
            {children}
            <Lightbox
                index={index}
                slides={slides}
                {...rest}
                open={index >= 0}
                close={() => onClose?.()}
            />
        </>
    )
}

export default ImageGallery
