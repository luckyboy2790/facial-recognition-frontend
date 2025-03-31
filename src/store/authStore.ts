import cookiesStorage from '@/utils/cookiesStorage'
import appConfig from '@/configs/app.config'
import { TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/@types/auth'

type Session = {
    signedIn: boolean
}

type Setting = {
    country: string
    timezone: string
    timeFormat: string
    rfidClock: boolean
    timeInComments: boolean
    ipRestriction: string
}

type AuthState = {
    session: Session
    user: User
    setting: Setting
}

type AuthAction = {
    setSessionSignedIn: (payload: boolean) => void
    setUser: (payload: User) => void
    setSetting: (payload: Setting) => void
}

const getPersistStorage = () => {
    if (appConfig.accessTokenPersistStrategy === 'localStorage') {
        return localStorage
    }

    if (appConfig.accessTokenPersistStrategy === 'sessionStorage') {
        return sessionStorage
    }

    return cookiesStorage
}

const initialState: AuthState = {
    session: {
        signedIn: false,
    },
    user: {
        img: '',
        full_name: '',
        email: '',
        _id: '',
        role: {},
    },
    setting: {
        country: 'UK',
        timezone: 'Europe/Lisbon',
        timeFormat: '1',
        rfidClock: false,
        timeInComments: false,
        ipRestriction: '',
    },
}

export const useSessionUser = create<AuthState & AuthAction>()(
    persist(
        (set) => ({
            ...initialState,
            setSessionSignedIn: (payload) =>
                set((state) => ({
                    session: {
                        ...state.session,
                        signedIn: payload,
                    },
                })),
            setUser: (payload) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        ...payload,
                    },
                })),
            setSetting: (payload) =>
                set((state) => ({
                    setting: {
                        ...state.setting,
                        ...payload,
                    },
                })),
        }),
        { name: 'sessionUser', storage: createJSONStorage(() => localStorage) },
    ),
)

export const useToken = () => {
    const storage = getPersistStorage()

    const setToken = (token: string) => {
        storage.setItem(TOKEN_NAME_IN_STORAGE, token)
    }

    return {
        setToken,
        token: storage.getItem(TOKEN_NAME_IN_STORAGE),
    }
}
