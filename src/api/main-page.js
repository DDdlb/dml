import http from '@/utils/http.js'

export const getMainMenu = ()=>{
    return http({
        url: '/main/menu'
    })
}

export const getMainPage = ()=>{
    return http({
        url: '/main/page'
    })
}