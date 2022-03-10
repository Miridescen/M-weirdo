/*
 * @Author: jianwen.Wang
 * @Date: 2020-09-28 14:28:16
 * @LastEditTime: 2022-02-08 15:45:01
 * @LastEditors: jiawen.wang
 */
import axios from './index' //进行了二次封装了

export const preSale = params => {
    //分页的接口
    return axios.post('/ghostApi/preSale', params)
}
export const getRandom = params => {
    //分页的接口
    return axios.post('/ghostApi/publicSale/getRandom', params)
}
export const publicSale = params => {
    //分页的接口
    return axios.post('/ghostApi/publicSale', params)
}
