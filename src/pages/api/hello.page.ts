// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from './lib/firebaseAdmin';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const db = firebaseAdmin.firestore();
  // write
  db.collection('users').add({
    first: 'john',
    last: 'Lovelace',
    born: 1111,
  });
  res.status(200).json({ name: 'John Doe' });
}
