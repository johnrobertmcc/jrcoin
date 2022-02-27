import Container from "../../util/Container";
import Wrapper from "../../util/Wrapper";
import styles from "./Footer.module.css";

/**
 * Renders the Footer Component
 *
 * @return {Element}    The Footer component.
 */
export default function Footer() {
  return (
    <Wrapper className={"siteFooter"} tag="footer" theme="primary" pt={false}>
      <Container className={"footerContainer"}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/johnrobertmcc/jrcoin"
          className={styles.gitHub}
        >
          Repo
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/jrmcc/"
          className={styles.linkedIn}
        >
          LinkedIn
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/johnrobertmcc"
          className={styles.branding}
        >
          Created by J.R.
        </a>
      </Container>
    </Wrapper>
  );
}
