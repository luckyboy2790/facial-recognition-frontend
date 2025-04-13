import Button from '@/components/ui/Button'
import { useRolePermissionsStore } from '../store/rolePermissionsStore'
import { useAuth } from '@/auth'
import { permissionChecker } from '@/services/PermissionChecker'
import { toast } from '@/components/ui'
import Notification from '@/components/ui/Notification'
import useTranslation from '@/utils/hooks/useTranslation'

const RolesPermissionsGroupsAction = () => {
    const { setRoleDialog } = useRolePermissionsStore()

    const { t } = useTranslation()

    const { user } = useAuth()

    const handleSetRoleDialog = () => {
        if (
            permissionChecker(user, 'role', 'create') === false &&
            user.account_type === 'Admin'
        ) {
            toast.push(
                <Notification type="warning">
                    {t(
                        'page.user.permission_create_denide',
                        "You don't have permission to create user role.",
                    )}
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
                {t('page.user.create', 'Create')} {t('page.user.role', 'role')}
            </Button>
        </div>
    )
}

export default RolesPermissionsGroupsAction
