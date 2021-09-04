import React, { useState } from 'react';
import { viewingKeyManager, getKeplr } from '@stakeordie/griptape.js';

function ViewingKeyManager() {
  const [key, setKey] = useState('');

  async function add() {
    const keplr = await getKeplr();

    if (!keplr) throw new Error('keplr not available');

    const contractAddress = 'secret1mtg8tuqsfvk9ma36tmtz5mc7pae73j0hsc6jla';
    await keplr.suggestToken('holodeck-2', contractAddress);
    const key = await keplr.getSecret20ViewingKey('holodeck-2', contractAddress);

    setKey(key.substring(0, 12) + '...');

    viewingKeyManager.add({
      id: 'stkd',
      contractAddress,
      key
    });

  }
  return (
    <div style={{ margin: '1rem 0' }}>
      <button onClick={add}>Create Viewing Key</button>
      <p>{key}</p>
    </div>
  );
}

export default ViewingKeyManager;
