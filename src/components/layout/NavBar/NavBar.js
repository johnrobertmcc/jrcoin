import styles from "./NavBar.module.css";
import Container from "../../util/Container";
import Wrapper from "../../util/Wrapper";
import { shortenAddress } from "../../../functions";
import { useAppContext } from "../../../context";

/**
 * The dapp's header.
 *
 * @return {Element} The NavBar component.
 */
export default function NavBar() {
  const { walletAddress } = useAppContext();
  return (
    <Wrapper className={"siteHeader"} pt={false} tag="header">
      <h1 className="sr-only">Blockchain by J.R..</h1>
      <Container paddingX={false} className={"headerContainer"}>
        <button className={styles.logo}>
          <img
            src="./assets/favicon.webp"
            alt="ethereum"
            className={styles.logoImg}
          />
        </button>
        <p>
          <span>Wallet Address:</span>
          <br />
          {shortenAddress(walletAddress)}
        </p>
      </Container>
    </Wrapper>
  );
}
