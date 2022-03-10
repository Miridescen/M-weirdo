/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-25 14:50:44
 * @LastEditTime: 2022-02-10 09:01:59
 * @LastEditors: jiawen.wang
 */
import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import { Web3ContextProvider } from './hooks/web3Context'

import App from './App'
import store from './store'

const Root: FC = () => {
    return (
        <Web3ContextProvider>
            <Provider store={store}>
                {/*<HashRouter>*/}
                <BrowserRouter>
                    <App />
                </BrowserRouter>
                {/*</HashRouter>*/}
            </Provider>
        </Web3ContextProvider>
    )
}

export default Root
