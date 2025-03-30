import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import './locales'
import useDarkMode from './utils/hooks/useDarkMode'
import { ConfigProvider, theme } from 'antd'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {
    const data = useDarkMode()

    console.log(data[0])

    return (
        <Theme>
            <ConfigProvider
                theme={{
                    algorithm: data[0]
                        ? theme?.darkAlgorithm
                        : theme.defaultAlgorithm,
                    token: {
                        colorBgContainer: data[0] ? '#404040' : '#ffffff',
                    },
                }}
            >
                <BrowserRouter>
                    <AuthProvider>
                        <Layout>
                            <Views />
                        </Layout>
                    </AuthProvider>
                </BrowserRouter>
            </ConfigProvider>
        </Theme>
    )
}

export default App
