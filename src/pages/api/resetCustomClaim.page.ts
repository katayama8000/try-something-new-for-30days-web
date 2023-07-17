import { type NextApiRequest, type NextApiResponse } from 'next';

import { firebaseAdmin } from './lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // postの確認
  if (req.method !== 'POST') {
    res.status(400).json({ text: 'not supported' });
    return;
  }

  // uidがpostのbodyに含まれているか確認
  if (!req.body.uid) {
    res.status(400).json({ text: 'uid is required' });
    return;
  }

  const uid = req.body.uid;
  console.log(uid);

  try {
    firebaseAdmin.auth().setCustomUserClaims(uid, { admin: null, premium: null });
  } catch (e) {
    console.log(e);
    res.status(400).json({ text: 'error' });
    return;
  }
  res.status(200).json({ text: 'ok' });
}
