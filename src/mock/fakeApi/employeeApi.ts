import { roleGroupsData, tasksData } from '../data/employeeData'
import { mock } from '../MockAdapter'
import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'
import { employeeDetailData } from '../data/employeeData'

mock.onGet(`/api/projects/tasks`).reply(() => {
    return [200, tasksData]
})

mock.onGet(`/api/customers`).reply((config) => {
    const { pageIndex, pageSize, sort, query } = config.params

    const { order, key } = sort

    const users = employeeDetailData as any[]

    const sanitizeUsers = users.filter((elm) => typeof elm !== 'function')
    let data = sanitizeUsers
    let total = users.length

    if (key && order) {
        if (key !== 'totalSpending') {
            data.sort(
                sortBy(key, order === 'desc', (a) =>
                    (a as string).toUpperCase(),
                ),
            )
        } else {
            data.sort(sortBy(key, order === 'desc', parseInt as Primer))
        }
    }

    if (query) {
        data = wildCardSearch(data, query)
        total = data.length
    }

    data = paginate(data, pageSize, pageIndex)

    const responseData = {
        list: data,
        total: total,
    }

    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve([200, responseData])
        }, 500)
    })
})

mock.onGet(new RegExp(`/api/customers/*`)).reply(function (config) {
    const id = config.url?.split('/')[2]

    const user = employeeDetailData.find((user) => user.id === id)

    if (!user) {
        return [404, {}]
    }

    return [200, user]
})

mock.onGet(`/api/rbac/roles`).reply(() => {
    const users = employeeDetailData

    const roleGroup = roleGroupsData.map((group) => {
        group.users = users.filter((user) => user.role === group.id) as any
        return group
    })

    return [200, roleGroup]
})
