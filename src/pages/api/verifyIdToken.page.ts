import { firebaseAdmin } from './lib/firebaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('verifyIdToken.page.ts');
  // postの確認
  if (req.method !== 'POST') {
    res.status(400).json({ text: 'not supported' });
    return;
  }

  // idTokenがpostのbodyに含まれているか確認
  if (!req.body.idToken) {
    res.status(400).json({ text: 'idToken is required' });
    return;
  }

  const idToken = req.body.idToken as string;

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    console.log(decodedToken);
  } catch (e) {
    console.log(e);
    res.status(400).json({ text: 'error' });
    return;
  }
  res.status(200).json({ text: 'ok' });
}
