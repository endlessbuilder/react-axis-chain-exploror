import React from 'react';
import { Link } from 'react-router-dom';


interface VerifyStatus {
    txAddress: string
    compilerType: number
    compilerVersion: number
    licenseType: number
}

const Verify = () => {
    const [status, setStatus] = React.useState<VerifyStatus>({
        txAddress: "",
        compilerType: 0,
        compilerVersion: 0,
        licenseType: 0
    });

    return (

        <div className='verify'>
            <section className='container'>
                <h3 className='text-align-center'>Verify & Publish Contract Source Code</h3>
                <p className='text-align-center uppercase'><b className='color2'>compiler type and version selection</b></p>
                <hr />
                <p>
                    Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, FtmScan will match the compiled code with that on the blockchain. Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do.
                </p>
                <form className='form'>
                    <div className='input-field'>
                        <label>Please enter the Contract Address you would like to verify</label>
                        <input className='input input-block' placeholder='0x...' onChange={(e) => setStatus({ ...status, txAddress: e.target.value })} value={status.txAddress} />
                    </div>
                    <div className='input-field'>
                        <label>Please select Compiler Type</label>
                        <select className='input input-block' onChange={(e) => setStatus({ ...status, compilerType: parseInt(e.target.value) })} value={status.compilerType}>
                            <option value={0}>[Please Select]</option>
                            <option value={1}>Solidity (Single file)</option>
                            <option value={2}>Solidity (Multi-Part file)</option>
                            <option value={3}>Solidity (Stamdard-Json-Input)</option>
                            <option value={4}>Vyper (Experimental)</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <label>Please select Compiler Version</label>
                        <select className="input input-block" onChange={(e) => setStatus({ ...status, compilerVersion: parseInt(e.target.value) })} value={status.compilerVersion}>
                            <option value={0}>[Please Select]</option>
                            <option value={1}></option>
                        </select>
                    </div>
                    <div className="input-field">
                        <label>Please select Open Source License Type</label>
                        <select className="input input-block" onChange={(e) => setStatus({ ...status, licenseType: parseInt(e.target.value) })} value={status.licenseType}>
                            <option value={0}>[Please Select]</option>
                            <option value={1}></option>
                        </select>
                    </div>
                    <div className='text-align-center'><input type="checkbox" /> I agree to the <Link to="/terms">terms of service</Link></div>
                    <div className='text-align-center'>
                        <button type='submit' className='btn btn-primary' style={{ marginRight: "10px" }}>Continue</button>
                        <button type='reset' className='btn btn-primary'>Reset</button>
                    </div>
                </form>
            </section>
        </div >

    )
};

export default Verify;