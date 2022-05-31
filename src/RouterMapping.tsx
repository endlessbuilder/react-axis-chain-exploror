import Home from "./Pages/Home";
import Block from "./Pages/Block";
import Txs from "./Pages/Txs";
import Tx from "./Pages/Tx";
import Address from "./Pages/Address";
import Blocks from "./Pages/Blocks";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Lostpass from "./Pages/Lostpass";
import Opcodetool from "./Pages/Opcodetool";
import Verify from "./Pages/Verifycontract";
import Pushtx from "./Pages/Pushtx";
import Vyper from "./Pages/Vyper";
import NoPage from "./Pages/404";

const mapping = {
	"/": Home,							// Home page

	"/block/:height": Block,			// block detail
	"/tx/:txid": Tx,					// transaction detail
	"/address/:address": Address,

	"/blocks": Blocks,					// block list
	"/txs": Txs,						// transaction list - ?block={number}
	"/txs/block": Txs,					// transaction list - ?block={number}
	"/accounts": Home,					// top accounts
	"/txsPending": Home,					// pending transactions
	"/txsInternal": Home,				// internal transactions in contract
	"/contractsVerified": Home,			// verified contract
	"/validators": Home,				// validator list
	"/epochs": Home,					// epoch list
	"/tokens": Home,					// erc20 top tokens
	"/token/:address": Home,			// token detail
	"/tokentxns": Home,					// erc20 transfers
	"/tokens-nft": Home,				// erc721 tokens
	"/tokentxns-nft": Home,				// erc721 transfers
	"/tokens-nft1155": Home,			// (new) erc1155 tokens
	"/tokentxns-nft1155": Home,			// (new) erc1155 transfers
	"/charts": Home,					// various statistics charts
	"/topstat": Home,					// Top Statistics
	"/verifyContract": Verify,					// Top Statistics
	"/opcode-tool": Opcodetool,			// Bytecode to Opcode Disassembler
	"/pushTx": Pushtx,					// Broadcast Raw Transaction
	"/vyper": Vyper,						// Vyper Online Compiler (Experimental)
	"/labelcloud": Home,				// Label Word Cloud
	"/tokenapprovalchecker": Home,		// Token Approvals
	"/gastracker": Home,				// chain Gas Tracker
	"/contactus": Home,					// contact us

	"/login": Login,					// login page
	"/register": Register,				// register page
	"/lostpassword": Lostpass,			// lost password
	"/reset-password": Home,			// reset password
	"/confirmemail": Home,				// confirmemail in regster

	"/myaccount": Home,					// my account page
	"/myaddress": Home,					// My Watch List
	"/mynotes_tx": Home,				// My Transactions Private Notes
	"/mynotes_address": Home,			// My Address Private Notes
	"/mytokenignore": Home,				// My Token Ignore List
	"/myapikey": Home,					// My API Keys
	"/myverify_address": Home,			// My Verified Addresses
	"/mycustomabi": Home,				// My Custom ABIs

	"*": NoPage							// Not found 
}

export default mapping;