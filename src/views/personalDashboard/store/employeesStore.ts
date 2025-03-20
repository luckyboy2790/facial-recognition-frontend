import { create } from 'zustand'
import type { Groups, Members } from '../types'

export type ScrumBoardState = {
    groups: Groups
    ordered: string[]
    boardMembers: Members
    allMembers: Members
}

type ScrumBoardAction = {
    updateOrdered: (payload: string[]) => void
    updateGroups: (payload: Groups) => void
    updateBoardMembers: (payload: Members) => void
    updateAllMembers: (payload: Members) => void
}

const initialState: ScrumBoardState = {
    groups: {},
    ordered: [],
    boardMembers: [],
    allMembers: [],
}

export const useTasksStore = create<ScrumBoardState & ScrumBoardAction>(
    (set) => ({
        ...initialState,
        updateOrdered: (payload) =>
            set(() => {
                return { ordered: payload }
            }),
        updateGroups: (payload) => set(() => ({ groups: payload })),
        updateBoardMembers: (payload) => set(() => ({ boardMembers: payload })),
        updateAllMembers: (payload) => set(() => ({ allMembers: payload })),
    }),
)
