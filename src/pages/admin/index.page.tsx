// admin顕現の人しか見れない画面
import { auth, db } from '../../../firebase/firebase';
import { Button } from '@mantine/core';
import { DefaultTemplate } from '@templates/defaultTemplate';
import { addDoc, collection } from 'firebase/firestore';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Admin: NextPage = () => {
  // admin権限があるかどうかを確認する
  // なければリダイレクト
  const { push } = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (!auth.currentUser) return;
      const ret = await auth.currentUser.getIdToken(true);
      // console.log(idToken);
      // await auth.currentUser.reload();
      const idTokenResult = await auth.currentUser.getIdTokenResult();
      console.log('wwww', idTokenResult.claims);
      !!idTokenResult.claims.admin ? setIsAdmin(true) : setIsAdmin(true);
    })();
  }, []);

  // mycollecttionというコレクションに書き込み
  const handleWrite = async () => {
    const docRef = await addDoc(collection(db, 'myCollection'), {
      name: 'Tokyo',
      country: 'Japan',
    });
    console.log('Document written with ID: ', docRef.id);
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
    if (!!idTokenResult.claims.admin) {
      console.log('no admin');
      push('/');
    }
  };

  if (!isAdmin)
    return (
      <div>
        <h1>no admin</h1>
        <Link href='/'>home</Link>
        <Button onClick={handleWrite}>add</Button>
      </div>
    );
  return (
    <DefaultTemplate>
      <h1>admin</h1>
      <Link href='/'>home</Link>
      <Button onClick={handleCheckCustomClaims}>check custom claims</Button>
      <Button onClick={handleWrite}>add</Button>
    </DefaultTemplate>
  );
};

export default Admin;
