import http from '@/utils/http.js'

export const getTemplatePage = (router) => {
    let url = '/page' + router
    return http({
        url: url
    })
}

export const getNewsList = (page) => {
    return http({
        url: '/news/list',
        param: {page}
    })
}