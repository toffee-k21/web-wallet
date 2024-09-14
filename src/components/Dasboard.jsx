import React, { useState } from 'react'
import { generateMnemonic } from "bip39";
import { EthWallet } from './EthWallet';

const Dasboard = () => {
      const [mnemonic, setMnemonic] = useState("");
  return (
    <div>
      <button
        onClick={async function () {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>
      <input
        type="text"
        value={mnemonic}
        onChange={(e) => setMnemonic(e.target.value)}
      />
      <EthWallet mnemonic={mnemonic} />
    </div>
  );
}

export default Dasboard