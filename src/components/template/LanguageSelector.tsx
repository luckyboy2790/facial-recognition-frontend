import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import classNames from 'classnames'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useLocaleStore } from '@/store/localeStore'
import { HiCheck } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'

const languageList = [
    { label: 'English', value: 'en', flag: 'US' },
    { label: 'Chinese', value: 'zh', flag: 'CN' },
    { label: 'Espanol', value: 'es', flag: 'ES' },
    { label: 'Arabic', value: 'ar', flag: 'SA' },
]

const _LanguageSelector = ({ className }: CommonProps) => {
    const { currentLang: locale, setLang } = useLocaleStore((state) => state)

    const selectLangFlag = useMemo(() => {
        return languageList.find((lang) => lang.value === locale)?.flag
    }, [locale])

    const selectedLanguage = (
        <div className={classNames(className, 'flex items-center')}>
            <Avatar
                size={24}
                shape="circle"
                src={`/img/countries/${selectLangFlag}.png`}
            />
        </div>
    )

    return (
        <Dropdown renderTitle={selectedLanguage} placement="bottom-end">
            {languageList.map((lang) => (
                <Dropdown.Item
                    key={lang.label}
                    className="justify-between"
                    eventKey={lang.label}
                    onClick={() => setLang(lang.value)}
                >
                    <span className="flex items-center">
                        <Avatar
                            size={18}
                            shape="circle"
                            src={`/img/countries/${lang.flag}.png`}
                        />
                        <span className="ltr:ml-2 rtl:mr-2">{lang.label}</span>
                    </span>
                    {locale === lang.value && (
                        <HiCheck className="text-emerald-500 text-lg" />
                    )}
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

const LanguageSelector = withHeaderItem(_LanguageSelector)

export default LanguageSelector
