import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import HorizontalMenuNavLink from './HorizontalMenuNavLink'
import AuthorityCheck from '@/components/shared/AuthorityCheck'
import classNames from '@/utils/classNames'
import {
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import navigationIcon from '@/configs/navigation-icon.config'
import { TbCircle } from 'react-icons/tb'
import type { CommonProps, TraslationFn } from '@/@types/common'
import type { NavigationTree, HorizontalMenuMeta } from '@/@types/navigation'
import type { ReactNode, HTMLProps } from 'react'

interface LayoutProps extends CommonProps {
    navigationTree: NavigationTree[]
    t: TraslationFn
    onDropdownClose: () => void
    routeKey: string
    routeParentKey?: string
    userAuthority: string[]
}

interface HorizontalMenuDropdownContentProps extends LayoutProps {
    layoutMeta?: HorizontalMenuMeta
}

const gridClasses = {
    1: {
        grid: 'grid-cols-1',
        width: 'w-[150px]',
    },
    2: {
        grid: 'grid-cols-2',
        width: 'w-[350px]',
    },
    3: {
        grid: 'grid-cols-3',
        width: 'w-[750px]',
    },
    4: {
        grid: 'grid-cols-4',
        width: 'w-[950px]',
    },
    5: {
        grid: 'grid-cols-5',
        width: 'w-[1150px]',
    },
}

const MenuItem = ({
    children,
    className,
    active,
    ...rest
}: CommonProps & { active?: boolean } & HTMLProps<HTMLDivElement>) => {
    return (
        <div
            className={classNames(
                'cursor-pointer font-semibold px-3 rounded-lg flex items-center w-full whitespace-nowrap gap-x-2 transition-colors duration-150 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800',
                active && 'bg-gray-100 dark:bg-gray-800',
                className,
            )}
            role="menuitem"
            {...rest}
        >
            {children}
        </div>
    )
}

const MenuIcon = ({ icon }: { icon: string }) => {
    if (typeof icon !== 'string' && !icon) {
        return <></>
    }

    return (
        <>
            {navigationIcon[icon] && (
                <span className={`text-xl`}>
                    {navigationIcon[icon] || <TbCircle />}
                </span>
            )}
        </>
    )
}

const MenuLink = ({
    path,
    isExternalLink,
    onClick,
    icon,
    title,
    description,
    active,
}: {
    path: string
    isExternalLink?: boolean
    onClick: () => void
    icon: ReactNode
    title: string
    description: string
    active?: boolean
}) => (
    <HorizontalMenuNavLink
        path={path}
        isExternalLink={isExternalLink}
        className="gap-2"
        onClick={onClick}
    >
        <MenuItem className="py-2 px-2 gap-3" active={active}>
            <div>
                <Avatar
                    className={classNames(
                        'bg-white dark:bg-transparent p-2 border-2 border-gray-200 dark:border-gray-600',
                        active ? 'text-primary' : 'heading-text',
                    )}
                    size={40}
                    icon={icon}
                    shape="round"
                />
            </div>
            <div className="min-w-0">
                <div className="heading-text font-bold">{title}</div>
                <div className="text-xs truncate">{description}</div>
            </div>
        </MenuItem>
    </HorizontalMenuNavLink>
)

const ColumnsLayout = (
    props: LayoutProps & {
        columns: 1 | 2 | 3 | 4 | 5
        showColumnTitle?: boolean
    },
) => {
    const {
        navigationTree,
        t,
        onDropdownClose,
        columns = 1,
        showColumnTitle = true,
        routeKey,
        userAuthority,
    } = props

    return (
        <div className="flex max-w-[1400px] w-full">
            <div
                className={classNames(
                    'grid gap-y-6 gap-x-8 p-6 flex-1',
                    gridClasses[columns]?.grid,
                )}
            >
                {navigationTree.map((nav) => {
                    if (nav.subMenu.length > 0) {
                        return (
                            <AuthorityCheck
                                key={nav.key}
                                userAuthority={userAuthority}
                                authority={nav.authority}
                            >
                                <div className="max-w-[250px]">
                                    {showColumnTitle && (
                                        <div className="heading-text font-bold mb-2">
                                            {t(nav.translateKey, nav.title)}
                                        </div>
                                    )}
                                    {nav.subMenu.map((subNav) => (
                                        <AuthorityCheck
                                            key={subNav.key}
                                            userAuthority={userAuthority}
                                            authority={subNav.authority}
                                        >
                                            <div key={subNav.key}>
                                                <MenuLink
                                                    path={subNav.path}
                                                    isExternalLink={
                                                        subNav.isExternalLink
                                                    }
                                                    icon={
                                                        navigationIcon[
                                                            subNav.icon
                                                        ] || <TbCircle />
                                                    }
                                                    title={t(
                                                        subNav.translateKey,
                                                        subNav.title,
                                                    )}
                                                    description={t(
                                                        subNav.meta?.description
                                                            ?.translateKey ||
                                                            '',
                                                        subNav.meta?.description
                                                            ?.label || '',
                                                    )}
                                                    active={
                                                        subNav.key === routeKey
                                                    }
                                                    onClick={onDropdownClose}
                                                />
                                            </div>
                                        </AuthorityCheck>
                                    ))}
                                </div>
                            </AuthorityCheck>
                        )
                    }
                    return null
                })}
            </div>
            {navigationTree.some((nav) => nav.type === NAV_ITEM_TYPE_ITEM) && (
                <div
                    className={classNames(
                        'ltr:border-l rtl:border-r border-gray-200 dark:border-gray-800 min-w-[280px] p-4 flex flex-col',
                    )}
                >
                    {navigationTree.map((nav) => {
                        if (
                            nav.subMenu.length === 0 &&
                            nav.type === NAV_ITEM_TYPE_ITEM
                        ) {
                            return (
                                <AuthorityCheck
                                    key={nav.key}
                                    userAuthority={userAuthority}
                                    authority={nav.authority}
                                >
                                    <MenuLink
                                        key={nav.key}
                                        path={nav.path}
                                        isExternalLink={nav.isExternalLink}
                                        icon={
                                            navigationIcon[nav.icon] || (
                                                <TbCircle />
                                            )
                                        }
                                        title={t(nav.translateKey, nav.title)}
                                        description={t(
                                            nav.meta?.description
                                                ?.translateKey || '',
                                            nav.meta?.description?.label || '',
                                        )}
                                        active={nav.key === routeKey}
                                        onClick={onDropdownClose}
                                    />
                                </AuthorityCheck>
                            )
                        }
                        return null
                    })}
                </div>
            )}
        </div>
    )
}

const DefaultLayout = ({
    navigationTree,
    t,
    onDropdownClose,
    routeKey,
    userAuthority,
}: LayoutProps) => {
    const renderNavigation = (navTree: NavigationTree[], cascade: number) => {
        const nextCascade = cascade + 1

        return (
            <div className={classNames(cascade === 0 && 'p-3')}>
                {navTree.map((nav) => (
                    <AuthorityCheck
                        key={nav.key}
                        userAuthority={userAuthority}
                        authority={nav.authority}
                    >
                        <ul>
                            {nav.type === NAV_ITEM_TYPE_ITEM && (
                                <Dropdown.Item active={routeKey === nav.key}>
                                    <HorizontalMenuNavLink
                                        path={nav.path}
                                        isExternalLink={nav.isExternalLink}
                                        className="gap-2 h-full"
                                        onClick={onDropdownClose}
                                    >
                                        <MenuIcon icon={nav.icon} />
                                        <span>
                                            {t(nav.translateKey, nav.title)}
                                        </span>
                                    </HorizontalMenuNavLink>
                                </Dropdown.Item>
                            )}
                            {nav.type === NAV_ITEM_TYPE_COLLAPSE && (
                                <Dropdown
                                    renderTitle={
                                        <span className="flex items-center gap-2">
                                            <MenuIcon icon={nav.icon} />
                                            <span>
                                                {t(nav.translateKey, nav.title)}
                                            </span>
                                        </span>
                                    }
                                >
                                    {nav.subMenu &&
                                        nav.subMenu.length > 0 &&
                                        renderNavigation(
                                            nav.subMenu,
                                            nextCascade,
                                        )}
                                </Dropdown>
                            )}
                        </ul>
                    </AuthorityCheck>
                ))}
            </div>
        )
    }

    return <>{renderNavigation(navigationTree, 0)}</>
}

const TabLayout = ({
    navigationTree,
    t,
    onDropdownClose,
    columns,
    routeKey,
    userAuthority,
    routeParentKey,
}: LayoutProps & { columns: 1 | 2 | 3 | 4 | 5 }) => {
    const [activeKey, setActiveKey] = useState(
        navigationTree.some((nav) => nav.key === routeParentKey)
            ? routeParentKey
            : '' || navigationTree[0].key,
    )

    return (
        <div className="flex">
            <div className="p-4">
                {navigationTree.map((nav) => {
                    if (nav.subMenu.length > 0) {
                        return (
                            <AuthorityCheck
                                key={nav.key}
                                userAuthority={userAuthority}
                                authority={nav.authority}
                            >
                                <div className="min-w-[250px]">
                                    <div key={nav.key}>
                                        <MenuItem
                                            className="py-2 px-2 gap-3"
                                            active={nav.key === activeKey}
                                            onClick={() =>
                                                setActiveKey(nav.key)
                                            }
                                        >
                                            <div>
                                                <Avatar
                                                    className={classNames(
                                                        'bg-white dark:bg-transparent p-2 border-2 border-gray-200 dark:border-gray-600',
                                                        nav.key === routeKey
                                                            ? 'text-primary'
                                                            : 'heading-text',
                                                    )}
                                                    size={40}
                                                    icon={
                                                        navigationIcon[
                                                            nav.icon
                                                        ] || <TbCircle />
                                                    }
                                                    shape="round"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="heading-text font-bold">
                                                    {t(
                                                        nav.translateKey,
                                                        nav.title,
                                                    )}
                                                </div>
                                                <div className="text-xs truncate">
                                                    {t(
                                                        nav.meta?.description
                                                            ?.translateKey ||
                                                            '',
                                                        nav.meta?.description
                                                            ?.label || '',
                                                    )}
                                                </div>
                                            </div>
                                        </MenuItem>
                                    </div>
                                </div>
                            </AuthorityCheck>
                        )
                    }
                    return null
                })}
            </div>
            {navigationTree.some(
                (nav) =>
                    nav.key === activeKey &&
                    nav.type === NAV_ITEM_TYPE_COLLAPSE,
            ) && (
                <div className="ltr:border-l rtl:border-r border-gray-200 dark:border-gray-800 p-6">
                    <div
                        className={classNames(
                            'grid gap-x-8 flex-1',
                            gridClasses[columns]?.grid,
                            gridClasses[columns]?.width,
                        )}
                    >
                        {navigationTree
                            .find((nav) => nav.key === activeKey)
                            ?.subMenu.map((nav) => (
                                <AuthorityCheck
                                    key={nav.key}
                                    userAuthority={userAuthority}
                                    authority={nav.authority}
                                >
                                    <HorizontalMenuNavLink
                                        path={nav.path}
                                        isExternalLink={nav.isExternalLink}
                                        className="gap-2 group"
                                        onClick={() => onDropdownClose()}
                                    >
                                        <div
                                            className={classNames(
                                                'flex items-center gap-2 h-[42px] heading-text group-hover:text-primary',
                                                routeKey === nav.key &&
                                                    'text-primary',
                                            )}
                                        >
                                            <span className="text-xl">
                                                {navigationIcon[nav.icon] || (
                                                    <TbCircle />
                                                )}
                                            </span>
                                            <span>
                                                {t(nav.translateKey, nav.title)}
                                            </span>
                                        </div>
                                    </HorizontalMenuNavLink>
                                </AuthorityCheck>
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const HorizontalMenuDropdownContent = (
    props: HorizontalMenuDropdownContentProps,
) => {
    const { style, navigationTree, layoutMeta, ...rest } = props

    return (
        <div
            className="rounded-2xl bg-white dark:bg-gray-900 ring-0 shadow-[0px_48px_64px_-16px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-gray-800 focus:outline-none min-w-[180px]"
            style={style}
        >
            {layoutMeta?.layout === 'default' && (
                <DefaultLayout navigationTree={navigationTree} {...rest} />
            )}
            {layoutMeta?.layout === 'columns' && (
                <ColumnsLayout
                    navigationTree={navigationTree}
                    columns={layoutMeta.columns}
                    showColumnTitle={layoutMeta.showColumnTitle}
                    {...rest}
                />
            )}
            {layoutMeta?.layout === 'tabs' && (
                <TabLayout
                    navigationTree={navigationTree}
                    columns={layoutMeta.columns}
                    {...rest}
                />
            )}
            {!layoutMeta && (
                <DefaultLayout navigationTree={navigationTree} {...rest} />
            )}
        </div>
    )
}

export default HorizontalMenuDropdownContent
