import useSWR from 'swr'
import DashboardContent from './components/DashboardContent'
import DashboardHeader from './components/DashboardHeader'
import { useTasksStore } from './store/employeesStore'
import { apiGetProjectTasks } from '@/services/employeeService'
import type { GetTasksResponse, GetProjectMembersResponse } from './types'

const ProjectList = () => {
    const { updateOrdered, updateGroups } = useTasksStore()

    useSWR(
        ['/api/projects/tasks'],
        () => apiGetProjectTasks<GetTasksResponse>(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
            onSuccess: (data) => {
                updateOrdered(Object.keys(data))
                updateGroups(data)
            },
        },
    )

    return (
        <div>
            <DashboardHeader />
            <DashboardContent />
        </div>
    )
}

export default ProjectList
