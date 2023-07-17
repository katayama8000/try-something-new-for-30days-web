// admin顕現の人しか見れない画面
import { Button } from '@mantine/core';
import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import Link from 'next/link';

import { auth, db } from '../../libs/firebase';
import { isAdminAtom, userAtom } from '../../state/user.state';
import { DefaultTemplate } from '../../templates/defaultTemplate';

const Admin: NextPage = () => {
  const [user, _] = useAtom(userAtom);
  const [isAdmin] = useAtom(isAdminAtom);
  console.log({ isAdmin });
  // admin権限があるかどうかを確認する
  // なければリダイレクト
  // const [isAdmin, setIsAdmin] = useState<boolean>(false);
  // useEffect(() => {
  //   (async () => {
  //     if (!auth.currentUser) return;
  //     // const ret = await auth.currentUser.getIdToken(true);
  //     // console.log(idToken);
  //     // await auth.currentUser.reload();
  //     const idTokenResult = await auth.currentUser.getIdTokenResult();
  //     console.log('wwww', idTokenResult.claims);
  //     !!idTokenResult.claims.admin ? setIsAdmin(true) : setIsAdmin(true);
  //   })();
  // }, []);

  // mycollecttionというコレクションに書き込み
  const handleWrite = async () => {
    const docRef = await addDoc(collection(db, 'myCollection'), {
      country: 'Japan',
      name: 'Tokyo',
    });
    console.log('Document written with ID: ', docRef.id);
  };

  const handleCheckCustomClaims = async () => {
    if (!auth.currentUser) return;
    // const idToken = await auth.currentUser.getIdTokenResult();
    // console.log(idToken.claims);
    // 伝搬
    await auth.currentUser.getIdToken(true);
    // console.log(idToken);
    // await auth.currentUser.reload();
    const idTokenResult = await auth.currentUser.getIdTokenResult();
    !!idTokenResult.claims.admin ? console.log('admin') : console.log('no admin');
  };

  const handledeleteCustomClaims = async () => {
    const uid = user?.uid;
    console.log(uid);
    const response = await axios.post<{ uid: string }>('/api/deleteCustomClaim', {
      uid,
    });
    console.log(response);
  };

  const handleSetCustomClaim = async () => {
    const uid = user?.uid;
    console.log(uid);
    const response = await axios.post<{ uid: string }>('/api/setCustomClaim', {
      uid,
    });
    console.log(response);
  };

  if (!isAdmin)
    return (
      <DefaultTemplate>
        <div>
          <h1>no admin</h1>
          <Link href='/'>home</Link>
          <Button onClick={handleSetCustomClaim}>set custom claims</Button>
          <Button onClick={handleCheckCustomClaims}>check custom claims</Button>
          <Button onClick={handleWrite}>add</Button>
        </div>
      </DefaultTemplate>
    );
  return (
    <DefaultTemplate>
      <h1>admin</h1>
      <Link href='/'>home</Link>
      <Button onClick={handleCheckCustomClaims}>check custom claims</Button>
      <Button onClick={handleWrite}>add</Button>
      <Button onClick={handledeleteCustomClaims}>delete</Button>
    </DefaultTemplate>
  );
};

export default Admin;
