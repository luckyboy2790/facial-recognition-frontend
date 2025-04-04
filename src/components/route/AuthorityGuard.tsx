import { Navigate } from 'react-router-dom'
import { useAuth } from '@/auth'
import React from 'react'

interface AuthorityGuardProps {
    routeAuthority: string[]
    children: React.ReactNode
}

const AuthorityGuard: React.FC<AuthorityGuardProps> = ({
    routeAuthority,
    children,
}) => {
    const { user } = useAuth()

    const userPermissions = user?.role || {}

    const hasPermission = routeAuthority.every((modulePermission) => {
        const [module, permission] = modulePermission.split('.')

        const modulePermissions = userPermissions[module] || []

        if (permission) {
            return modulePermissions.includes(permission)
        }
    })

    if (!hasPermission) {
        return <Navigate to="/access-denied" replace />
    }

    return <>{children}</>
}

export default AuthorityGuard
