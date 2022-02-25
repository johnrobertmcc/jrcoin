import { useEffect, useState, createContext, useContext } from "react";
import { Blockchain } from "blockchain/src/blockchain";
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

let GlobalBlockchain = null;

function genesis() {
  GlobalBlockchain = new Blockchain();
  console.log("blockchain created");
}
const BlockchainContext = createContext();

/**
 * Returns the context state.
 *
 * @return {object}   The context of the dapp.
 */
export function useAppContext() {
  return useContext(BlockchainContext);
}

/**
 * The wrapper for the dapp containing the context.
 *
 * @return {Element}   The TransactionProvider component.
 */
export function BlockchainProvider({ children }) {
  const yourKey = ec.keyFromPrivate(
    "7583f2bc4363f17af0c076f97414760e9bb29de8598456a768eb31356e727f75"
  );

  const walletAddress = yourKey.getPublic("hex");

  const [blocks, setBlocks] = useState([]);
  const [activeBlock, setActiveBlock] = useState(0);

  useEffect(() => {
    genesis();
    GlobalBlockchain && setBlocks(GlobalBlockchain.chain);
    console.log("blocks pulled to state");
  }, []);

  function addTransactionToBlock(transaction) {
    transaction.signTransaction(yourKey);
    GlobalBlockchain.addTransaction(transaction);
    console.log("GlobalBlockchain value", GlobalBlockchain);
  }

  function mineBlock() {
    GlobalBlockchain.minePendingTransactions(walletAddress);
    console.log("GlobalBlockchain.chain", GlobalBlockchain.chain);
    console.log("blocks", blocks);
    setBlocks(new Array(...GlobalBlockchain.chain));
  }

  return (
    <BlockchainContext.Provider
      value={{
        walletAddress,
        yourKey,
        blocks,
        mineBlock,
        addTransactionToBlock,
        activeBlock,
        setActiveBlock,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}
