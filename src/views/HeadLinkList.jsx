/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-25 14:50:44
 * @LastEditTime: 2022-02-08 09:32:44
 * @LastEditors: jiawen.wang
 */
import twitterImg from '../assets/icons/header-twitter.png'
import discoverImg from '../assets/icons/header-discord.png'
import openseaImg from '../assets/icons/header-opensea.png'
import lookImg from '../assets/icons/header-looksrare.png'
import './style/HeadLinkListStyle.scss'

function HeadLinkList() {
    const link = [
        {
            id: 1,
            name: 'twitter',
            href: 'https://twitter.com/WeirdoGhostGang',
            lightImg: twitterImg,
        },
        {
            id: 2,
            name: 'discord',
            href: 'https://discord.com/invite/weirdoghost',
            lightImg: discoverImg,
        },
        {
            id: 3,
            name: 'opensea',
            href: 'https://opensea.io/collection/the-weirdo-ghost-gang',
            lightImg: openseaImg,
        },
        {
            id: 4,
            name: 'looksrare',
            href: 'https://looksrare.org/collections/0x9401518f4EBBA857BAA879D9f76E1Cc8b31ed197',
            lightImg: lookImg,
        },
    ]
    const buttonGround = function (url) {
        return {
            backgroundImage: 'url(' + url + ')',
        }
    }
    const turnPage = url => {
        window.open(url)
    }
    return (
        <nav className="head-link">
            {link.map((item, index) => {
                return (
                    <button
                        key={index}
                        className="link-button"
                        style={buttonGround(item.lightImg)}
                        onClick={() => turnPage(item.href)}
                        alt=""
                    ></button>
                )
            })}
        </nav>
    )
}

export default HeadLinkList
