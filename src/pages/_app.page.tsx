import { MantineProvider } from '@mantine/core';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { auth } from '../libs/firebase';

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>(null);
  const { isReady, push } = useRouter();

  // NOTICE: クイックフィックスの通り、pushを依存配列に入れると無限ループになる
  useEffect(() => {
    if (!isReady) return;
    user ? push('/home') : push('/sign-in');
  }, [isReady, user]);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log({ user });
      // const ret = await user.getIdTokenResult();
      // await user.getIdToken(true);
      // console.log(ret.claims.admin);
      // setTheme(!!ret.claims.admin ? 'dark' : 'light');
      setTheme('dark');
      // サーバーサイドでカスタムクレームを設定する
      console.log('There is a user!!!!!!!!!!!!!!!');
      // User is signed in
      setUser(user);
    } else {
      console.log('no user');
      setTheme('light');
      setUser(null);
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
};

export default App;
