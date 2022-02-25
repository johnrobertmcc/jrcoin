import PropTypes from "prop-types";
import { useAppContext } from "../../../context";
import styles from "./CardGrid.module.css";
import Card from "./Card";
import { useEffect } from "react";

/**
 * Renders the CardGrid Component
 *
 * @return {Element}    The CardGrid component.
 */
export default function CardGrid() {
  const { blocks } = useAppContext();

  return (
    <ul className={styles.cardGrid}>
      {blocks &&
        blocks.map((block, i) => {
          return <Card block={block} key={i} idx={i} />;
        })}
    </ul>
  );
}
