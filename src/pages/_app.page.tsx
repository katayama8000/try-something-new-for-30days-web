import { MantineProvider } from '@mantine/core';
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { auth } from '../../firebase/firebase';

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { isReady, push } = useRouter();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const ret = await user.getIdTokenResult();
      await user.getIdToken(true);
      console.log(ret.claims.admin);
      setTheme(!!ret.claims.admin ? 'dark' : 'light');
      // サーバーサイドでカスタムクレームを設定する
    } else {
      console.log('no user!!!!!!!!');
      // User is signed out
      // ...
    }
  });

  return (
    <>
      <Head>
        <title>Page title</title>
        {/* <link rel="shortcut icon" href="/favicon.svg" /> */}
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: theme,
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
