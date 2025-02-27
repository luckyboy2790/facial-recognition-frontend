import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import presetThemeSchemaConfig from '@/configs/preset-theme-schema.config'

export type ThemeVariables = Record<
    'primary' | 'primaryDeep' | 'primaryMild' | 'primarySubtle' | 'neutral',
    string
>

export interface MappedTheme {
    [key: string]: string
}

export const mapTheme = (variables: ThemeVariables): MappedTheme => {
    return {
        '--primary': variables.primary || '',
        '--primary-deep': variables.primaryDeep || '',
        '--primary-mild': variables.primaryMild || '',
        '--primary-subtle': variables.primarySubtle || '',
        '--neutral': variables.neutral || '',
    }
}

function useThemeSchema() {
    const themeSchema = useThemeStore((state) => state.themeSchema)
    const mode = useThemeStore((state) => state.mode)

    const applyTheme = (theme: string): void => {
        if (presetThemeSchemaConfig[theme][mode]) {
            const themeObject = mapTheme(presetThemeSchemaConfig[theme][mode])
            if (!themeObject) return

            const root = document.documentElement

            Object.keys(themeObject).forEach((property) => {
                if (property === 'name') {
                    return
                }

                root.style.setProperty(property, themeObject[property])
            })
        }
    }

    useEffect(() => {
        if (themeSchema) {
            applyTheme(themeSchema)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeSchema, mode])
}

export default useThemeSchema
