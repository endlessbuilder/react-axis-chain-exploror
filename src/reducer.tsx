import { createSlice } from '@reduxjs/toolkit';

const locales = {
	"en-US": require('./locales/en-US.json'),
	"zh-CN": require('./locales/zh-CN.json'),
};

const lang = window.localStorage.getItem('lang') || 'en-US';
export const DEFAULT_NET = 'ETH'

const AppKey = process.env.REACT_APP_GTAG || ''

let txs = [] as TxType[]
try {
	let buf = window.localStorage.getItem(AppKey)
	if (buf) txs = JSON.parse(buf)
} catch (err) {
	console.log(err)
}

const initialState: StoreObject = {
	theme: '',
	lang,
	L: locales[lang],
	chain: 'ETH',
	page: 0,
	loading: false,
	txs,
}

export default createSlice({
	name: 'bridge',
	initialState,
	reducers: {
		update: (state: any, action) => {
			for (const k in action.payload) {
				if (state[k] === undefined) new Error('🦊 undefined account item')
				state[k] = action.payload[k]
			}
		}
	}
})
