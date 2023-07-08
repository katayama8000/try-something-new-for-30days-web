import Head from 'next/head';
import { Button, Group } from '@mantine/core';
import axios from 'axios';
import { auth } from '../../firebase/firebase';
import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';

const Home: NextPage = () => {
  const [uid, setUid] = useState<string>('');
  const [idToken, setIdToken] = useState<string>('');

  const handleSetCustomClaim = async () => {
    const response = await axios.post<{ uid: string }>('/api/setCustomClaim', {
      uid,
    });
    console.log(response);
  };

  const handledeleteCustomClaims = async () => {
    const response = await axios.post<{ uid: string }>(
      '/api/deleteCustomClaim',
      {
        uid,
      }
    );
    console.log(response);
  };

  const handleVerifyIdToken = async () => {
    console.log(idToken);
    const response = await axios.post<{ uid: string }>('/api/verifyIdToken', {
      idToken,
    });
    console.log(response);
  };

  const handleGetUserId = async () => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;
    console.log(uid);
    setUid(uid);
    const idToken = await auth.currentUser.getIdToken();
    console.log(idToken);
    setIdToken(idToken);
  };

  const handleGetUserInfo = async () => {
    const user = auth.currentUser;
    if (!user) return;
    console.log(user);
    const token = await user.getIdToken();
    console.log(token);
  };

  const handleCheckCustomClaims = async () => {
    if (!auth.currentUser) return;
    // const idToken = await auth.currentUser.getIdTokenResult();
    // console.log(idToken.claims);
    // 伝搬
    const ret = await auth.currentUser.getIdToken(true);
    // console.log(idToken);
    // await auth.currentUser.reload();
    const idTokenResult = await auth.currentUser.getIdTokenResult();
    console.log(idTokenResult.claims);
  };

  const handleGetUserIdToken = async () => {
    if (!auth.currentUser) return;
    const token = await auth.currentUser.getIdToken();
    console.log(token);
    setIdToken(token);
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <Group mt={50} position="center">
          <Button onClick={handleSetCustomClaim}>setCustomClaim</Button>
          <Button onClick={handledeleteCustomClaims}>deleteCustomClaims</Button>
          <Button onClick={handleVerifyIdToken}>verifyIdToken</Button>
          <Button onClick={handleGetUserId}>getUserId</Button>
          <Button onClick={handleGetUserIdToken}>getUserIdToken</Button>
          <Button onClick={handleGetUserInfo}>getUserInfo</Button>
          <Button onClick={handleCheckCustomClaims}>checkCustomClaims</Button>
          <Link href={'sign-in'}>signIn</Link>
          <Link href={'admin'}>admin</Link>
          <Button onClick={handleLogout}>logout</Button>
        </Group>
      </main>
    </>
  );
};

export default Home;
