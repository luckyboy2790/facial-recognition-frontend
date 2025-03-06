import * as faceapi from 'face-api.js'

export async function loadModels() {
    const MODEL_URL = '/models'

    console.log(123456789)

    await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)

    console.log(console.log(faceapi.nets))
}

export async function getFullFaceDescription(blob: any, inputSize = 512) {
    let scoreThreshold = 0.5
    const OPTION = new faceapi.TinyFaceDetectorOptions({
        inputSize,
        scoreThreshold,
    })
    const useTinyModel = true

    let img = await faceapi.fetchImage(blob)

    let fullDesc = await faceapi
        .detectAllFaces(img, OPTION)
        .withFaceLandmarks(useTinyModel)
        .withFaceDescriptors()
    return fullDesc
}

const maxDescriptorDistance = 0.5
export async function createMatcher(faceProfile: any) {
    let members = Object.keys(faceProfile)
    let labeledDescriptors = members.map(
        (member) =>
            new faceapi.LabeledFaceDescriptors(
                faceProfile[member].name,
                faceProfile[member].descriptors.map(
                    (descriptor: any) => new Float32Array(descriptor),
                ),
            ),
    )

    let faceMatcher = new faceapi.FaceMatcher(
        labeledDescriptors,
        maxDescriptorDistance,
    )
    return faceMatcher
}
