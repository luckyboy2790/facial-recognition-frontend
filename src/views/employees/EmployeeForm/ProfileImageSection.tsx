import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import { Button, FormItem, Spinner } from '@/components/ui'
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

    useEffect(() => {
        if (!newCustomer && control._formValues.faceDescriptor) {
            const faceDescriptorData = control._formValues.faceDescriptor.map(
                (item: any) => Number(item),
            )

            setFaceDescriptor(faceDescriptorData)
            setValue('faceDescriptor', faceDescriptorData)
            setValue('img', control._formValues.img)
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
                console.log('Face-api models loaded successfully')
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
            console.log('Models are still loading, please wait...')
            return
        }

        const imgURL = URL.createObjectURL(file)
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
                    console.log('Face Descriptor:', detections.descriptor)
                    const descriptorArray = Array.from(
                        detections.descriptor,
                    ).map((item) => Number(item))

                    setValue('faceDescriptor', descriptorArray)
                    setFaceDescriptor(descriptorArray)
                } else {
                    console.log('No face detected')
                    setValue('faceDescriptor', [])
                }
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
                        render={({ field }) => (
                            <>
                                <div className="flex items-center justify-center">
                                    {field.value ? (
                                        <Avatar
                                            size={100}
                                            className="border-4 border-white bg-gray-100 text-gray-300 shadow-lg"
                                            icon={<HiOutlineUser />}
                                            src={
                                                field.value
                                                    ? isUpdateImage
                                                        ? field.value
                                                        : `${domain}${field.value}`
                                                    : ''
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
                                        onClick={() => setIsUpdateImage(true)}
                                    >
                                        {modelsLoaded
                                            ? 'Upload Image'
                                            : 'Loading Models...'}
                                    </Button>
                                </Upload>
                                {faceDescriptor && newCustomer && (
                                    <p className="mt-2 text-sm text-green-600">
                                        Image uploaded successfully.
                                    </p>
                                )}
                            </>
                        )}
                    />
                </div>
            </div>
        </Card>
    )
}

export default ProfileImage
