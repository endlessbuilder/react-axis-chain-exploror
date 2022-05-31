import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import { transactionList } from '../mockup/home.json'
import { config } from '../useStore'
import { isNull } from 'util';

interface TransactionStatus {
    block: string
    txs: TransactionObject[],
    count: number,
    page: number
}

const Txs = () => {
    const location = useLocation();
    const block = (
        location && location?.search?.includes("block")
            ? new URLSearchParams(location.search).get("block")
            : ""
    );
    const [status, setStatus] = React.useState<TransactionStatus>({
        block: (!isNull(block) ? block : ""),
        txs: transactionList,
        count: 25,
        page: 0
    });

    React.useEffect(() => {

    }, [])

    React.useEffect(() => {
        if (status.block === "") return;
        setStatus({
            ...status,
            txs: transactionList.filter(i => {
                return i.blocknumber === parseInt(status.block);
            })
        })
    }, [status]);

    return (
        <div className='txs'>
            <section className='container'>
                <h3>
                    Transactions <br />
                    {
                        status.block === ""
                            ? ""
                            : <small style={{ fontSize: "14px" }}>For Block <Link to={`/block/${status.block}`}>{status.block}</Link></small>
                    }
                </h3>
                <div className='panel'>
                    <div className='table'>
                        <div className='tbl-header'>
                            <p>
                                Count&nbsp;
                                {status.count * status.page + 1}
                                &nbsp;to&nbsp;
                                {status.count * (status.page + 1) - 1 < status.txs.length
                                    ? status.count * (status.page + 1)
                                    : status.txs.length}
                                &nbsp;(Total of {status.txs.length.toLocaleString()} txs)</p>
                            <div className='pagenation'>
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: 0 })} disabled={status.page <= 0}>First</button>
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: status.page - 1 })} disabled={status.page <= 0}><BsChevronLeft size="0.5rem" /></button>
                                <input type="text" className='input input-sm' value={status.page + 1} readOnly />
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: status.page + 1 })} disabled={status.page >= Math.floor(((status.txs.length - 1) / status.count))}><BsChevronRight size="0.5rem" /></button>
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: Math.floor(((status.txs.length - 1) / status.count)) })} disabled={status.page >= Math.floor(((status.txs.length - 1) / status.count))}>Last</button>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Txn Hash</th>
                                    <th>Method</th>
                                    <th>Block</th>
                                    <th>Age</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Value</th>
                                    <th>[Txn Fee]</th>
                                </tr>
                            </thead>
                            <tbody>
                                {status.txs.map((i, k) => {
                                    if (Math.floor(k / status.count) === status.page) {
                                        return <tr key={k}>
                                            <td>?</td>
                                            <td><Link to={`/tx/${i.txId}`}>{i.txId.slice(0, 8) + "..." + i.txId.slice(-4)}</Link></td>
                                            <td>{"transfer"}</td>
                                            <td><Link to={`/block/${i.blocknumber}`}>{i.blocknumber}</Link></td>
                                            <td>{i.timestamp}</td>
                                            <td><Link to={`/address/${i.from}`}>{i.from.slice(0, 8) + "..." + i.from.slice(-4)}</Link></td>
                                            <td><Link to={`/address/${i.to}`}>{i.to.slice(0, 8) + "..." + i.to.slice(-4)}</Link></td>
                                            <td>{i.value} {config.symbol}</td>
                                            <td><small>{i.fee}</small></td>
                                        </tr>
                                    }
                                    return "";
                                })}
                            </tbody>
                        </table>
                        <div className='tbl-footer'>
                            <div className='pagecount'>
                                Show&nbsp;
                                <select className='btn' onChange={(e) => setStatus({ ...status, count: parseInt(e.target.value) })}>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                &nbsp;Records
                            </div>
                            <div className='pagenation'>
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: 0 })} disabled={status.page <= 0}>First</button>
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: status.page - 1 })} disabled={status.page <= 0}><BsChevronLeft size="0.5rem" /></button>
                                <input type="text" className='input input-sm' value={status.page + 1} readOnly />
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: status.page + 1 })} disabled={status.page >= Math.floor(((status.txs.length - 1) / status.count))}><BsChevronRight size="0.5rem" /></button>
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: Math.floor(((status.txs.length - 1) / status.count)) })} disabled={status.page >= Math.floor(((status.txs.length - 1) / status.count))}>Last</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
};

export default Txs;