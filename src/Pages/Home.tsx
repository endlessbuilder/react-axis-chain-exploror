import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

import "./Home.scss";
import mockHome from '../mockup/home.json'
import { config } from '../useStore'

const Home = () => {
	const [data,] = React.useState<HomeDataType>(mockHome);

	return (
		<div className='home'>
			<section className='search'>
				<div>
					<h3>Fantom blockchain explorer</h3>
					<div>
						<input type="text" placeholder='Search by Address / Txn Hash / Block / Token' />
						<button><BsSearch /></button>
					</div>
				</div>
			</section>
			<section className='container'>
				<div className='row card'>
					<div className='card-body panel'>
						<div className='card-col'>
							<div className='card-row'>
								<img className='card-icon' src='https://ftmscan.com/images/svg/brands/fantom.svg?v=1.3' alt='Ethereum log'></img>
								<div className='card-content'>
									<span>ftm price</span>
									<Link to="./"><span>$0.358</span> @ <span>0.000001</span>BTC (<span>-13.03</span>%)</Link>
								</div>
							</div>
							<hr className='card-hr'></hr>
							<div className='card-row'>
								<img className='card-icon' src='https://ftmscan.com/images/svg/icons/icon-8.svg' alt='Ethereum log'></img>
								<div className='card-content'>
									<span>ftm price</span>
									<Link to="./"><span>$0.358</span> @ <span>0.000001</span>BTC (<span>-13.03</span>%)</Link>
								</div>
							</div>
						</div>
						<div className='card-col'>
							<div className='card-row'>
								<img className='card-icon' src='https://ftmscan.com/images/svg/icons/icon-2-1.svg?v=1.3' alt='Ethereum log'></img>
								<div className='card-content'>
									<span>ftm price</span>
									<Link to="./"><span>$0.358</span> @ <span>0.000001</span>BTC (<span>-13.03</span>%)</Link>
								</div>
							</div>
							<hr className='card-hr'></hr>
							<div className='card-row'>
								<img className='card-icon' src='https://ftmscan.com/images/svg/icons/icon-51.svg?v=1.6' alt='Ethereum log'></img>
								<div className='card-content'>
									<span>ftm price</span>
									<Link to="./"><span>$0.358</span> @ <span>0.000001</span>BTC (<span>-13.03</span>%)</Link>
								</div>
							</div>
						</div>
						<div className='card-col chart'>
							CHART
						</div>
					</div>
				</div>
				<div className='section-split'>
					<div className='col6'>
						<div className='panel scroll'>
							<div className='panel-header'>
								<h4>Lastest Blocks</h4>
							</div>
							<div className='panel-content grid-col' style={{ height: "400px" }}>
								{
									data.blockList.map((i, k) => (
										<div key={k}>
											<div className='flex'>
												<div className='ls-icon ls-bk sm-hide'>Bk</div>
												<div className='flex'>
													<b className='sm-show'>Block </b>
													<div className='flex dir-col'>
														<Link to={`/block/${i.number}`}>{i.number}</Link>
														<small> 7 secs ago</small>
													</div>
												</div>
											</div>
											<div className='flex dir-col'>
												<span className='ln-br'>Validated By <Link to={`/address/${i.miner}`}>{`${i.miner.slice(0, 6)}...${i.miner.slice(-4)}`}</Link></span>
												<div>
													<Link to={`/txs?block=${i.number}`}>{i.transactionCount} txns</Link>
													<small> in 1 sec</small>
												</div>
											</div>
											<div>
												<small className='ln-br'>{i.rewards} {config.symbol}</small>
											</div>
										</div>
									))
								}
							</div>
							<div className='panel-footer'>
								<Link to="/blocks" className='btn btn-primary btn-block'>View all blocks</Link>
							</div>
						</div>
					</div>
					<div className='col6'>
						<div className='panel scroll'>
							<div className='panel-header'>
								<h4>Lastest Transaction</h4>
							</div>
							<div className='panel-content grid-col' style={{ height: "400px" }}>
								{
									data.transactionList.map((i, k) => (
										<div key={k}>
											<div className='flex'>
												<div className='ls-icon ls-tx sm-hide'>Tx</div>
												<div className='flex'>
													<b className='sm-show'>Transaction </b>
													<div className='flex dir-col'>
														<Link to={`/tx/${i.txId}`}>{`${i.txId.slice(0, 6)}...${i.txId.slice(-4)}`}</Link>
														<small> 7 secs ago</small>
													</div>
												</div>
											</div>
											<div className='flex dir-col'>
												<span className='ln-br'>From <Link to={`/address/${i.from}`}>{`${i.from.slice(0, 6)}...${i.from.slice(-4)}`}</Link></span>
												<span className='ln-br'>To <Link to={`/address/${i.to}`}>{`${i.to.slice(0, 6)}...${i.to.slice(-4)}`}</Link></span>
											</div>
											<div>
												<small>{i.value} {config.symbol}</small>
											</div>
										</div>
									))
								}
							</div>
							<div className='panel-footer'>
								<Link to="/tsx" className='btn btn-primary btn-block'>View all transaction</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div >
	)
};

export default Home;