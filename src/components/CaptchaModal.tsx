/*
 * @Author: jianwen.Wang
 * @Date: 2022-02-08 09:53:36
 * @LastEditTime: 2022-02-10 11:19:10
 * @LastEditors: jiawen.wang
 */
import React, { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { useMemo } from 'react'
import './captchaModal.scss'
import { Button } from '@material-ui/core'
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
import { preSale, getRandom, publicSale } from '../api/request'
import wordPic from '../assets/icons/word_pic.png'
import CaptchInput from './CaptchInput'

export default function CaptchaModal() {
    const dispatch = useDispatch()

    const { provider, chainID, currentChainID, address, _switchNet, _addNet } = useWeb3Context()
    const [selectState, setSetselectState] = useState(1)
    const sellStage = useAppSelector(state => {
        return state.app && state.app.sellStage
    })
    const pendingTransactions = useAppSelector(state => {
        return state.pendingTransactions
    })
    const price = useAppSelector(state => {
        return state.app && state.app.price
    })
    const web3 = new Web3(Web3.givenProvider)

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
        try {
            const resp: any = await publicSale({
                answer: inputbox.toLowerCase(),
                address: address,
            })
            dispatch(setShowModal(false))
            if (resp.code !== 200) {
                dispatch(error(resp.msg))
                return
            }
            await dispatch(
                weirdoSale({
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
    }
    const [topicUrl, setTopicUrl] = useState('')

    useEffect(() => {
        const getTopicUrl = async () => {
            const topicUrl = await getRandom({ address })
            setTopicUrl(topicUrl.data.question)
        }
        getTopicUrl()
    }, [])
    const close = () => {
        dispatch(setShowModal(false))
    }
    const [inputbox, setInputbox] = useState<string>('')
    const changeInputWord = useCallback((word: string) => setInputbox(word), [])
    return (
        <div className="captcha-modal">
            <div className="modal-container">
                <button className="close-icon" onClick={() => close()}></button>
                <img className="word-pic" src={wordPic} alt="" />
                {topicUrl && <img className="topic-pic" src={`http://weirdoghost.com/img/${topicUrl}.png`} alt="" />}
                <CaptchInput inputbox={inputbox} changeInputWord={changeInputWord} />
                <Button className="buy" onClick={buyNTF} disabled={isPendingTxn(pendingTransactions, 'weirdo_presale')}>
                    <div>{txnButtonText(pendingTransactions, 'weirdo_presale', `submit`)}</div>
                    {!isPendingTxn(pendingTransactions, 'weirdo_presale')}
                </Button>
            </div>
        </div>
    )
}
