import {React, useState} from 'react'
import styles from './Wallet.module.css';
import simpleToken from './simpleToken';

const Interactions = () => {

	const [transferHash, setTransferHash] = useState();


	const transferHandler = async (e) => {
		e.preventDefault();
		let transferAmount = e.target.sendAmount.value;
		let recieverAddress = e.target.recieverAddress.value;

        console.log(recieverAddress,transferAmount);
		let txt = await simpleToken.methods.transfer(recieverAddress, transferAmount).send({from: window.ethereum.selectedAddress});
		// console.log(txt);
        console.log(await simpleToken.methods)
		setTransferHash("Transfer confirmation hash: " + txt.hash);
	}

	return (
			<div className={styles.interactionsCard}>
				<form onSubmit={transferHandler}>
					<h3> Transfer Coins </h3>
						<p> <b>Reciever Address </b></p>
						<input type='text' id='recieverAddress' className={styles.addressInput}/>

						<p> <b>Send Amount </b></p>
						<input type='number' id='sendAmount'className={styles.addressInput}  min='0' step='1'/>

						<button type='submit' className={styles.button7}>Send</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default Interactions;