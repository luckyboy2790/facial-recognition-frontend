export interface Comment {
    id: string
    name: string
    src: string
    message: string
    date: number
}

export type Member = {
    id: string
    name: string
    img: string
}

export type Task = {
    _id: string
    full_name: string
    type: string
    assignee?: Member
    priority: string
    time: string | null
    checked: boolean
    date: string | null
    recentAbsenceDate: string | null
    job_title?: {
        job_title: string
    }
    leaveReturn: string | null
    employeeData?: {
        full_name: string
    }
    start_time: string
    off_time: string
    from: string
    to: string
    reason: string | null
}

export type Members = Member[]

export type Groups = Record<string, Task[]>

export type GetTasksResponse = Groups

export type GetProjectMembersResponse = {
    participantMembers: Members
    allMembers: Members
}
