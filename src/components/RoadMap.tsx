/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-26 10:17:13
 * @LastEditTime: 2022-02-08 09:06:10
 * @LastEditors: jiawen.wang
 */
import { useState } from 'react'
import '../views/style/roadMap.scss'
import q1 from '../assets/icons/q1.png'
import q2 from '../assets/icons/q2.png'
import q3 from '../assets/icons/q3.png'
import q4 from '../assets/icons/q4.png'

function RoadMap() {
    const [season, setSeason] = useState(1)
    return (
        <div className="road-map-box" id="roadmap">
            <div className="road-map-title"></div>
            <div className="road-map-content">
                <div className="left">
                    <span className={`left-text-default ${season === 1 ? 'left-text-light' : 'left-text-dark'}`} onClick={() => setSeason(1)}>
                        2022 Q1
                    </span>
                    <span className={`left-text-default ${season === 2 ? 'left-text-light' : 'left-text-dark'}`} onClick={() => setSeason(2)}>
                        2022 Q2
                    </span>
                    <span className={`left-text-default ${season === 3 ? 'left-text-light' : 'left-text-dark'}`} onClick={() => setSeason(3)}>
                        2022 Q3
                    </span>
                    <span className={`left-text-default ${season === 4 ? 'left-text-light' : 'left-text-dark'}`} onClick={() => setSeason(4)}>
                        2022 Q4
                    </span>
                </div>
                <div className="right">
                    {season === 1 ? (
                        // <div className="q1">
                        //     <div className="q1-left">
                        //         <h1 className="content-title q1-left-title-border">Trying to sell out!</h1>
                        //         <h1 className="content-title">Refund mechanism!</h1>
                        //         <p className="content-text">
                        //             Start the refund mechanism if you don't want to you can choose to be refunded at half the price of mint.
                        //         </p>
                        //     </div>
                        //     <div className="q1-center">
                        //         <h1 className="content-title">NFTX!</h1>
                        //         <p className="content-text">
                        //             Start the refundStart the refund mechanismStart the refundStart t if you don't want toStart the refun you can
                        //             choose to beStart the refu refunded atStart the refundStart t half the price of mint.
                        //         </p>
                        //     </div>
                        //     <div className="q1-right">
                        //         <h1 className="content-title q1-right-title">Donation!</h1>
                        //         <p className="content-text">
                        //             Start the refundStart the mechanismStart the refun if you don’t want toStart t you can choose to beStart refunded
                        //             atStart the refun half the price of mint.
                        //         </p>
                        //     </div>
                        // </div>
                        <img className="q1-img" src={q1} alt="" />
                    ) : season === 2 ? (
                        // <div className="q2">
                        //     <div className="q2-left">
                        //         <h1 className="content-title q2-title">merch!</h1>
                        //         <p className="content-text">Make Weirdo Ghost merch and airdrop them to the holder</p>
                        //         <h1 className="content-title q2-left-title-border">Lil Ghost Evolution Preparing!</h1>
                        //         <p className="content-text">Start preparing for the second season of the little ghost evolution!</p>
                        //     </div>

                        //     <div className="q2-right">
                        //         <h1 className="content-title q2-title">Candy or Poison</h1>
                        //         <p className="content-text">Airdrop candy or poison NFT to the holder(holder's onw choice)</p>
                        //         <h1 className="content-title q2-right-title-border">Hold-to-Earn!</h1>
                        //         <p className="content-text">
                        //             Sleepys personal Social Token release! Start Hold-to-Earn and make retroactive airdrops by "days held" (airdrops
                        //             are available if held)
                        //         </p>
                        //     </div>
                        // </div>
                        <img className="q2-img" src={q2} alt="" />
                    ) : season === 3 ? (
                        <img className="q3-img" src={q3} alt="" />
                    ) : // <div className="q3">
                    //     <div className="q3-item">
                    //         <h1 className="content-title q2-title">Candy or Poison</h1>
                    //         <p className="content-text">
                    //             Sleepys personal Social Token release! Start Hold-to-Earn and make retroactive airdrops by "days held" (airdrops
                    //             are available if held)
                    //         </p>
                    //     </div>
                    //     <div className="q3-item">
                    //         <h1 className="content-title q2-title">Candy or Poison</h1>
                    //         <p className="content-text">
                    //             Sleepys personal Social Token release! Start Hold-to-Earn and make retroactive airdrops by "days held" (airdrops
                    //             are available if held)
                    //         </p>
                    //     </div>
                    //     <div className="q3-item">
                    //         <h1 className="content-title q2-title">Candy or Poison</h1>
                    //         <p className="content-text">
                    //             Sleepys personal Social Token release! Start Hold-to-Earn and make retroactive airdrops by "days held" (airdrops
                    //             are available if held)
                    //         </p>
                    //     </div>
                    //     <div className="q3-item">
                    //         <h1 className="content-title q2-title">Candy or Poison</h1>
                    //         <p className="content-text">
                    //             Sleepys personal Social Token release! Start Hold-to-Earn and make retroactive airdrops by "days held" (airdrops
                    //             are available if held)
                    //         </p>
                    //     </div>
                    // </div>
                    season === 4 ? (
                        <img className="q4-img" src={q4} alt="" />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    )
}

export default RoadMap
