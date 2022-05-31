import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsChevronRight, BsExclamationCircle } from "react-icons/bs";
import { mockAddress } from '../mockup/address.json'
import { config } from '../useStore'
import NotPage from "./404";

interface AddressStatus {
    addrIndex: number
    tabIndex: number
    tokenDropdown: boolean
}

interface RowInfo {
    title: string
    content: any
}

const Address = () => {
    const params = useParams();

    const getAddrIndex = (b) => {
        return b.address === params["address"];
    }

    const [status, setStatus] = React.useState<AddressStatus>({
        addrIndex: mockAddress.findIndex(getAddrIndex),
        tabIndex: 0,
        tokenDropdown: false
    });
    const [address, setAddress] = React.useState<AddressObject>(mockAddress[status.addrIndex]);

    React.useEffect(() => {
        setStatus({ ...status, addrIndex: mockAddress.findIndex(getAddrIndex) });
    }, [params]);

    const overviewInfo: RowInfo[] = [
        {
            title: "Balance",
            content: <span>{address.balance}</span>,
        }, {
            title: `${config.symbol} Value`,
            content: <span>${address.balance} <small>(@ ${0.36}/{config.symbol})</small></span>,
        }, {
            title: "Token",
            content: <div className='flex g2 txt-vcenter'>
                <div className='dropdown' style={{ flex: 1 }}>
                    <button className='btn btn-block' onClick={() => setStatus({ ...status, tokenDropdown: !status.tokenDropdown })}>${1.430952E+015}</button>
                    <ul className='panel' style={{ display: status.tokenDropdown ? "block" : "none" }}>
                        <div className='panel-content'>
                            <div className='search-input'>
                                <input type="search" className='input input-block input-sm' placeholder='Search for token name' />
                            </div>
                            <div className="grid-col" style={{ maxHeight: "300px" }}>
                                <li>
                                    <Link className='btn btn-primary btn-block' to={`/token/${0x00000000}`}>
                                        <div className='flex justify-content-between'>
                                            <div className='flex flex-direction-col g1'>
                                                <span>USD Coin (USDC)</span>
                                                <small>{(11870.759305).toLocaleString()} USDC</small>
                                            </div>
                                            <div className='flex flex-direction-col g1 text-align-right'>
                                                <span>${(11918.19).toLocaleString()}</span>
                                                <small>@{(1817.28).toFixed(10)}</small>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link className='btn btn-primary btn-block' to={`/token/${0x00000000}`}>
                                        <div className='flex justify-content-between'>
                                            <div className='flex flex-direction-col g1'>
                                                <span>Ethereum (ETH)</span>
                                                <small>{0.00065402}ETH</small>
                                            </div>
                                            <div className='flex flex-direction-col g1 text-align-right'>
                                                <span>${1.19}</span>
                                                <small>@{(1817.28).toFixed(10)}</small>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </ul>
                </div>
                <Link className="btn" to={`/tokenholdings?a=${address.address}`} style={{ padding: "8px" }}><BsChevronRight size="1em" /></Link>
            </div>,
        }
    ];
    const moreInfo: RowInfo[] = [
        {
            title: "My Name Tag",
            content: <span>Not Available, <Link to="/login">login to update</Link></span>,
        }, {
            title: "Contract Creater",
            content: <div className='flex dir-col'>
                <span><Link to="/">{address.creator?.slice(0, 20)}...</Link> at txn</span>
                <Link to="/">{address.createTx?.slice(0, 20)}...</Link>
            </div>,
        }, {
            title: "Block Validated",
            content: <span>{0}</span>,
        }
    ];

    const tabContents = [
        <><div className='table'>
            <div className='tbl-status'><p>Latest 25 from a total of {address.txs.length.toLocaleString()} transactions</p></div>
            <table><thead><tr>
                <th>Txn Hash</th><th>Method</th><th>Block</th><th>Age</th><th>From</th><th>To</th><th>Value</th><th>[Txn Fee]</th>
            </tr></thead><tbody>
                    {address.txs.map((i, k) => {
                        return <tr key={k}>
                            <td><Link to={`/tx/${i.txId}`}>{i.txId.slice(0, 8) + "..." + i.txId.slice(-4)}</Link></td>
                            <td>{"transfer"}</td>
                            <td><Link to={`/block/${i.blocknumber}`}>{i.blocknumber}</Link></td>
                            <td>{i.timestamp}</td>
                            <td>{i.from.slice(0, 8) + "..." + i.from.slice(-4)}</td>
                            <td><Link to={`/address/${i.to}`}>{i.to.slice(0, 8) + "..." + i.to.slice(-4)}</Link></td>
                            <td>{i.value} {config.symbol}</td>
                            <td><small>{i.fee}</small></td>
                        </tr>
                    })}
                </tbody>
            </table></div>
        </>,
        <><div className='table'>
            <div className='tbl-status'><p>Latest 25 internal transaction</p></div>
            <table><thead><tr>
                <th>Parent Txn Hash</th><th>Block</th><th>Age</th><th>From</th><th>To</th><th>Value</th></tr>
            </thead><tbody>
                    {address.txs.map((i, k) => {
                        return <tr key={k}>
                            <td><Link to={`/tx/${i.txId}`}>{i.txId.slice(0, 8) + "..." + i.txId.slice(-4)}</Link></td>
                            <td>{"transfer"}</td>
                            <td><Link to={`/block/${i.blocknumber}`}>{i.blocknumber}</Link></td>
                            <td>{i.timestamp}</td>
                            <td><Link to={`/address/${i.from}`}>{i.from.slice(0, 8) + "..." + i.from.slice(-4)}</Link></td>
                            <td>{i.to.slice(0, 8) + "..." + i.to.slice(-4)}</td>
                            <td>{i.value} {config.symbol}</td>
                            <td><small>{i.fee}</small></td>
                        </tr>
                    })}
                </tbody>
            </table></div>
        </>,
        <><div className='table'>
            <div className='tbl-status'><p>Latest 25 ERC-20 Token Transfer Events</p></div>
            <table><thead><tr>
                <th>Txn Hash</th><th>Method</th><th>Age</th><th>From</th><th>To</th><th>Value</th><th>Token</th></tr>
            </thead><tbody>
                    {address.erc20Txs.map((i, k) => {
                        return <tr key={k}>
                            <td><Link to={`/tx/${i.txId}`}>{i.txId.slice(0, 8) + "..." + i.txId.slice(-4)}</Link></td>
                            <td>{i.timestamp}</td>
                            <td><Link to={`/address/${i.from}`}>{i.from.slice(0, 8) + "..." + i.from.slice(-4)}</Link></td>
                            <td><Link to={`/address/${i.to}`}>{i.to.slice(0, 8) + "..." + i.to.slice(-4)}</Link></td>
                            <td>{i.value} {config.symbol}</td>
                            <td>{i.token}</td>
                        </tr>
                    })}
                </tbody>
            </table></div>
        </>,
        <><div className='table'>
            <div className='tbl-status'><p>Latest 25 ERC-721 Token Transfer Events</p></div>
            <table><thead><tr>
                <th>Txn Hash</th><th>Method</th><th>Age</th><th>From</th><th>To</th><th>Token ID</th><th>Token</th></tr>
            </thead><tbody>
                    {address.erc721Txs.map((i, k) => {
                        return <tr key={k}>
                            <td><Link to={`/tx/${i.txId}`}>{i.txId.slice(0, 8) + "..." + i.txId.slice(-4)}</Link></td>
                            <td>{i.timestamp}</td>
                            <td><Link to={`/address/${i.from}`}>{i.from.slice(0, 8) + "..." + i.from.slice(-4)}</Link></td>
                            <td><Link to={`/address/${i.to}`}>{i.to.slice(0, 8) + "..." + i.to.slice(-4)}</Link></td>
                            <td>{i.tokenId}</td>
                            <td>{i.token}</td>
                        </tr>
                    })}
                </tbody>
            </table></div>
        </>,
        <><div className='table'>
            <div className='tbl-status'><p>Latest 25 ERC-1155 Token Transfer Events</p></div>
            <table><thead><tr>
                <th>Txn Hash</th><th>Method</th><th>Age</th><th>From</th><th>To</th><th>Token ID</th><th>Token</th></tr>
            </thead><tbody>
                    {address.erc1155Txs.map((i, k) => {
                        return <tr key={k}>
                            <td><Link to={`/tx/${i.txId}`}>{i.txId.slice(0, 8) + "..." + i.txId.slice(-4)}</Link></td>
                            <td>{i.timestamp}</td>
                            <td><Link to={`/address/${i.from}`}>{i.from.slice(0, 8) + "..." + i.from.slice(-4)}</Link></td>
                            <td><Link to={`/address/${i.to}`}>{i.to.slice(0, 8) + "..." + i.to.slice(-4)}</Link></td>
                            <td>{i.tokenId}</td>
                            <td>{i.token}</td>
                        </tr>
                    })}
                </tbody>
            </table></div>
        </>,
        <>
            <div className='p-y-3'><b>Contract Self Destruct called at Txn Hash&nbsp;&nbsp;</b><Link to="/">{"0x000000000000000000000000"}</Link></div>
            <textarea className='btn-block' rows={5} style={{ minWidth: "100%" }} disabled></textarea>
        </>,
        <><div className='table'>
            <div className='tbl-status'><p>Latest 25 blocks (From a total of {address.events.length.toLocaleString()} blocks with 22,767,980.77 FTM in fees)</p></div>
            <table><thead><tr>
                <th>Block</th><th>Age</th><th>Transaction</th><th>Gas Used</th><th>Reward</th></tr>
            </thead><tbody>
                    {address.events.map((i, k) => {
                        return <tr key={k}>
                            <td><Link to={`/block/${i.block}`}>{i.blocknumber}</Link></td>
                            <td>{i.timestamp}</td>
                            <td>{i.txCount}</td>
                            <td>{i.gasUsed}</td>
                            <td>{i.reward}</td>
                        </tr>
                    })}
                </tbody>
            </table></div>
        </>,
        <>
            <p>Make sure to use the "Vote Down" button for any spammy posts, and the "Vote Up" for interesting conversations.</p>
        </>,
        <>
            <p>Make sure to use the "Vote Down" button for any spammy posts, and the "Vote Up" for interesting conversations.</p>
        </>
    ];

    return (
        <div className='address'>
            {
                status.addrIndex === -1
                    ? <NotPage />
                    : <section className='container'>
                        <h3>Contract <small>{address.address}</small></h3>
                        <Link to="/accounts/label/burn" className='btn-bn'><b><small className='txt-vcenter'>Burn &nbsp;<BsExclamationCircle /></small></b></Link>
                        <div className='section-split'>
                            <div className='col6'>
                                <div className='panel h-100'>
                                    <div className='panel-header'><h4>Overview</h4></div>
                                    <div className='panel-content grid-col'>
                                        {overviewInfo.map((i, k) => {
                                            return <div key={k}>
                                                <div className='col3'>
                                                    <span className='sm-bold'> {i.title} :</span>
                                                </div>
                                                <div className='col9'>
                                                    {i.content}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className='col6'>
                                <div className='panel h-100'>
                                    <div className='panel-header'><h4>Overview</h4></div>
                                    <div className='panel-content grid-col'>
                                        {moreInfo.map((i, k) => {
                                            return <div key={k}>
                                                <div className='col3'>
                                                    <span className='sm-bold'> {i.title} :</span>
                                                </div>
                                                <div className='col9'>
                                                    {i.content}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='panel tab'>
                            <div className='panel-header tab-links'>
                                <button className={(status.tabIndex === 0 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 0 })}>Transactions</button>
                                <button className={(status.tabIndex === 1 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 1 })}>Internal Txns</button>
                                <button className={(status.tabIndex === 2 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 2 })}>ERC-20 Token Txns</button>
                                <button className={(status.tabIndex === 3 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 3 })}>ERC-721 Token Txns</button>
                                <button className={(status.tabIndex === 4 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 4 })}>ERC-1155 Token Txns</button>
                                <button className={(status.tabIndex === 5 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 5 })}>Contract<sup><small> Self Destruct</small></sup></button>
                                <button className={(status.tabIndex === 6 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 6 })}>Validated Blocks</button>
                                <button className={(status.tabIndex === 7 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 7 })}>Analytics</button>
                                <button className={(status.tabIndex === 8 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 8 })}>Comments</button>
                            </div>
                            <div className='panel-content' style={{ minHeight: "500px" }}>
                                {tabContents[status.tabIndex]}
                            </div>
                        </div>
                    </section>
            }
        </div >
    )
};

export default Address;