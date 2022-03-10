/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-25 17:28:22
 * @LastEditTime: 2022-02-08 10:20:57
 * @LastEditors: jiawen.wang
 */
import { IJsonRPCError, IWeirdoPresaleThunk, IWeirdoSaleThunk } from './interfaces'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { ethers, BigNumber } from 'ethers'
import { addresses } from '../constants'
import { WeirdoContract } from '../typechain'
import { error, info } from './MessagesSlice'
import { clearPendingTxn, fetchPendingTxns } from './PendingTxnsSlice'
import { abi as weirdoAbi } from '../abi/WeirdoContract.json'
import Web3 from 'web3'
import {setShowModal} from "./AppSlice";

const web3 = new Web3(Web3.givenProvider)

export const weirdoPresale = createAsyncThunk(
    'weirdo/weirdoPresale',
    async ({ amount, salt, token, pay, provider, address, networkID }: IWeirdoPresaleThunk, { dispatch }) => {
        console.log('{ amount, salt, token, pay, provider, address, networkID }: ', { amount, salt, token, pay, provider, address, networkID })
        if (!provider) {
            dispatch(error('Please connect your wallet!'))
            return
        }
        const signer = provider.getSigner()

        const weirdoContract = new ethers.Contract(addresses[networkID].WEIRDO_ADDRESS as string, weirdoAbi, signer) as WeirdoContract
        let presaleTx
        try {
            presaleTx = await weirdoContract.preSaleMint(amount, salt, token, {
                value: pay,
                gasLimit: 150000,
            })
            const text = 'weirdo'
            const pendingTxnType = 'weirdo_presale'
            if (presaleTx) {
                dispatch(fetchPendingTxns({ txnHash: presaleTx.hash, text, type: pendingTxnType }))
                await presaleTx.wait()
            }
        } catch (e: unknown) {
            console.log(e)
            let err = e as IJsonRPCError;
            if (err.code == 4001){
                dispatch(error(err.message))
                return
            }
            dispatch(error("The quantity exceeds the limit."))
            return
        } finally {
            if (presaleTx) {
                dispatch(clearPendingTxn(presaleTx.hash))
            }
        }
    },
)

export const weirdoSale = createAsyncThunk(
    'weirdo/weirdoSale',
    async ({ amount, salt, token, pay, provider, address, networkID }: IWeirdoSaleThunk, { dispatch }) => {
        if (!provider) {
            dispatch(error('Please connect your wallet!'))
            return
        }
        const signer = provider.getSigner()
        const weirdoContract = new ethers.Contract(addresses[networkID].WEIRDO_ADDRESS as string, weirdoAbi, signer) as WeirdoContract
        let presaleTx
        try {
            presaleTx = await weirdoContract.mint(amount, salt,token, {
                value: pay,
                gasLimit: 150000,
            })
            const text = 'weirdo'
            const pendingTxnType = 'weirdo_presale'
            if (presaleTx) {
                dispatch(fetchPendingTxns({ txnHash: presaleTx.hash, text, type: pendingTxnType }))
                await presaleTx.wait()
            }
        } catch (e: unknown) {
            console.log(e)
            let err = e as IJsonRPCError;
            if (err.code == 4001){
                dispatch(error(err.message))
                return
            }
            dispatch(error("The quantity exceeds the limit."))
            return
        } finally {
            dispatch(setShowModal(false))
            if (presaleTx) {
                dispatch(clearPendingTxn(presaleTx.hash))
            }
        }
    },
)
