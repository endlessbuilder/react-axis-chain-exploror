import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsArrowUp, BsArrowDown, BsCaretLeft, BsCaretRight } from "react-icons/bs";

import { blockList } from '../mockup/home.json'
import { config } from '../useStore'

interface BlockStatus {
    blockIndex: number
    tabIndex: number
    more: boolean
}

interface RowInfo {
    title: string
    content: any
    des: string
}

const Block = () => {
    const params = useParams();

    const getBlock = (b) => {
        return b.number === parseInt(params["height"]);
    }

    const [status, setStatus] = React.useState<BlockStatus>({
        blockIndex: blockList.findIndex(getBlock),
        tabIndex: 0,
        more: false
    });
    const [block, setBlock] = React.useState<BlockObject>(blockList[status.blockIndex]);

    React.useEffect(() => {
        setStatus({ ...status, blockIndex: blockList.findIndex(getBlock) });
    }, [params, status]);

    React.useEffect(() => {
        setBlock(blockList[status.blockIndex]);
    }, [status]);

    const rowInfos: RowInfo[] = [
        {
            title: "Block Height",
            content:
                <span className='txt-vcenter'>
                    <b>{block.number}</b>&nbsp;&nbsp;&nbsp;
                    {
                        status.blockIndex - 1 < 0
                            ? <BsCaretLeft size={18} />
                            : <Link to={`/block/${blockList[status.blockIndex - 1].number}`} className='btn btn-primary' style={{ padding: 0 }}><BsCaretLeft size={18} /></Link>
                    }&nbsp;&nbsp;
                    {
                        status.blockIndex + 1 >= blockList.length
                            ? <BsCaretRight size={18} />
                            : <Link to={`/block/${blockList[status.blockIndex + 1].number}`} className='btn btn-primary' style={{ padding: 0 }}><BsCaretRight size={18} /></Link>
                    }
                </span>,
            des: "Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block."
        }, {
            title: "Timestamp",
            content: <span>7 mins ago (May-28-2022 01:02:42 AM +UTC)</span>,
            des: "This is Timestamp"
        }, {
            title: "Transactions",
            content:
                <span>
                    {
                        (block.transactionCount === 0
                            ? "0 transaction"
                            : <Link to={`/txs?block=${block.number}`} className='btn btn-primary'>{block.transactionCount} transactions</Link>
                        )
                    }
                    &nbsp;and&nbsp;
                    {
                        (block.transactionCount === 0
                            ? "0 contract internal transaction"
                            : <Link to={`/txsInternal?block=${block.number}`} className='btn btn-primary'>{block.transactionCount} contract internal transactions</Link>
                        )
                    }
                    &nbsp;in this block
                </span>,
            des: "This is Transactions"
        }, {
            title: "Block Reward",
            content: <span>{block.rewards} {config.symbol}</span>,
            des: "This is Block Reward"
        }, {
            title: "Difficulty",
            content: <span>{block.difficulty}</span>,
            des: "This is Difficulty"
        }, {
            title: "Total Difficulty",
            content: <span>{block.totalDifficulty}</span>,
            des: "This is Total Difficulty"
        }, {
            title: "Size",
            content: <span>{block.size} bytes</span>,
            des: "This is Size"
        }, {
            title: "Gas Used",
            content: <span>{block.gasUsed.toLocaleString()} ({block.gasUsed.toFixed(2)}%)</span>,
            des: "This is Gas Used"
        }, {
            title: "Hash",
            content: <span>{block.hash}</span>,
            des: "This is Hash"
        }, {
            title: "Parent Hash",
            content: <Link to={`/block/${block.parentHash}`}>{block.parentHash}</Link>,
            des: "This is Parent Hash"
        }, {
            title: "Sha3Uncles",
            content: <span>{block.sha3Uncles}</span>,
            des: "This is Sha3Uncles"
        }, {
            title: "Nonce",
            content: <span>{block.nonce}</span>,
            des: "This is Nonce"
        }
    ];

    const tabContents = [
        <>
            {rowInfos.map((i, k) => {
                if (status.more === false && k >= 9) {
                    return "";
                }
                return <div key={k}>
                    <div className='col3 txt-vcenter'>
                        {/* <Tooltip title={i.des} placement="top" style={{ fontSize: "20px" }} arrow>
                            <i><AiOutlineQuestionCircle cursor="pointer" size={16} opacity={0.8} />&nbsp;</i>
                        </Tooltip> */}
                        <span className='sm-bold'> {i.title} :</span>
                    </div>
                    <div className='col9 txt-vcenter'>
                        {i.content}
                    </div>
                </div>
            })}
        </>,
        <p>Make sure to use the "Vote Down" button for any spammy posts, and the "Vote Up" for interesting conversations.</p>
    ];

    return (
        <div className='blocks'>
            <section className='container'>
                <h3>Block <small>#{block.number}</small></h3>
                <div className='panel tab'>
                    <div className='panel-header tab-links'>
                        <button className={(status.tabIndex === 0 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 0 })}>Overlink</button>
                        <button className={(status.tabIndex === 1 ? "active" : "")} onClick={() => setStatus({ ...status, tabIndex: 1 })}>Comments</button>
                    </div>
                    <div className='panel-content grid-col'>
                        {tabContents[status.tabIndex]}
                    </div>
                    {status.tabIndex === 0
                        ? (<div className='panel-footer'>
                            <a href='#' style={{ display: "flex", alignItems: "center" }} onClick={() => setStatus({ ...status, more: !status.more })}>
                                Click to see {status.more ? "less" : "more"}{status.more ? <BsArrowUp /> : <BsArrowDown />}
                            </a>
                        </div>)
                        : ""
                    }
                </div>
            </section>
        </div >
    )
};

export default Block;