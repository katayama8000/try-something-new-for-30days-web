import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { auth } from '@firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App({ Component, pageProps }: AppProps) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      // サーバーサイドでカスタムクレームを設定する
    } else {
      console.log('no user');
      // User is signed out
      // ...
    }
  });
  return (
    <>
      <Head>
        <title>Page title</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
        }}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
