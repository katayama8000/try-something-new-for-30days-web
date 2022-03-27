import { useCounter } from "hooks/useCounter";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import React from 'react';

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function MyApp({ Component, pageProps }) {
  const counter = useCounter();
  return (
    <>
      <h1>hellllloooooo</h1>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} {...counter} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
