import type { User } from 'firebase/auth';
import { atom } from 'jotai';

export const userAtom = atom<User | null>(null);

export const isAdminAtom = atom<Promise<boolean>>(async (get) => {
  const user = get(userAtom);
  if (!user) return false;
  console.log('worked!!!!!!!!!!!!!!!');
  const idTokenResult = await user.getIdTokenResult();
  await user.getIdToken(true);
  await user.reload();
  console.log({ idTokenResult });
  return !!idTokenResult.claims.admin;
});

console.log({ userAtom });
