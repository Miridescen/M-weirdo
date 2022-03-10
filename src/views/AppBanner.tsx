/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-25 14:50:44
 * @LastEditTime: 2022-02-09 11:07:47
 * @LastEditors: jiawen.wang
 */
import './style/AppBannerStyle.scss'

import { BuildTwoTone } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { useState } from 'react'
import CustomizedRadios from '../components/Select'
import { useWeb3Context } from '../hooks/web3Context'
import { isPendingTxn, txnButtonText } from '../slices/PendingTxnsSlice'
import { useAppSelector } from '../hooks'
import Web3 from 'web3'
import { ethers } from 'ethers'
import { weirdoPresale, weirdoSale } from '../slices/SellSlice'
import { setShowModal } from '../slices/AppSlice'
import { useDispatch } from 'react-redux'
import { error } from '../slices/MessagesSlice'
import { EnvHelper } from '../helpers/Environment'
import { JsonRpcProvider } from '@ethersproject/providers'
import axios from 'axios'

import { preSale, publicSale } from '../api/request'
function AppBanner() {
    const dispatch = useDispatch()
    const { provider, chainID, currentChainID, address, _switchNet, _addNet } = useWeb3Context()
    const stockNum = useAppSelector(state => {
        return state.app && state.app.stockNum
    })
    const price = useAppSelector(state => {
        return state.app && state.app.price
    })
    const maxTotalSupply = useAppSelector(state => {
        return state.app && state.app.maxTotalSupply
    })
    const sellStage = useAppSelector(state => {
        return state.app && state.app.sellStage
    })
    const [selectState, setSetselectState] = useState(0)
    const web3 = new Web3(Web3.givenProvider)
    const pendingTransactions = useAppSelector(state => {
        return state.pendingTransactions
    })
    const buyNTF = async () => {
        if (!provider) {
            dispatch(error('Please connect your wallet!'))
            return
        }
        if (chainID !== parseInt(EnvHelper.getDefaultChainID())) {
            const switchNet = await _switchNet(EnvHelper.getDefaultChainID16()).catch((err: any) => {
                const addNet = _addNet(EnvHelper.getDefaultChainID16())
            })
            return
        }
        if (!address) {
            return
        }
        if (sellStage === 0) {
            dispatch(error('Public Mint Coming Soon.'))
            return
        } else if (sellStage === 1) {
            try {
                const resp: any = await preSale({
                    num: selectState,
                    address: address,
                })
                if (resp.code !== 200) {
                    dispatch(error(resp.msg))
                    return
                }
                await dispatch(
                    weirdoPresale({
                        amount: selectState,
                        salt: resp.data.salt,
                        token: resp.data.signature.signature,
                        pay: web3.utils.toWei((Number(ethers.utils.formatUnits(price)) * selectState).toString(), 'ether'),
                        provider,
                        address: address,
                        networkID: chainID,
                    }),
                )
            } catch (e) {
                console.log('error', e)
            }
        } else if (sellStage === 2) {
            dispatch(setShowModal(true))
        } else {
            dispatch(error('Sold Out!'))
            return
        }
    }

    return (
        <div className="banner-content" id="home">
            <div className="content">
                <div className="set-left">
                    <h1 className="welcome">Welcome to Weirdo Ghost Gang</h1>
                    <div className="info-content">
                        <div className="info">
                            <h4 className="key">Price</h4>
                            <h2 className="value">{ethers.utils.formatUnits(price)}ETH</h2>
                        </div>
                        <div className="info">
                            <h4 className="key">In Stock</h4>
                            <h2 className="value">
                                {Number(maxTotalSupply.toString()) - stockNum}/{"5555"}
                            </h2>
                        </div>
                    </div>
                    <CustomizedRadios selectState={selectState} changeSelectState={(code: number) => setSetselectState(code)} />

                    <div className="buy" onClick={buyNTF}>
                        SOLD OUT
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppBanner
