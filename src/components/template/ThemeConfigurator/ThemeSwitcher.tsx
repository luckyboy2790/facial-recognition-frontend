import classNames from '@/utils/classNames'
import { TbCheck } from 'react-icons/tb'
import presetThemeSchemaConfig from '@/configs/preset-theme-schema.config'
import { useThemeStore } from '@/store/themeStore'

const ThemeSwitcher = () => {
    const schema = useThemeStore((state) => state.themeSchema)
    const setSchema = useThemeStore((state) => state.setSchema)
    const mode = useThemeStore((state) => state.mode)

    return (
        <div className="inline-flex items-center gap-2">
            {Object.entries(presetThemeSchemaConfig).map(([key, value]) => (
                <button
                    key={key}
                    className={classNames(
                        'h-8 w-8 rounded-full flex items-center justify-center border-2 border-white',
                        schema === key && 'ring-2 ring-primary',
                    )}
                    style={{ backgroundColor: value[mode].primary || '' }}
                    onClick={() => setSchema(key)}
                >
                    {schema === key ? (
                        <TbCheck className="text-neutral text-lg" />
                    ) : (
                        <></>
                    )}
                </button>
            ))}
        </div>
    )
}

export default ThemeSwitcher
