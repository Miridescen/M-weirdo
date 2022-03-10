/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-26 09:39:03
 * @LastEditTime: 2022-02-09 14:25:48
 * @LastEditors: jiawen.wang
 */
import '../views/style/loopSwiper.scss'
import loop_img0 from '../assets/icon_img/0.png'
import loop_img1 from '../assets/icon_img/1.png'
import loop_img2 from '../assets/icon_img/2.png'
import loop_img3 from '../assets/icon_img/3.png'
import loop_img4 from '../assets/icon_img/4.png'
import loop_img6 from '../assets/icon_img/6.png'
import loop_img7 from '../assets/icon_img/7.png'
import loop_img10 from '../assets/icon_img/10.png'
import loop_img11 from '../assets/icon_img/11.png'
import loop_img12 from '../assets/icon_img/12.png'

import loop_img13 from '../assets/icon_img/13.png'
import loop_img14 from '../assets/icon_img/14.png'
import loop_img15 from '../assets/icon_img/15.png'
import loop_img16 from '../assets/icon_img/16.png'
import loop_img17 from '../assets/icon_img/17.png'
import loop_img18 from '../assets/icon_img/18.png'
import loop_img19 from '../assets/icon_img/19.png'
import loop_img20 from '../assets/icon_img/20.png'
import loop_img21 from '../assets/icon_img/21.png'
import loop_img22 from '../assets/icon_img/22.png'

import loop_img23 from '../assets/icon_img/23.png'
import loop_img24 from '../assets/icon_img/24.png'
import loop_img25 from '../assets/icon_img/25.png'
import loop_img27 from '../assets/icon_img/27.png'
import loop_img28 from '../assets/icon_img/28.png'
import loop_img29 from '../assets/icon_img/29.png'
import loop_img30 from '../assets/icon_img/30.png'
import loop_img31 from '../assets/icon_img/31.png'
import loop_img32 from '../assets/icon_img/32.png'
import loop_img33 from '../assets/icon_img/33.png'

import loop_img34 from '../assets/icon_img/34.png'
import loop_img36 from '../assets/icon_img/36.png'
import loop_img37 from '../assets/icon_img/37.png'
import loop_img38 from '../assets/icon_img/38.png'
import loop_img39 from '../assets/icon_img/39.png'
import loop_img40 from '../assets/icon_img/40.png'
import loop_img41 from '../assets/icon_img/41.png'
import loop_img42 from '../assets/icon_img/42.png'
import loop_img44 from '../assets/icon_img/44.png'
import loop_img45 from '../assets/icon_img/45.png'

import loop_img46 from '../assets/icon_img/46.png'
import loop_img47 from '../assets/icon_img/47.png'
import loop_img48 from '../assets/icon_img/48.png'
import loop_img49 from '../assets/icon_img/49.png'
import loop_img51 from '../assets/icon_img/51.png'
import loop_img52 from '../assets/icon_img/52.png'
import loop_img53 from '../assets/icon_img/53.png'
import loop_img54 from '../assets/icon_img/54.png'
import loop_img55 from '../assets/icon_img/55.png'
import loop_img56 from '../assets/icon_img/56.png'
import { useEffect, useRef } from 'react'

function LoopSwiper() {
    const loopImg = [
        loop_img0,
        loop_img1,
        loop_img2,
        loop_img3,
        loop_img4,
        loop_img6,
        loop_img7,
        loop_img10,
        loop_img11,
        loop_img12,
        loop_img13,
        loop_img14,
        loop_img15,
        loop_img16,
        loop_img17,
        loop_img18,
        loop_img19,
        loop_img20,
        loop_img21,
        loop_img22,
        loop_img23,
        loop_img24,
        loop_img25,
        loop_img27,
        loop_img28,
        loop_img29,
        loop_img30,
        loop_img31,
        loop_img32,
        loop_img33,
        loop_img34,
        loop_img36,
        loop_img37,
        loop_img38,
        loop_img39,
        loop_img40,
        loop_img41,
        loop_img42,
        loop_img44,
        loop_img45,
        loop_img46,
        loop_img47,
        loop_img48,
        loop_img49,
        loop_img51,
        loop_img52,
        loop_img53,
        loop_img54,
        loop_img55,
        loop_img56
    ]
    const main = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (main && main.current != null) {
            if (document.documentElement.clientWidth > 1920) {
                main.current.style.setProperty('--screen-width', -13750 + 1920 + 'px')
            } else {
                main.current.style.setProperty('--screen-width', -13750 + document.documentElement.clientWidth + 'px')
            }
        }
    }, [])
    return (
        <div className="loop-swiper" id="works">
            <div className="work-title"></div>
            <div className="loop-part" id="loop-part" ref={main}>
                {loopImg.map((item, index) => {
                    return <img src={item} alt="" key={index} />
                })}

                {/* <img src={loop_img0} alt="" />
                <img src={loop_img1} alt="" />
                <img src={loop_img2} alt="" />
                <img src={loop_img3} alt="" />
                <img src={loop_img4} alt="" />
                <img src={loop_img6} alt="" />
                <img src={loop_img7} alt="" />
                <img src={loop_img10} alt="" />
                <img src={loop_img11} alt="" />
                <img src={loop_img12} alt="" /> */}
            </div>
        </div>
    )
}

export default LoopSwiper
