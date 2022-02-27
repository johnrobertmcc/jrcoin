import PropTypes from "prop-types";
import styles from "./Card.module.css";
import { useAppContext } from "../../../../context";
import cn from "classnames";
import { shortenAddress } from "../../../../functions";
import { useRef } from "react";

/**
 * Renders a card to display individual blocks.
 *
 * @param  {object}  props       The component as props.
 * @param  {object}  props.block The name of the block.
 * @return {Element}             The Card component.
 */
export default function Card({ block, idx }) {
  const { activeBlock, setActiveBlock } = useAppContext();
  const btnRef = useRef(null);

  /**
   * Function used to focus on the button and change active index.
   */
  function focusOnBtn() {
    btnRef.current.focus();
    btnRef.current.click();
  }

  if (idx === 0) {
    return (
      <li className={cn(styles.genesisBlock, styles.block)}>
        <h4 className={styles.genesis}>Genesis Block</h4>
        {block?.timestamp && (
          <h4 className={styles.created}>
            Created: <br />
            {new Date(block.timestamp).toDateString()}
          </h4>
        )}
      </li>
    );
  }

  return (
    <li
      className={cn(styles.block, idx === activeBlock && styles.active)}
      // tabIndex="0"
      onClick={() => focusOnBtn()}
    >
      {block?.hash && (
        <h4 className={styles.blockHash}>Hash: {shortenAddress(block.hash)}</h4>
      )}
      <div className={styles.inner}>
        {block?.transactions && (
          <button
            onClick={() => setActiveBlock(idx)}
            ref={btnRef}
            className={styles.transactionBtn}
          >
            Transactions: <b>{block.transactions.length}</b>
          </button>
        )}
        {block?.timestamp && (
          <p>Created: {new Date(block.timestamp).toLocaleDateString()}</p>
        )}
      </div>
    </li>
  );
}
Card.propTypes = {
  block: PropTypes.object,
};
