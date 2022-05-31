import React from 'react';
import { Link } from "react-router-dom";
import { FaSun } from "react-icons/fa";
import { BsPersonCircle, BsChevronDown } from "react-icons/bs";
import useStore from '../useStore';

import "./Layout.scss";
import { config } from '../useStore'

interface LayoutStatus {
    hamburger: boolean,
    dropdownActive: number
}

const Layout = (props: any) => {
    const { theme, update } = useStore()

    const [status, setStatus] = React.useState<LayoutStatus>({
        hamburger: false,
        dropdownActive: -1
    });
    return (
        <div className={`${theme} ${status.hamburger ? "open-menu" : ""}`}>
            <header>
                <section className="header">
                    <Link className="logo" to="/">
                        <img src="/logo.svg" alt="logo" width="44px" />
                        <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 12" width="140">
                            <path fill="currentColor" d="m14.8 9.5h-8.6l-1.4 2.3h-4.1l7.5-11.6h4.6l7.5 11.6h-4.1zm-1.6-2.4l-2.7-4.5-2.8 4.5zm12.6-7l4.8 4 4.9-4h5l-7.2 5.8 7.2 5.8h-5.2l-4.7-3.9-4.9 3.9h-5.1l7.2-5.7-7.2-5.9zm16.2 11.6v-11.6h3.4v11.6zm13.5 0.2c-2.9 0-6.2-0.4-8.3-0.9l0.5-2.7c2.4 0.5 5.3 0.9 8.7 0.9 2.8 0 3.2-0.2 3.2-0.9 0-0.7-0.4-0.8-1.3-0.9l-6.4-0.3c-3.6-0.2-4.9-1.4-4.9-3.5 0-2.6 2.3-3.7 7.7-3.7 2 0 5.4 0.4 7.6 0.9l-0.5 2.6c-2-0.4-5-0.8-7.9-0.8-3.2 0-3.6 0.2-3.6 0.9 0 0.6 0.4 0.8 1.5 0.8l6.3 0.4c3.3 0.2 4.8 1.3 4.8 3.7 0 2.5-1.7 3.5-7.4 3.5zm17.1-1.3c2.8 0 5.7-0.6 7.6-1l0.3 1.3c-2.2 0.5-5.2 1-7.9 1-5.6 0-8.1-1.9-8.1-6 0-4 2.5-5.9 8.1-5.9 2.7 0 5.7 0.4 7.9 1l-0.3 1.3c-1.9-0.4-4.8-1-7.6-1-4.9 0-6.5 1.5-6.5 4.6 0 3.1 1.6 4.7 6.5 4.7zm10.1 1.1v-11.6h1.5v4.9h12.4v-4.9h1.6v11.6h-1.6v-5.4h-12.4v5.4zm31.5-2.8h-10.8l-2 2.8h-1.9l8.3-11.6h2l8.3 11.6h-1.9zm-0.8-1.1l-4.6-6.6-4.7 6.6zm6 3.9v-11.6h1.6v11.6zm4.1 0v-11.6h1.8l12.6 10v-10h1.5v11.6h-1.7l-12.7-10v10z" />
                        </svg>
                    </Link>
                    <menu>
                        <button className="hamburger" onClick={() => setStatus({ ...status, hamburger: !status.hamburger })}><span></span></button>
                        <ul className="menu">
                            <li><Link to="/">Home</Link></li>
                            <li>
                                <button className={status.dropdownActive === 1 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 1 ? -1 : 1) })}>Blockchain<BsChevronDown size="0.5em" /></button>
                                <div className='sub-menu'>
                                    <div className='common'>
                                        <div className='flex flex-direction-col'>
                                            <Link to="/accounts">Top Accounts</Link>
                                        </div>
                                        <div className='flex flex-direction-col'>
                                            <Link to="/txs">View Txns</Link>
                                            <Link to="/txsPending">View Pending Txns</Link>
                                            <Link to="/txsInternal">View Contact Internal Txns</Link>
                                        </div>
                                        <div className='flex flex-direction-col'>
                                            <Link to="/blocks">View Blocks</Link>
                                            <Link to="/contractsVerified">Verified Contracts</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className={status.dropdownActive === 2 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 2 ? -1 : 2) })}>Staking<BsChevronDown size="0.5em" /></button>
                                <div className="sub-menu">
                                    <div className='common'>
                                        <div className='flex flex-direction-col'>
                                            <Link to="/validators">Validators Leaderboard</Link>
                                            <Link to="/epochs">Epochs</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className={status.dropdownActive === 3 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 3 ? -1 : 3) })}>Tokens<BsChevronDown size="0.5em" /></button>
                                <div className="sub-menu">
                                    <div className='common'>
                                        <div className='flex flex-direction-col'>
                                            <Link to="/tokens">ERC-20 Top Tokens</Link>
                                            <Link to="/tokentxns">View ERC-20 Transfer</Link>
                                        </div>
                                        <div className='flex flex-direction-col'>
                                            <Link to="/tokens-nft">ERC721 Top Tokens</Link>
                                            <Link to="/tokentxns-nft">View ERC721 Transfer</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className={status.dropdownActive === 4 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 4 ? -1 : 4) })}>Resources<BsChevronDown size="0.5em" /></button>
                                <div className="sub-menu">
                                    <div className='common'>
                                        <div className='flex flex-direction-col'>
                                            <Link to="/charts">Charts & Stats</Link>
                                            <Link to="/topstat">Top Statistics</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className={status.dropdownActive === 5 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 5 ? -1 : 5) })}>More<BsChevronDown size="0.5em" /></button>
                                <div className='sub-menu section-split'>
                                    <div className='col6'>
                                        <span><b>Developers</b></span>
                                        <ul>
                                            <li><Link to="https://docs.axisscan.com/">{/*<BsChevronRight size="0.7em" />&nbsp;*/}API Documentation</Link></li>
                                            <li><Link to="/verifyContract">{/*<BsChevronRight size="0.7em" />&nbsp;*/}Verify Contract</Link></li>
                                            <li><Link to="/opcode-tool">{/*<BsChevronRight size="0.7em" />&nbsp;*/}Byte to Opcode</Link></li>
                                            <li><Link to="/pushTx">{/*<BsChevronRight size="0.7em" />&nbsp;*/}Broadcast TXN</Link></li>
                                            <li><Link to="/vyper">{/*<BsChevronRight size="0.7em" />&nbsp;*/}Vyper Online Compiler</Link></li>
                                        </ul>
                                    </div>
                                    <div className='col6'>
                                        <span><b>Tools</b></span>
                                        <ul>
                                            <li><Link to="/labelcloud">{/*<BsChevronRight size="0.7em" />&nbsp;*/}Label Word Cloud</Link></li>
                                            <li><Link to="/tokenapprovalchecker">{/*<BsChevronRight size="0.7em" />&nbsp;*/}Token Approvals</Link></li>
                                            <li><Link to="/gastracker">{/*<BsChevronRight size="0.7em" />&nbsp;*/}Gas Tracker</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li className="log-item"><Link to="/login"><BsPersonCircle />&nbsp;Sign In</Link></li>
                            <li>
                                <button className={status.dropdownActive === 6 ? "pushed" : ""} onClick={() => setStatus({ ...status, dropdownActive: (status.dropdownActive === 6 ? -1 : 6) })}><img src='/logo.svg' width="20px" alt='Logo' /></button>
                                <div className="sub-menu">
                                    <div className='common'>
                                        <div className='flex flex-direction-col'>
                                            <Link to="https://axisscan.com">{config.symbol} Mainnet</Link>
                                            <Link to="https://testnet.axisscan.com">{config.symbol} Testnet</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </menu>
                </section>
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                <section>
                    <div className="footer-content">
                        <div>
                            <Link to="/"><img src="/logo.svg" style={{ height: '100px' }} alt="logo" /></Link>
                        </div>
                        <div>
                            <button className="btn btn-info btn-sm" onClick={() => { update({ theme: (theme === "dark-theme" ? "" : "dark-theme") }) }}><FaSun /></button>
                            <ul>
                                <li><Link to="./">View Blocks</Link></li>
                                <li><Link to="./">View Transaction</Link></li>
                                <li><Link to="./">Staking</Link></li>
                                <li><Link to="./">View Blocks</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="copy-right">Axischain.com @ 2022</div>
                </section>
            </footer>
        </div >
    );
}

export default Layout;