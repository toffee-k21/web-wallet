import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import FetchBalance from "./FetchBalance";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [showBalance, setShowBalance] = useState(false);
  return (
    <div>
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex(currentIndex + 1);
          console.log(wallet);
          // setAddresses([...addresses, wallet.address]);
          setWallets([
            ...wallets,
            { address: wallet.address, privateKey: privateKey },
          ]);
        }}
      >
        Add ETH wallet
      </button>
      <div>
        <button onClick={() => setShowBalance(true)}>Show Balance</button>
      </div>

      {wallets.map((p) => (
        <>
          <div>Eth - {p.address}</div>
          {showBalance ? <FetchBalance privateKey={p.privateKey} /> : <></>}
        </>
      ))}
    </div>
  );
};
