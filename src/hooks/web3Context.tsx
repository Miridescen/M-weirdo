import React, { useState, ReactElement, useContext, useEffect, useMemo, useCallback } from 'react'
import Web3Modal from 'web3modal'
import { StaticJsonRpcProvider, JsonRpcProvider, Web3Provider, getNetwork, Provider, BaseProvider } from '@ethersproject/providers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { IFrameEthereumProvider } from '@ledgerhq/iframe-provider'
import { EnvHelper } from '../helpers/Environment'

/**
 * kept as function to mimic `getAvaxNetURI()`
 * @returns string
 */
function getMainNetURI() {
    return EnvHelper.alchemyMainnetURI
}
function getTestnetURI() {
    return EnvHelper.alchemyGoerliTestURI
}
/**
 * determine if in IFrame for Ledger Live
 */
function isIframe() {
    return window.location !== window.parent.location
}
/*
  Types
*/
type onChainProvider = {
    connect: () => Promise<Web3Provider | undefined>
    disconnect: () => void
    hasCachedProvider: () => boolean
    address: string
    chainID: number
    connected: boolean
    provider: JsonRpcProvider
    uri: string
    web3Modal: Web3Modal
    _switchNet: Function
    _addNet: Function
    currentChainID: number
}

export type Web3ContextData = {
    onChainProvider: onChainProvider
} | null

const Web3Context = React.createContext<Web3ContextData>(null)

export const useWeb3Context = () => {
    const web3Context = useContext(Web3Context)
    if (!web3Context) {
        throw new Error('useWeb3Context() can only be used inside of <Web3ContextProvider />, ' + 'please declare it at a higher level.')
    }
    const { onChainProvider } = web3Context
    return useMemo<onChainProvider>(() => {
        return { ...onChainProvider }
    }, [web3Context])
}

export const useAddress = () => {
    const { address } = useWeb3Context()
    return address
}

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
    const [connected, setConnected] = useState(false)
    // NOTE (appleseed): if you are testing on avax you need to set chainId ===5 as the default for non-connected wallet testing...
    // ... you also need to set getAvaxTestnetURI() as the default uri state below
    const [currentChainID, setCurrentChainID] = useState(0)
    const [chainID, setChainID] = useState(parseInt(EnvHelper.getDefaultChainID() as string))
    const [address, setAddress] = useState('')

    const [uri, setUri] = useState(EnvHelper.getDefaultChainRPC() as string)

    const [provider, setProvider] = useState<JsonRpcProvider>(new StaticJsonRpcProvider(uri))

    const [web3Modal, setWeb3Modal] = useState<Web3Modal>(
        new Web3Modal({
            cacheProvider: true, // optional
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,

                    options: {
                        rpc: {
                            1: getMainNetURI(),
                            5: getTestnetURI(),
                        },
                    },
                },
            },
        }),
    )

    const hasCachedProvider = (): boolean => {
        if (!web3Modal) return false
        if (!web3Modal.cachedProvider) return false
        return true
    }

    // NOTE (appleseed): none of these listeners are needed for Backend API Providers
    // ... so I changed these listeners so that they only apply to walletProviders, eliminating
    // ... polling to the backend providers for network changes
    const _initListeners = useCallback(
        rawProvider => {
            if (!rawProvider.on) {
                return
            }
            rawProvider.on('accountsChanged', async (accounts: string[]) => {
                setTimeout(() => window.location.reload(), 1)
            })

            rawProvider.on('chainChanged', async (chain: number) => {
                _checkNetwork(chain)
                setTimeout(() => window.location.reload(), 1)
            })

            rawProvider.on('network', (_newNetwork: any, oldNetwork: any) => {
                if (!oldNetwork) return
                window.location.reload()
            })
        },
        [provider],
    )

    const _switchNet = async (chainId: string) => {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [
                {
                    chainId: chainId,
                },
            ],
        })
    }
    const _addNet = async (chainId: Number) => {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: chainId,
                    rpcUrls: [EnvHelper.getDefaultChainRPC()],
                    chainName: EnvHelper.getDefaultChainName(),
                    nativeCurrency: {
                        name: 'ETH',
                        decimals: 18,
                        symbol: 'ETH',
                    },
                    blockExplorerUrls: [EnvHelper.getDefaultChainBlock()],
                },
            ],
        })
    }
    /**
     * throws an error if networkID is not 43114 (avax) or 43113 (avax test)
     */
    const _checkNetwork = (otherChainID: number): boolean => {
        if (chainID !== otherChainID) {
            // console.warn("You are switching networks");
            if (otherChainID === 1 || otherChainID === 5) {
                setChainID(otherChainID)
                setUri(EnvHelper.getDefaultChainRPC())
                return true
            }
            return false
        }
        return true
    }

    // connect - only runs for WalletProviders
    const connect = useCallback(async () => {
        // handling Ledger Live;
        let rawProvider
        if (isIframe()) {
            rawProvider = new IFrameEthereumProvider()
        } else {
            rawProvider = await web3Modal.connect()
        }

        // new _initListeners implementation matches Web3Modal Docs
        // ... see here: https://github.com/Web3Modal/web3modal/blob/2ff929d0e99df5edf6bb9e88cff338ba6d8a3991/example/src/App.tsx#L185
        _initListeners(rawProvider)
        const connectedProvider = new Web3Provider(rawProvider, 'any')
        const chainId = await connectedProvider.getNetwork().then(network => network.chainId)
        console.log('chainId: ', chainId)
        const connectedAddress = await connectedProvider.getSigner().getAddress()
        const validNetwork = _checkNetwork(chainId)
        if (!validNetwork) {
            console.error('Wrong network, please switch to ETH mainnet')
            // return
        }
        // Save everything after we've validated the right network.
        // Eventually we'll be fine without doing network validations.
        setAddress(connectedAddress)
        setProvider(connectedProvider)

        setCurrentChainID(parseInt(chainId + ''))
        setChainID(parseInt(chainId + ''))

        // Keep this at the bottom of the method, to ensure any repaints have the data we need
        setConnected(true)
        return connectedProvider
    }, [provider, web3Modal, connected])

    const disconnect = useCallback(async () => {
        let rawProvider = await web3Modal.connect()
        if (rawProvider.wc) {
            rawProvider.wc.killSession()
        }
        web3Modal.clearCachedProvider()
        setConnected(false)

        setTimeout(() => {
            window.location.reload()
        }, 1)
    }, [provider, web3Modal, connected])

    const onChainProvider = useMemo<onChainProvider>(
        () => ({
            connect,
            disconnect,
            hasCachedProvider,
            provider,
            connected,
            address,
            chainID,
            web3Modal,
            uri,
            _switchNet,
            _addNet,
            currentChainID,
        }),
        [connect, disconnect, hasCachedProvider, provider, connected, address, chainID, web3Modal, uri, _switchNet, _addNet, currentChainID],
    )

    useEffect(() => {
        // logs non-functioning nodes && returns an array of working mainnet nodes
    }, [])

    return <Web3Context.Provider value={{ onChainProvider }}>{children}</Web3Context.Provider>
}
