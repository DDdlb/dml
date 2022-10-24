import http from '@/utils/http.js'

export const getArticle = (id)=>{
    return http({
        url: '/detail/article',
        params: {id}
    })
}