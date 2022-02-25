import PropTypes from "prop-types";
import styles from "./Card.module.css";
import { Transaction } from "blockchain/src/blockchain";
import { useAppContext } from "../../../../context";
import cn from "classnames";
/**
 * Renders a card to display individual blocks.
 *
 * @param  {object}  props       The component as props.
 * @param  {object}  props.block The name of the block.
 * @return {Element}             The Card component.
 */
export default function Card({ block, idx }) {
  const {
    walletAddress,
    mineBlock,
    addTransactionToBlock,
    activeBlock,
    setActiveBlock,
  } = useAppContext();
  const tx1 = new Transaction(walletAddress, "another wallet public key", 10);

  return (
    <li
      className={cn(styles.block, idx === activeBlock && styles.active)}
      onClick={() => setActiveBlock(idx)}
    >
      <h4>{block?.hash}</h4>
      <div>
        <p>Transactions: {block?.transactions?.length}</p>
        <button onClick={() => addTransactionToBlock(tx1)}>
          Add New Transaction
        </button>

        <button onClick={() => mineBlock()}>Mine This Block</button>
      </div>
    </li>
  );
}
Card.propTypes = {
  block: PropTypes.object,
};
