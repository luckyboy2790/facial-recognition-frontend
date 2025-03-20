import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'
import personalRoute from './personalRoute'
import adminRoute from './adminRoute'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    ...personalRoute,
    ...adminRoute,
    ...othersRoute,
]
