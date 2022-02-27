import styles from "./NavBar.module.css";
import Container from "../../util/Container";
import Wrapper from "../../util/Wrapper";
import { shortenAddress } from "../../../functions";
import { useAppContext } from "../../../context";
import Loading from "../Loading/Loading";

/**
 * The app's header.
 *
 * @return {Element} The NavBar component.
 */
export default function NavBar({ loading }) {
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
        {loading ? (
          <img
            src="./assets/spinner.gif"
            alt="transferring"
            className={styles.loading}
          />
        ) : (
          <p>
            <span>Wallet Address:</span>
            <br />
            {shortenAddress(walletAddress)}
          </p>
        )}
      </Container>
    </Wrapper>
  );
}
