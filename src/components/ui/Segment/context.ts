import { createContext, useContext } from 'react'
import type { TypeAttributes } from '../@types/common'

export type SegmentValue = string[] | string

export type SegmentSelectionType = 'single' | 'multiple'

export type SegmentContextProps = {
    value?: SegmentValue
    onActive?: (itemValue: SegmentValue) => void
    onDeactivate?: (itemValue: SegmentValue) => void
    selectionType?: SegmentSelectionType
    size?: TypeAttributes.Size | TypeAttributes.ControlSize
}

const SegmentContext = createContext<SegmentContextProps>({})

export const SegmentContextProvider = SegmentContext.Provider

export const SegmentContextConsumer = SegmentContext.Consumer

export function useSegment() {
    return useContext(SegmentContext)
}

export default SegmentContext
