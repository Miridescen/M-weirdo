/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-25 17:28:22
 * @LastEditTime: 2022-01-29 11:47:07
 * @LastEditors: jiawen.wang
 */
import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers'

export interface IJsonRPCErrorData {
    readonly message: string
    readonly code: number
}

export interface IJsonRPCError {
    readonly message: string
    readonly code: number
    readonly data: IJsonRPCErrorData
}

export interface IBaseAsyncThunk {
    readonly networkID: number
    readonly provider: StaticJsonRpcProvider | JsonRpcProvider
}

export interface IWeirdoPresaleThunk extends IBaseAsyncThunk {
    readonly token: string
    readonly address: string
    readonly amount: any
    readonly pay: any
    readonly salt: string
}

export interface IWeirdoSaleThunk extends IBaseAsyncThunk {
    readonly address: string
    readonly amount: any
    readonly pay: any
    readonly token: string
    readonly salt: string
}

export interface IChangeApprovalAsyncThunk extends IBaseAsyncThunk {
    readonly token: string
    readonly address: string
}

export interface IActionAsyncThunk extends IBaseAsyncThunk {
    readonly action: string
    readonly address: string
}

export interface IValueAsyncThunk extends IBaseAsyncThunk {
    readonly value: string
    readonly address: string
}

export interface IActionValueAsyncThunk extends IValueAsyncThunk {
    readonly action: string
}

export interface IActionValueGasAsyncThunk extends IActionValueAsyncThunk {
    readonly gas: number
}

export interface IBaseAddressAsyncThunk extends IBaseAsyncThunk {
    readonly address: string
}

export interface IZapAsyncThunk extends IBaseAddressAsyncThunk {
    readonly tokenAddress: string
    readonly sellAmount: number
    readonly slippage: number
}

// Account Slice
