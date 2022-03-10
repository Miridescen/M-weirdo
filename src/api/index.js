/*
 * @Author: jianwen.Wang
 * @Date: 2022-02-07 17:36:23
 * @LastEditTime: 2022-02-08 10:24:54
 * @LastEditors: jiawen.wang
 */
import axios from 'axios'

var service = axios.create({
    baseURL: '/', //所有的请求都会 带上 /api
    timeout: 10000,
})
// //请求拦截器
service.interceptors.request.use(config => {
    return config
})
// //响应拦截器
service.interceptors.response.use(res => {
    return res.data
})

export default service
