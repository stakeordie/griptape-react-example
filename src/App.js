import React, { useState, useEffect, useCallback } from 'react';
import { bootstrap, coinConvert } from '@stakeordie/griptape.js';
import { stkd } from './contracts/stkd';
import ViewingKeyManager from './components/ViewingKeyManager';
import { onAccountAvailable } from '@stakeordie/griptape.js';

function App() {
  const [balance, setBalance] = useState('');
  const [price, setPrice] = useState('');
  const [isStakeButtonDisabled, setIsStakeButtonDisabled] = useState(true);
  const [amount, setAmount] = useState('');
  const [wasSuccessfull, setWasSuccessfull] = useState(false);

  const updateAll = useCallback(() => {
    updateBalance();
    updatePrice();
  }, []);

  useEffect(() => {
    updateAll();
    setIsStakeButtonDisabled(false);
  }, [updateAll])

  async function updateBalance() {
    const res = await stkd.getBalance();
    setBalance(res?.balance.amount);
  }

  async function updatePrice() {
    const res = await stkd.getStakingInfo();
    setPrice(res?.staking_info.price);
  }

  function doBootstrap() {
    bootstrap();
  }

  function onInputChange(event) {
    const value = event.target.value;
    setAmount(value);
  }

  async function onSubmit(event) {
    event.preventDefault();

    const theAmount = coinConvert(amount, 6, 'machine');

    try {
      await stkd.stake(theAmount);
      updateAll();
      setAmount('');
    } catch(e) {
      setWasSuccessfull(false);
    } finally {
      setWasSuccessfull(true);
    }
  }

  return (
    <div className="App">
      <h1>Griptape.js React Example</h1>

      <button onClick={doBootstrap}>Init Keplr</button>

      <ViewingKeyManager/>

      <p>STKd Price: { coinConvert(price, 6, 'human', 2) }</p>
      <p>STKd Balance: { coinConvert(balance, 6, 'human', 2) }</p>

      <form onSubmit={onSubmit}>
        <input type="text" name="amount" onChange={onInputChange} value={amount}/>
        <button
          disabled={isStakeButtonDisabled}>
          Stake
        </button>
        { wasSuccessfull ? <p>Transaction was successfull! 👍</p> : null }
      </form>

    </div>
  );
}

export default App;
