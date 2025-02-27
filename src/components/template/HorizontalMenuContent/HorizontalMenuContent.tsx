import HorizontalMenuDropdownTrigger from './HorizontalMenuDropdownTrigger'
import HorizontalMenuDropdown from './HorizontalMenuDropdown'
import HorizontalMenuDropdownContent from './HorizontalMenuDropdownContent'
import AuthorityCheck from '@/components/shared/AuthorityCheck'
import useTranslation from '@/utils/hooks/useTranslation'
import useMenuActive from '@/utils/hooks/useMenuActive'
import { TbChevronDown } from 'react-icons/tb'
import { Direction } from '@/@types/theme'
import type { NavigationTree } from '@/@types/navigation'
import type { TraslationFn } from '@/@types/common'

type HorizontalMenuContentProps = {
    routeKey: string
    navigationTree?: NavigationTree[]
    direction?: Direction
    translationSetup?: boolean
    userAuthority: string[]
}

const HorizontalMenuContent = (props: HorizontalMenuContentProps) => {
    const {
        routeKey,
        navigationTree = [],
        translationSetup,
        userAuthority,
    } = props

    const { t } = useTranslation(!translationSetup)
    const { activedRoute } = useMenuActive(navigationTree, routeKey)

    return (
        <div className="flex gap-1">
            {navigationTree.map((nav) => (
                <AuthorityCheck
                    key={nav.key}
                    userAuthority={userAuthority}
                    authority={nav.authority}
                >
                    {nav.subMenu.length > 0 ? (
                        <HorizontalMenuDropdown
                            dropdownLean={
                                nav.meta?.horizontalMenu?.layout === 'default'
                            }
                            triggerContent={({ ref, props }) => (
                                <HorizontalMenuDropdownTrigger
                                    ref={ref}
                                    {...props}
                                    asElement="button"
                                >
                                    <div className="flex items-center gap-1">
                                        <span>
                                            {t(nav.translateKey, nav.title)}
                                        </span>
                                        <TbChevronDown />
                                    </div>
                                </HorizontalMenuDropdownTrigger>
                            )}
                            menuContent={({ styles, handleDropdownClose }) => (
                                <HorizontalMenuDropdownContent
                                    style={styles}
                                    navigationTree={nav.subMenu}
                                    t={t as TraslationFn}
                                    layoutMeta={nav?.meta?.horizontalMenu}
                                    routeKey={routeKey}
                                    routeParentKey={activedRoute?.parentKey}
                                    userAuthority={userAuthority}
                                    onDropdownClose={handleDropdownClose}
                                />
                            )}
                        ></HorizontalMenuDropdown>
                    ) : (
                        <HorizontalMenuDropdownTrigger
                            {...props}
                            path={nav.path}
                            isExternalLink={nav.isExternalLink}
                            active={activedRoute?.key === nav.key}
                            asElement="a"
                        >
                            <div className="flex items-center gap-1">
                                <span>{t(nav.translateKey, nav.title)}</span>
                            </div>
                        </HorizontalMenuDropdownTrigger>
                    )}
                </AuthorityCheck>
            ))}
        </div>
    )
}

export default HorizontalMenuContent
