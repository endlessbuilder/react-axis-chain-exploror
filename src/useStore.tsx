import { useSelector, useDispatch } from 'react-redux';
import Config from './config.json'
import Networks from './config/networks.json'
import TestnetNetworks from './config/networks.testnet.json'

import Slice from './reducer'
/* import Web3 						from 'web3' */
export const config = Config
export const DISCONNECTED = '';
export const CONNECTING = 'connecting';
export const CONNECTED = 'connected';
/* export const getWeb3 = ()=>window.Web3; */

const AppKey = process.env.REACT_APP_GTAG || ''
export const proxy = process.env.REACT_APP_ENDPOINT || ''
export const testnet = process.env.REACT_APP_TESTNET === "1"
export const networks = (testnet ? TestnetNetworks : Networks) as { [chain: string]: NetworkType }
export const ZERO = "0x0000000000000000000000000000000000000000"

export const SYMBOL = 'AXIS'

const useStore = () => {
	const G = useSelector((state: StoreObject) => state)
	const dispatch = useDispatch()
	const update = (payload: { [key: string]: any }) => dispatch(Slice.actions.update(payload))
	const addTx = (tx: TxType) => {
		const txs = [tx, ...G.txs]
		if (txs.length > 10) txs.pop()
		window.localStorage.setItem(AppKey, JSON.stringify(txs))
		update({ txs })
	}

	const check = async (network: string, txs: Array<string>): Promise<{ [txId: string]: number }> => {
		const results: { [txId: string]: number } = {}
		return results
	}

	return { ...G, update, check, addTx };
}

export default useStore
