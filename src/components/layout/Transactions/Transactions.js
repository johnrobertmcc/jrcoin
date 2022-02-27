import styles from "./Transactions.module.css";
import Container from "../../util/Container/Container";
import { useAppContext } from "../../../context/index";
import Wrapper from "../../util/Wrapper/Wrapper";
import { useState, useEffect } from "react";
import { shortenAddress } from "../../../functions";

/**
 * Renders the recent transactions found on the Window.
 *
 * @return {Element}             The Transactions component.
 */
export default function Transactions() {
  const { blocks, activeBlock } = useAppContext();

  const [block, setBlock] = useState(null);

  useEffect(() => {
    setBlock(blocks[activeBlock]);
  }, [activeBlock]);

  return (
    <Wrapper className={styles.transactionWrap} theme="primary">
      <Container>
        <div className={styles.innerWrap}>
          <div className={styles.header}>
            <h2>Block Transactions</h2>
          </div>
          <>
            {block ? (
              <div className={styles.transactionContainer}>
                <table className={styles.transactions}>
                  <thead>
                    <tr className={styles.tableHeader}>
                      <th>Amount</th>
                      <th>From Address</th>
                      <th>To Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.transactions.map((transaction, i) => {
                      return (
                        <tr key={i} className={styles.tableRow}>
                          <td>{transaction.amount}</td>
                          <td>
                            {transaction?.fromAddress
                              ? shortenAddress(transaction.fromAddress)
                              : "Server"}
                          </td>
                          <td>{shortenAddress(transaction.toAddress)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.noTransactions}>
                <h3 className={styles.message}>No Block Selected.</h3>
              </div>
            )}
          </>
        </div>
      </Container>
    </Wrapper>
  );
}
