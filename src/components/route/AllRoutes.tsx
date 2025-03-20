import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import AuthorityGuard from './AuthorityGuard'
import AppRoute from './AppRoute'
import PageContainer from '@/components/template/PageContainer'
import { publicRoutes } from '@/configs/routes.config'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'
import { Routes, Route, Navigate } from 'react-router-dom'
import type { LayoutType } from '@/@types/theme'
import adminRoute from '@/configs/routes.config/adminRoute'
import othersRoute from '@/configs/routes.config/othersRoute'
import personalRoute from '@/configs/routes.config/personalRoute'
import { Routes as AppRoutes } from '@/@types/routes'

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType
}

type AllRoutesProps = ViewsProps

const { authenticatedEntryPath } = appConfig

const AllRoutes = (props: AllRoutesProps) => {
    const { user } = useAuth()

    const userAccountType = user?.account_type || ''

    let accessibleProtectedRoutes: AppRoutes = []

    if (userAccountType === 'SuperAdmin') {
        accessibleProtectedRoutes = [...adminRoute, ...othersRoute]
    } else if (userAccountType === 'Admin') {
        accessibleProtectedRoutes = [
            ...adminRoute,
            ...personalRoute,
            ...othersRoute,
        ]
    } else if (userAccountType === 'Employee') {
        accessibleProtectedRoutes = [...personalRoute, ...othersRoute]
    }

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute />}>
                <Route
                    path="/"
                    element={<Navigate replace to={authenticatedEntryPath} />}
                />
                {accessibleProtectedRoutes.map((route, index) => (
                    <Route
                        key={route.key + index}
                        path={route.path}
                        element={
                            <AuthorityGuard authority={route.authority}>
                                <PageContainer {...props} {...route.meta}>
                                    <AppRoute
                                        routeKey={route.key}
                                        component={route.component}
                                        {...route.meta}
                                    />
                                </PageContainer>
                            </AuthorityGuard>
                        }
                    />
                ))}
                <Route
                    path="*"
                    element={<Navigate replace to="/access-denied" />}
                />
            </Route>

            <Route path="/" element={<PublicRoute />}>
                {publicRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <AppRoute
                                routeKey={route.key}
                                component={route.component}
                                {...route.meta}
                            />
                        }
                    />
                ))}
            </Route>

            <Route
                path="/access-denied"
                element={
                    <AppRoute
                        routeKey={othersRoute[0].key}
                        component={othersRoute[0].component}
                    />
                }
            />
        </Routes>
    )
}

export default AllRoutes
