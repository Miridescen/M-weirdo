/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-26 15:24:06
 * @LastEditTime: 2022-01-28 17:42:51
 * @LastEditors: jiawen.wang
 */
import './style/AppFooterStyle.scss'
import footerImg from '../assets/icons/footer-logo.png'
function AppFooter() {
    return (
        <div className="app-footer">
            <img className="footer-logo" src={footerImg} alt="" />
            <p className="copyright">© Copyright 2022, Weirdo Ghost Gang. All rights reserved.</p>
        </div>
    )
}

export default AppFooter
