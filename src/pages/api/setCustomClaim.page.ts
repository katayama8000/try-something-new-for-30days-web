import type { NextApiRequest, NextApiResponse } from 'next';

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

  const uid = req.body.uid as string;
  console.log(uid);

  const kind = req.body.kind as string | undefined;
  // TODO

  const claims = {
    user: true,
  };

  try {
    firebaseAdmin.auth().setCustomUserClaims(uid, claims);
  } catch (e) {
    console.log(e);
    res.status(400).json({ text: 'error' });
    return;
  }
  res.status(200).json({ text: 'ok' });
}
