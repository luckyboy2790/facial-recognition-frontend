import { useMemo, lazy } from 'react'
import type { CommonProps } from '@/@types/common'
import type { LazyExoticComponent, JSX } from 'react'

type LayoutType = 'simple' | 'split' | 'side'

type Layouts = Record<
    LayoutType,
    LazyExoticComponent<<T extends CommonProps>(props: T) => JSX.Element>
>

const currentLayoutType: LayoutType = 'side'

const layouts: Layouts = {
    simple: lazy(() => import('./Simple')),
    split: lazy(() => import('./Split')),
    side: lazy(() => import('./Side')),
}

const AuthLayout = ({ children }: CommonProps) => {
    const Layout = useMemo(() => {
        return layouts[currentLayoutType]
    }, [])

    return <Layout>{children}</Layout>
}

export default AuthLayout
