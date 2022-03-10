import "./style/ConnectButtonStyle.scss"
import { useWeb3Context } from "../hooks/web3Context";
import {useCallback, useState, useEffect} from "react";
import { Button } from "@material-ui/core";
function ConnectButton() {
    const { connect, disconnect, connected, web3, chainID } = useWeb3Context();
    const [isConnected, setConnected] = useState(connected);
    const [buttonName, setButtonName] = useState("");
    let handleClick = connect
    let buttonText = "Connect Wallet";
    if (isConnected) {
        buttonText = "Disconnect";
        handleClick = disconnect;
    }

    useEffect(() => {
        setConnected(connected);
    }, [web3, connected]);
    return (
        <button className="connect-button"
                onClick={handleClick}>{buttonText}</button>

    )
}

export default ConnectButton;