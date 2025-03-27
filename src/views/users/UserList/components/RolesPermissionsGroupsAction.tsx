import Button from '@/components/ui/Button'
import { useRolePermissionsStore } from '../store/rolePermissionsStore'
import { useAuth } from '@/auth'
import { permissionChecker } from '@/services/PermissionChecker'
import { toast } from '@/components/ui'
import Notification from '@/components/ui/Notification'

const RolesPermissionsGroupsAction = () => {
    const { setRoleDialog } = useRolePermissionsStore()

    const { user } = useAuth()

    const handleSetRoleDialog = () => {
        if (
            permissionChecker(user, 'role', 'create') === false &&
            user.account_type === 'Admin'
        ) {
            toast.push(
                <Notification type="warning">
                    You don't have permission to create user role.
                </Notification>,
                { placement: 'top-center' },
            )
        } else {
            setRoleDialog({
                type: 'new',
                open: true,
            })
        }
    }

    return (
        <div>
            <Button variant="solid" onClick={handleSetRoleDialog}>
                Create role
            </Button>
        </div>
    )
}

export default RolesPermissionsGroupsAction
