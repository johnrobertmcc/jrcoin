import { useEffect, useState, createContext, useContext } from "react";
import { Blockchain } from "blockchain/src/blockchain";
import { addToLocalStorage, getFromLocalStorage } from "../functions";
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

let GlobalBlockchain = null;

/**
 * Function used to create a new blockchain.
 *
 */
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
 * The wrapper for the context of the blockchain.
 *
 * @return {Element}   The BlockchainProvider component.
 */
export function BlockchainProvider({ children }) {
  const yourKey = ec.keyFromPrivate(
    "7583f2bc4363f17af0c076f97414760e9bb29de8598456a768eb31356e727f75"
  );

  const walletAddress = yourKey.getPublic("hex");

  const [blocks, setBlocks] = useState([]);
  const [activeBlock, setActiveBlock] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState([]);

  useEffect(() => {
    if (getFromLocalStorage()) {
      const persistedState = getFromLocalStorage();
      console.log("local Storage pulled to state");
      GlobalBlockchain = new Blockchain(
        new Array(...persistedState.chain),
        persistedState?.difficulty,
        persistedState?.pendingTransactions,
        persistedState?.miningReward
      );
      GlobalBlockchain && setBlocks(new Array(...persistedState.chain));
    } else {
      genesis();
      GlobalBlockchain && setBlocks(new Array());
    }
  }, []);

  /**
   * Function used to add a specified transaction to the GlobalBlockchain.
   */
  function addTransactionToBlock(transaction) {
    transaction.signTransaction(yourKey);
    GlobalBlockchain.addTransaction(transaction);
    setPendingTransactions(new Array(...GlobalBlockchain?.pendingTransactions));
    addToLocalStorage(GlobalBlockchain);
  }

  /**
   * Function used to mine the latest block and add the transactions to the blockchain.
   */
  function mineBlock() {
    GlobalBlockchain.minePendingTransactions(walletAddress);
    setBlocks(new Array(...GlobalBlockchain?.chain));
    setPendingTransactions([]);
    addToLocalStorage(GlobalBlockchain);
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
        GlobalBlockchain,
        pendingTransactions,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}
