import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UseWalletProvider } from 'use-wallet'
import useStore, { networks } from './useStore';
import mapping from './RouterMapping'
import Layout from './components/Layout';
import NoPage from './Pages/404';


function App() {
	const { chain } = useStore()

	const chainId = networks[chain].chainId
	const rpcUrl = networks[chain].rpc
	return (
		<UseWalletProvider
			chainId={chainId}
			connectors={{
				portis: { dAppId: 'my-dapp-id-123-xyz' },

				injected: {
					chainId,
					supportedChainIds: [chainId], //, NETWORK_CHAIN_IDS.mainnet
				},

				walletlink: {
					chainId: 1,
					url: rpcUrl,
					appName: "AxisChain Bridge",
				},

				walletconnect: {
					rpcUrl
					// rpc: { [chainId]: rpcUrl }
				},
			}}
		>
			<BrowserRouter>
				<Switch>
					{
						Object.keys(mapping).map((url, k) => {
							const Component = mapping[url];
							return <Route exact key={k} path={url} component={() => <Layout><Component /></Layout>} />
						})
					}
				</Switch>
				<ToastContainer />
			</BrowserRouter>
		</UseWalletProvider >
	);
}

export default App;
