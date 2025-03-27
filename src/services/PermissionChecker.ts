export const permissionChecker = (
    user: any,
    pageName: string,
    func: string,
): boolean => {
    const userPermissions = user?.role || {}
    const modulePermissions = userPermissions[pageName] || []
    return modulePermissions.includes(func)
}
