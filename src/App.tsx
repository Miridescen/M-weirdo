/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-25 14:50:44
 * @LastEditTime: 2022-02-10 16:26:57
 * @LastEditors: jiawen.wang
 */
// eslint-disable-next-line no-unused-vars

import React, { useCallback } from 'react'
import './index.scss'

import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useWeb3Context } from './hooks/web3Context'
import { loadAppDetails } from './slices/AppSlice'
import Messages from './components/Messages/Messages'

import AppHeader from './views/AppHeader'
import AppBanner from './views/AppBanner'
import LoopSwiper from './components/LoopSwiper'
import RoadMap from './components/RoadMap'
import AppTeam from './views/AppTeam'
import AppFooter from './views/AppFooter'
import CaptchaModal from './components/CaptchaModal'

import newPage from "./assets/icons/new_page.jpg"
import newPageM from "./assets/icons/new_page_m.jpg"

// import vconsole from 'vconsole'
import { useAppSelector } from './hooks'
// new vconsole()

function App() {
    // const dispatch = useDispatch()
    // const [walletChecked, setWalletChecked] = useState(false)
    // const { connect, hasCachedProvider, provider, chainID, connected, address } = useWeb3Context()
    // console.log('chainID', chainID, 'address', address)
    // const modalShow = useAppSelector(state => {
    //     return state.app && state.app.modalShow
    // })
    // const loadApp = useCallback(
    //     loadProvider => {
    //         dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }))
    //     },
    //     [connected],
    // )
    // loadApp(provider)
    // useEffect(() => {
    //     if (hasCachedProvider()) {
    //         connect().then(() => {
    //             setWalletChecked(true)
    //         })
    //     } else {
    //         setWalletChecked(true)
    //     }
    // }, [])
    // useEffect(() => {
    //     if (walletChecked) {
    //         loadApp(provider)
    //     }
    // }, [walletChecked])

    return (
     <>
       {/* <img src={newPage} className="new-page"  alt="" />
       <img src={newPageM} className="new-page"  alt="" /> */}

        {/* <CaptchaModal /> */}

            {/* <Messages />
            {modalShow && <CaptchaModal />}
            <AppHeader />
            <AppBanner />
            <LoopSwiper />
            <RoadMap />
            <AppTeam />
            <AppFooter /> */}
     </>
          


           

    )
}

export default App
