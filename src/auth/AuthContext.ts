import { createContext } from 'react'
import type {
    SignInCredential,
    SignUpCredential,
    AuthResult,
    User,
    OauthSignInCallbackPayload,
} from '@/@types/auth'

type Setting = {
    country: string
    timezone: string
    timeFormat: string
    rfidClock: boolean
    timeInComments: boolean
    ipRestriction: string
}

type Auth = {
    authenticated: boolean
    user: User
    setting: Setting
    signIn: (values: SignInCredential) => AuthResult
    signUp: (values: SignUpCredential) => AuthResult
    signOut: () => void
    oAuthSignIn: (
        callback: (payload: OauthSignInCallbackPayload) => void,
    ) => void
}

const defaultFunctionPlaceHolder = async (): AuthResult => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    return {
        status: '',
        message: '',
    }
}

const defaultOAuthSignInPlaceHolder = (
    callback: (payload: OauthSignInCallbackPayload) => void,
): void => {
    callback({
        onSignIn: () => {},
        redirect: () => {},
    })
}

const AuthContext = createContext<Auth>({
    authenticated: false,
    user: { role: {} },
    setting: {
        country: 'UK',
        timezone: 'Europe/Lisbon',
        timeFormat: '1',
        rfidClock: false,
        timeInComments: false,
        ipRestriction: '',
    },
    signIn: async () => defaultFunctionPlaceHolder(),
    signUp: async () => defaultFunctionPlaceHolder(),
    signOut: () => {},
    oAuthSignIn: defaultOAuthSignInPlaceHolder,
})

export default AuthContext
