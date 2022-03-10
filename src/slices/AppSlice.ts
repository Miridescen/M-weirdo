/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-25 17:28:22
 * @LastEditTime: 2022-02-09 11:41:08
 * @LastEditors: jiawen.wang
 */
import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'
import { IBaseAsyncThunk } from './interfaces'
import { abi as weirdoAbi } from '../abi/WeirdoContract.json'
import { WeirdoContract } from '../typechain'
import { addresses } from '../constants'
import { BigNumberish, ethers } from 'ethers'
import { RootState } from '../store'
import { setAll } from '../helpers'
export interface IAppData {
    readonly sellStage: number
    readonly loading: boolean
    readonly stockNum: any
    readonly price: BigNumberish
    readonly maxTotalSupply: BigNumberish
    readonly modalShow: boolean
}
export const loadAppDetails = createAsyncThunk('app/loadAppDetails', async ({ networkID, provider }: IBaseAsyncThunk, { dispatch }) => {
    let sellStage = 1
    if (!provider) {
        console.error('failed to connect to provider, please connect your wallet')
        return { sellStage } as IAppData
    }

    const weirdoContract = new ethers.Contract(addresses[networkID].WEIRDO_ADDRESS as string, weirdoAbi, provider) as WeirdoContract

    const state = await weirdoContract.status()
    const stock = await weirdoContract.totalSupply()
    const price = await weirdoContract.PRICE()
    const maxTotalSupply = await weirdoContract.maxTotalSupply()

    sellStage = state
    let stockNum = stock
    return { sellStage, stockNum, price, maxTotalSupply } as IAppData
})
const initialState: IAppData = {
    loading: false,
    sellStage: 0,
    stockNum: 0,
    price: 0,
    maxTotalSupply: 0,
    modalShow: false,
}
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload)
        },
        setShowModal(state, action) {
            state.modalShow = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, state => {
                state.loading = true
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload)
                state.loading = false
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false
                console.error(error.name, error.message, error.stack)
            })
    },
})
const baseInfo = (state: RootState) => state.app
export default appSlice.reducer
export const { fetchAppSuccess, setShowModal } = appSlice.actions

export const getAppState = createSelector(baseInfo, app => app)
