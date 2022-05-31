declare interface BlockObject {
    number: number
    miner: string
    transactionCount: number
    rewards: string
    timestamp: number
    difficulty: string
    totalDifficulty: string
    size: number
    gasUsed: number
    hash: string
    parentHash: string
    sha3Uncles: string
    nonce: string
}

declare interface TransactionObject {
    txId: string
    from: string
    to: string
    value: string
    timestamp: number

    status: boolean     // if successed, return true
    blocknumber: number
    toIsContract: boolean
    logs: TokenTransferObject[]
    fee: number
    gasLimit: number
    gasUsed: number
    gasPrice: number
    nonce: number
    input: string
    privateNote: string
}

declare interface AddressObject {
    address: string
    balance: string
    tokens: TokenBalanceObject[]
    nameTag?: string
    creator?: string
    createTx?: string
    txs: TransactionObject[],
    internalTxs: TransactionObject[],
    erc20Txs: any[],
    erc721Txs: any[],
    erc1155Txs: any[],
    contract: any[],
    events: any[],
    analystics: any[],
    comment: any[]
}

declare interface TokenBalanceObject {
    name: string
    contract: string
    balance: string
    decimals: number
}

declare interface TokenTransferObject {

}



declare interface HomeDataType {
    blockList: BlockObject[]
    transactionList: TransactionObject[]

}