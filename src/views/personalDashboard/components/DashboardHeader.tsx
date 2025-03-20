import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'

const DashboardHeader = () => {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <h3>Projects</h3>
            </div>
        </>
    )
}

export default DashboardHeader
