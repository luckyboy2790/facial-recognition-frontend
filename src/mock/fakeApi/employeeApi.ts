import { tasksData } from '../data/employeeData'
import { mock } from '../MockAdapter'

mock.onGet(`/api/projects/tasks`).reply(() => {
    return [200, tasksData]
})
