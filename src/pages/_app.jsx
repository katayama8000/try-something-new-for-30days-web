import { useCounter } from "hooks/useCounter";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const counter = useCounter()
  return (
    <>
      <h1>hellllloooooo</h1>
      <Component {...pageProps} {...counter} />
    </>
  );
}

export default MyApp;
