import type { User } from 'firebase/auth';
import { atom } from 'jotai';

export const userAtom = atom<User | null>(null);
console.log({ userAtom });
