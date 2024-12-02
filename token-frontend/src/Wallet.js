import {React, useState, useEffect} from 'react'
import styles from './Wallet.module.css'
import simpleToken from './simpleToken';
import web3 from './web3';
import Interactions from './Interaction';

const Wallet = () => {


	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [tokenSymbol, setTokenSymbol] = useState("");
	const [balance, setBalance] = useState(null);



	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
	}

	useEffect(() => {

		const updateSymbol = async () => {
			setTokenSymbol(await simpleToken.methods.symbol().call());
			
		}


		const updateBalance = async () => {
		  if (simpleToken.methods != null && web3.utils.isAddress(defaultAccount)) {
			
			let balanceBigN = await simpleToken.methods.balanceOf(defaultAccount).call();
			let balanceSplit = balanceBigN.toString().split('n')[0];


			let tokenDecimals = await simpleToken.methods.decimals().call();
			let tokenDecimalSplit = tokenDecimals.toString().split('n')[0];

			let balanceNumber = parseInt(balanceSplit, 10);
	
	
			let tokenBalance = balanceNumber / Math.pow(10, tokenDecimalSplit);
			console.log(tokenBalance);
	
			setBalance(toFixed(tokenBalance));
		  } else {
			console.error('Invalid address or simpleToken.methods is null');
		  }
		};
	
		if (defaultAccount) {
		  updateBalance();
		  updateSymbol();
		}
	  }, [defaultAccount]);

   function toFixed(x) {
   if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
         x *= Math.pow(10, e - 1);
         x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
   } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
         e -= 20;
         x /= Math.pow(10, e);
         x += (new Array(e + 1)).join('0');
      }
   }
   return x;
}




	
	return (
	<div className={styles.container}>
			<h2 className={styles.header}> FlexCoin ERC-20 Wallet </h2>
			<button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>

			<div className={styles.walletCard}>
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>

			<div>
				<h3> Balance: {balance} {tokenSymbol}</h3>
			</div>

			{errorMessage}
		</div>
		<Interactions/>
	</div>
	)
}

export default Wallet;