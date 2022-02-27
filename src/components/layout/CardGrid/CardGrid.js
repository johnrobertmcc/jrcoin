import { useAppContext } from "../../../context";

import Container from "../../util/Container";
import Card from "./Card";

/**
 * Renders the CardGrid Component
 *
 * @return {Element}    The CardGrid component.
 */
export default function CardGrid() {
  const { blocks } = useAppContext();

  return (
    <Container tag="ul" className="cardGrid" tabIndex="0">
      {blocks &&
        blocks.map((block, i) => {
          return <Card block={block} key={i} idx={i} />;
        })}
    </Container>
  );
}
