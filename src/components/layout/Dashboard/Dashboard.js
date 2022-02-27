import { useAppContext } from "../../../context";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { Transaction } from "blockchain/src/blockchain";
import { shortenAddress } from "../../../functions";
import Container from "../../util/Container";
import Wrapper from "../../util/Wrapper";

/**
 * Renders the Dashboard Component
 *
 * @return {Element}     The Dashboard component.
 */
export default function Dashboard() {
  const {
    addTransactionToBlock,
    mineBlock,
    walletAddress,
    pendingTransactions,
  } = useAppContext();

  const defaultTX = {
    fromAddress: walletAddress,
    toAddress: "",
    amount: "",
  };

  const formValues = ["From Address", "To Address", "Amount"];
  const [transaction, setTransaction] = useState(defaultTX);

  /**
   * Handle Submit for form to add new transaction.
   *
   */
  function handleSubmit(e) {
    e.preventDefault();
    const tx = new Transaction(
      transaction?.fromAddress,
      transaction?.toAddress,
      transaction?.amount
    );

    addTransactionToBlock(tx);
    setTransaction(defaultTX);
  }

  /**
   * Handle Change for inputs to add new transaction details.
   *
   */
  function handleChange(e, value) {
    e.preventDefault();

    setTransaction((prev) => {
      return { ...prev, [value]: e.target.value };
    });
  }

  return (
    <Wrapper theme="primary">
      <Container paddingX={false} className={"dashboard"}>
        <div className={styles.txForm}>
          <form onSubmit={(e) => handleSubmit(e)}>
            {Object.keys(defaultTX).map((value, i) => {
              return (
                <input
                  key={i}
                  type={"text"}
                  value={transaction[value]}
                  onChange={(e) => handleChange(e, value)}
                  placeholder={formValues[i]}
                  className={styles.txInput}
                  disabled={value === "fromAddress" ? true : false}
                />
              );
            })}
            <button type="submit" className={styles.txButton}>
              Add New Transaction
            </button>
          </form>
          <button onClick={() => mineBlock()} className={styles.mineButton}>
            Mine
          </button>
        </div>
        <div className={styles.pending}>
          <div className={styles.pendingTXHeader}>
            <h3 className={styles.heading}>
              Pending Transactions: {pendingTransactions?.length}
            </h3>
          </div>
          <table className={styles.pendingTX}>
            <thead>
              <tr className={styles.tableHeader}>
                {formValues.map((value, i) => {
                  return (
                    <th key={i} className={styles.formValue}>
                      {value}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {!!pendingTransactions.length &&
                pendingTransactions.map((transaction, i) => {
                  return (
                    <tr key={i} className={styles.tableRow}>
                      <td>
                        {transaction?.fromAddress
                          ? shortenAddress(transaction.fromAddress)
                          : "Server"}
                      </td>
                      <td>{shortenAddress(transaction.toAddress)}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Container>
    </Wrapper>
  );
}
