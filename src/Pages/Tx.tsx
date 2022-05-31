import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

import { transactionList } from '../mockup/home.json'

interface TxStatus {
    txIndex: number

    tabIndex: number
    more: boolean
}

interface RowInfo {
    title: string
    content: any
    des: string
}

const Tx = () => {
    const params = useParams();

    const getTx = (b) => {
        return b.txId === params["txid"];
    }
    const [status, setStatus] = React.useState<TxStatus>({
        txIndex: transactionList.findIndex(getTx),
        tabIndex: 0,
        more: false
    });
    const [tx, setTx] = React.useState<TransactionObject>(transactionList[status.txIndex]);

    React.useEffect(() => {
        setStatus({ ...status, txIndex: transactionList.findIndex(getTx) });
    }, [params]);

    React.useEffect(() => {
        setTx(transactionList[status.txIndex]);
    }, [status]);

    const rowInfos: RowInfo[] = [
        {
            title: "Transaction Hash",
            content:
                <span className='txt-vcenter'>
                    {tx.txId}
                </span>,
            des: "Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block."
        }, {
            title: "Status",
            content: <span>{tx.status ? "Fail" : "Success"}</span>,
            des: "Status"
        }, {
            title: "Block",
            content: <Link to={`/block/${tx.blocknumber}`}>{tx.blocknumber}</Link>,
            des: "Status"
        }, {
            title: "Timestamp",
            content: <span>{tx.timestamp}</span>,
            des: "Timestamp"
        }, {
            title: "From",
            content: <Link to={`/address/${tx.from}`}>{tx.from}</Link>,
            des: "From address"
        }, {
            title: "To",
            content: <span>{tx.toIsContract ? "Contract " : ""}<Link to={`/address/${tx.to}`}>{tx.to}</Link></span>,
            des: "To address"
        }, {
            title: "Value",
            content: <span>{tx.value}</span>,
            des: "Value"
        }, {
            title: "Transaction Fee",
            content: <span>{tx.fee}</span>,
            des: "Transaction Fee"
        }, {
            title: "Gas Limit",
            content: <span>{tx.gasLimit}</span>,
            des: "Gas Limit"
        }, {
            title: "Gas Price",
            content: <span>{tx.gasPrice}</span>,
            des: "Gas Price"
        }, {
            title: "Nonce",
            content: <span>{tx.nonce}</span>,
            des: "Nonce"
        }, {
            title: "Input Data",
            content: <textarea className='btn-block' rows={5} style={{ minWidth: "100%" }} disabled>{tx.input}</textarea>,
            des: "Input Date"
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

        <div className='tx'>
            <section className='container'>
                <h3>Transaction Details</h3>
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

export default Tx;