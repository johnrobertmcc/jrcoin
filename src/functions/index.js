/**
 * Function used to return a fragmented account number.
 *
 * @return {string} The shortened account number.
 */
export function shortenAddress(accountNum) {
  return `${accountNum.slice(0, 5)}...${accountNum.slice(
    accountNum.length - 5,
    accountNum.length - 1
  )}`;
}

/**
 * Adds the current Blockchain to local storage.
 *
 * @param {object} currentBlockchainState The current state of the blockchain.
 */
export function addToLocalStorage(currentBlockchainState) {
  localStorage.setItem("blockchain", JSON.stringify(currentBlockchainState));
}

/**
 * Returns the locally stored blockchain values.
 *
 * @return {object}   The parsed object from local storage.
 */
export function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("blockchain")) ?? null;
}
