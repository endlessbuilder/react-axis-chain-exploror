import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import { blockList } from '../mockup/home.json'
import { config } from '../useStore'

interface BlockStatus {
    blocks: BlockObject[],
    count: number,
    page: number
}

const Txs = () => {
    const [status, setStatus] = React.useState<BlockStatus>({
        blocks: blockList,
        count: 25,
        page: 0
    });

    return (
        <div className='txs'>
            <section className='container'>
                <h3>
                    Blocks
                </h3>
                <div className='panel'>
                    <div className='table'>
                        <div className='tbl-header'>
                            <p>
                                Block &nbsp;
                                #{status.blocks[status.count * status.page].number}
                                &nbsp;to&nbsp;
                                #{status.count * (status.page + 1) - 1 < status.blocks.length
                                    ? status.blocks[status.count * (status.page + 1) - 1].number
                                    : status.blocks[status.blocks.length - 1].number}
                                &nbsp;(Total of {status.blocks.length.toLocaleString()} blocks)</p>
                            <div className='pagenation'>
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: 0 })} disabled={status.page <= 0}>First</button>
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: status.page - 1 })} disabled={status.page <= 0}><BsChevronLeft size="0.5rem" /></button>
                                <input type="text" className='input input-sm' value={status.page + 1} readOnly />
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: status.page + 1 })} disabled={status.page >= Math.floor(((status.blocks.length - 1) / status.count))}><BsChevronRight size="0.5rem" /></button>
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: Math.floor(((status.blocks.length - 1) / status.count)) })} disabled={status.page >= Math.floor(((status.blocks.length - 1) / status.count))}>Last</button>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Block</th>
                                    <th>Age</th>
                                    <th>Txn</th>
                                    <th>Gas Used</th>
                                    <th>Reward</th>
                                </tr>
                            </thead>
                            <tbody>
                                {status.blocks.map((i, k) => {
                                    if (Math.floor(k / status.count) === status.page)
                                        return <tr key={k}>
                                            <td><Link to={`/block/${i.number}`}>{i.number}</Link></td>
                                            <td>{i.timestamp}</td>
                                            <td><Link to={`/txs?block=${i.number}`}>{i.transactionCount}</Link></td>
                                            <td>{i.gasUsed.toLocaleString()} ({(0).toFixed(2)})%</td>
                                            <td>{i.rewards} {config.symbol}</td>
                                        </tr>
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
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: status.page + 1 })} disabled={status.page >= Math.floor(((status.blocks.length - 1) / status.count))}><BsChevronRight size="0.5rem" /></button>
                                <button className='btn btn-info btn-sm' onClick={() => setStatus({ ...status, page: Math.floor(((status.blocks.length - 1) / status.count)) })} disabled={status.page >= Math.floor(((status.blocks.length - 1) / status.count))}>Last</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
};

export default Txs;