import Container from '@/components/shared/Container'
import SpaceSignBoard from '@/assets/svg/SpaceSignBoard'

const AccessDenied = () => {
    return (
        <Container className="h-full">
            <div className="h-full flex flex-col items-center justify-center">
                <SpaceSignBoard height={280} width={280} />
                <div className="mt-10 text-center">
                    <h3 className="mb-2">Access Denied!</h3>
                    <p className="text-base">
                        You have no permission to visit this page
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default AccessDenied
