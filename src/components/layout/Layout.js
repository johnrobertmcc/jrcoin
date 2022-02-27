import styles from "./Layout.module.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRef, useState, useEffect } from "react";
import Wrapper from "../util/Wrapper";
import CardGrid from "./CardGrid/CardGrid";
import Transactions from "./Transactions/Transactions";
import Dashboard from "./Dashboard";

/**
 * Renders the Default Layout of the dapp.
 *
 * @return {Element}     The Layout component.
 */
export default function Layout() {
  const [loading, isLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isLoading(true);
      setTimeout(() => {
        isLoading(false);
      }, 2000);
      isMounted.current = true;
    }
  }, [isMounted]);

  return (
    <>
      <NavBar loading={loading} />
      <Wrapper tag="main" className={"content"}>
        <Dashboard />
        <CardGrid />
        <Transactions />
      </Wrapper>
      <Footer loading={loading} />
    </>
  );
}
