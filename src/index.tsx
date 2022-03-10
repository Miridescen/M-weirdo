import ReactDOM from "react-dom";
import Root from "./Root";

import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import { Web3ContextProvider } from './hooks/web3Context'

import App from './App'
import store from './store'

// const Root: FC = () => {
//     return (
        
//     )
// }


ReactDOM.render(
<Web3ContextProvider>
    <Provider store={store}>
        {/*<HashRouter>*/}
        <BrowserRouter>
            <App />
        </BrowserRouter>
        {/*</HashRouter>*/}
    </Provider>
</Web3ContextProvider>,
 document.getElementById("root"));
