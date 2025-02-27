/* eslint-disable @typescript-eslint/no-explicit-any */
import { mock } from '../MockAdapter'
import { notificationListData, searchQueryPoolData } from '../data/commonData'
import wildCardSearch from '@/utils/wildCardSearch'

mock.onGet(`/api/notification/list`).reply(() => {
    return [200, notificationListData]
})

mock.onGet(`/api/notification/count`).reply(() => {
    const unreadNotification = notificationListData.filter(
        (notification) => !(notification as any).readed,
    )
    return [200, { count: unreadNotification.length }]
})

mock.onGet(`/api/search/query`).reply((config) => {
    const { query } = config.params

    const result = wildCardSearch(searchQueryPoolData, query, 'title')

    const categories: (string | number)[] = []

    result.forEach((elm) => {
        if (!categories.includes(elm.categoryTitle)) {
            categories.push(elm.categoryTitle)
        }
    })

    const data = categories.map((category) => {
        return {
            title: category,
            data: result
                .filter((elm) => elm.categoryTitle === category)
                .filter((_, index) => index < 5),
        }
    })

    return [200, data]
})
