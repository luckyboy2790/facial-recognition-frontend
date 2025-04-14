import classNames from '@/utils/classNames'
import { GrSystem } from 'react-icons/gr'
import { FcAbout } from 'react-icons/fc'
import { MdAttribution } from 'react-icons/md'
import useTranslation from '@/utils/hooks/useTranslation'

type ProjectDetailsNavigationProps = {
    selected: string
    onChange: (value: string) => void
}

const ProjectDetailsNavigation = ({
    selected,
    onChange,
}: ProjectDetailsNavigationProps) => {
    const { t } = useTranslation()

    const navigation = [
        {
            label: t('page.setting.system', 'System'),
            value: 'system',
            icon: <GrSystem />,
        },
        {
            label: t('page.setting.about', 'About'),
            value: 'about',
            icon: <FcAbout />,
        },
        {
            label: t('page.setting.attributions', 'Attributions'),
            value: 'attributions',
            icon: <MdAttribution />,
        },
    ]

    const handleClick = (value: string) => {
        onChange(value)
    }

    return (
        <div className="w-[250px]">
            <div className="flex flex-col gap-2">
                {navigation.map((nav) => (
                    <div key={nav.value}>
                        <button
                            className={classNames(
                                'flex items-center gap-2 w-full px-3.5 py-2.5 rounded-full border-2 border-transparent font-semibold transition-colors dark:hover:text-gray-100 text-gray-900 dark:text-white',
                                selected === nav.value
                                    ? 'border-primary'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                            )}
                            onClick={() => handleClick(nav.value)}
                        >
                            <span className="text-xl">{nav.icon}</span>
                            <span>{nav.label}</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectDetailsNavigation
