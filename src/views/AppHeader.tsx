/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-25 14:50:44
 * @LastEditTime: 2022-02-10 17:23:33
 * @LastEditors: jiawen.wang
 */
import React, { useEffect, useState } from 'react'
import './AppHeader.scss'
import classNames from 'classnames'
import HeadLinkList from './HeadLinkList'
import ConnectButton from './ConnectButton'
import logo from '../assets/icons/head-logo.png'
import _ from 'lodash'

function AppHeader() {
    const [selectTab, setSelectTab] = useState('home')
    const handleScroll = (event: any) => {
        let timeOut
        if (timeOut) {
            clearTimeout(timeOut)
        }
        timeOut = setTimeout(() => {
            let scrollTop =
                (event.srcElement ? event.srcElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.scrollTop : 0)
            // console.log('scrollTop: ', scrollTop)
            let bannerHeight = document.getElementsByClassName('banner-content')[0].clientHeight
            let worksHeight = document.getElementsByClassName('loop-swiper')[0].clientHeight
            let roadmapHeight = document.getElementsByClassName('road-map-box')[0].clientHeight
            let scrollHeight = document.documentElement.scrollHeight
            let clientHeight = document.documentElement.clientHeight
            if (!scrollTop) {
                scrollTop = 1
            }
            if (scrollTop && scrollTop < bannerHeight) {
                setSelectTab('home')
            } else if (scrollTop >= bannerHeight && scrollTop < bannerHeight + worksHeight) {
                setSelectTab('works')
            } else if (scrollTop >= bannerHeight + worksHeight && scrollTop < scrollHeight - clientHeight) {
                setSelectTab('roadmap')
            } else {
                setSelectTab('team')
            }
        }, 200)
    }
    const handleTabClick = (tabStr: string) => {
        window.removeEventListener('scroll', _.throttle(handleScroll, 100))
        ;(document as any).getElementById(tabStr).scrollIntoView()
        // setSelectTab(tabStr)
    }
    useEffect(() => {
        window.addEventListener('scroll', _.throttle(handleScroll, 100))
        return () => {
            window.removeEventListener('scroll', _.throttle(handleScroll, 100))
        }
    }, [])

    return (
        <div className="app-head">
            <div className="head-content">
                <div className="header-left">
                    <img className="logo" src={logo} alt="weirdoghostgang" />
                    <div className="tab-list">
                        <span
                            className={classNames('name', { 'name-underline': selectTab === 'home' })}
                            onClick={e => {
                                handleTabClick('home')
                            }}
                        >
                            Home
                        </span>
                        <span
                            className={classNames('name', { 'name-underline': selectTab === 'works' })}
                            onClick={e => {
                                handleTabClick('works')
                            }}
                        >
                            Works
                        </span>
                        <span
                            className={classNames('name', { 'name-underline': selectTab === 'roadmap' })}
                            onClick={e => {
                                handleTabClick('roadmap')
                            }}
                        >
                            Roadmap
                        </span>
                        <span
                            className={classNames('name', { 'name-underline': selectTab === 'team' })}
                            onClick={e => {
                                handleTabClick('team')
                            }}
                        >
                            Team
                        </span>
                        {/* <span
                        className={classNames('name', { 'name-underline': selectTab === 'partner' })}
                        onClick={e => {
                            handleTabClick('partner')
                        }}
                    >
                        Partner
                    </span> */}
                    </div>
                </div>
                <div className="header-right">
                    <HeadLinkList />
                    <ConnectButton />
                </div>
            </div>
        </div>
    )
}

export default AppHeader
