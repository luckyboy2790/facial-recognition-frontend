import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import { Button, FormItem, Notification, Spinner, toast } from '@/components/ui'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { Controller, UseFormSetValue } from 'react-hook-form'
import { HiOutlineUser } from 'react-icons/hi'
import * as faceapi from 'face-api.js'
import type { FormSectionBaseProps } from './types'
const domain = import.meta.env.VITE_BACKEND_ENDPOINT

type ProfileImageSectionProps = FormSectionBaseProps & {
    setValue: UseFormSetValue<any>
    newCustomer: boolean
}

const ProfileImage = ({
    control,
    setValue,
    newCustomer,
    errors,
}: ProfileImageSectionProps) => {
    const [faceDescriptor, setFaceDescriptor] = useState<number[] | null>(null)
    const [modelsLoaded, setModelsLoaded] = useState(false)
    const [isUpdateImage, setIsUpdateImage] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [currentImageURL, setCurrentImageURL] = useState<string | null>(null)

    useEffect(() => {
        if (!newCustomer && control._formValues.faceDescriptor) {
            const faceDescriptorData = control._formValues.faceDescriptor.map(
                (item: any) => Number(item),
            )

            setFaceDescriptor(faceDescriptorData)
            setValue('faceDescriptor', faceDescriptorData)
            setValue('img', control._formValues.img)
            setCurrentImageURL(control._formValues.img)
        }
    }, [newCustomer, control._formValues.faceDescriptor])

    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = '/models'

                await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
                await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
                await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
                setModelsLoaded(true)
            } catch (error) {
                console.error('Error loading face-api models:', error)
            }
        }
        loadModels()
    }, [])

    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true
        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }
            }
        }
        return valid
    }

    const handleImageUpload = async (
        file: File,
        onChange: (value: string) => void,
    ) => {
        if (!modelsLoaded) {
            toast.push(
                <Notification type="warning">
                    Models are still loading, please wait...
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
            return
        }

        setIsLoading(true)

        const imgURL = URL.createObjectURL(file)
        setCurrentImageURL(imgURL)
        onChange(imgURL)
        setIsUpdateImage(true)

        const img = new Image()
        img.src = imgURL
        img.onload = async () => {
            try {
                const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor()

                if (detections) {
                    const descriptorArray = Array.from(
                        detections.descriptor,
                    ).map((item) => Number(item))

                    setValue('faceDescriptor', descriptorArray)
                    setFaceDescriptor(descriptorArray)

                    setIsChecked(true)
                } else {
                    setValue('faceDescriptor', [])
                    setFaceDescriptor([])

                    setIsChecked(false)
                }

                setIsLoading(false)
            } catch (error) {
                console.error('Error detecting face:', error)
            }
        }
    }

    return (
        <Card>
            <h4 className="mb-6">Image</h4>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg text-center p-4">
                <div className="text-center">
                    <Controller
                        name="img"
                        control={control}
                        render={({ field }) =>
                            !isLoading ? (
                                <>
                                    <div className="flex items-center justify-center">
                                        {currentImageURL ? (
                                            <Avatar
                                                size={100}
                                                className="border-4 border-white bg-gray-100 text-gray-300 shadow-lg"
                                                icon={<HiOutlineUser />}
                                                src={
                                                    isUpdateImage
                                                        ? currentImageURL
                                                        : `${domain}${field.value}`
                                                }
                                            />
                                        ) : (
                                            <DoubleSidedImage
                                                src="/img/others/upload.png"
                                                darkModeSrc="/img/others/upload-dark.png"
                                                alt="Upload image"
                                            />
                                        )}
                                    </div>
                                    <Upload
                                        showList={false}
                                        uploadLimit={1}
                                        beforeUpload={beforeUpload}
                                        onChange={(files) => {
                                            if (files.length > 0) {
                                                handleImageUpload(
                                                    files[0],
                                                    field.onChange,
                                                )
                                            }
                                        }}
                                    >
                                        <Button
                                            variant="solid"
                                            className="mt-4"
                                            type="button"
                                            disabled={!modelsLoaded}
                                        >
                                            {modelsLoaded
                                                ? 'Upload Image'
                                                : 'Loading Models...'}
                                        </Button>
                                    </Upload>
                                    {((faceDescriptor &&
                                        faceDescriptor.length > 0 &&
                                        newCustomer) ||
                                        isChecked) && (
                                        <p className="mt-2 text-sm text-green-600">
                                            Image uploaded successfully.
                                        </p>
                                    )}
                                    {((faceDescriptor &&
                                        faceDescriptor.length === 0 &&
                                        newCustomer &&
                                        isUpdateImage) ||
                                        (!faceDescriptor &&
                                            newCustomer &&
                                            isUpdateImage) ||
                                        (!isChecked && isUpdateImage)) && (
                                        <p className="mt-2 text-sm text-red-600">
                                            Image is not recognized, please
                                            upload other.
                                        </p>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center justify-center min-h-48">
                                    <Spinner size="40px" />
                                </div>
                            )
                        }
                    />
                </div>
            </div>
        </Card>
    )
}

export default ProfileImage
