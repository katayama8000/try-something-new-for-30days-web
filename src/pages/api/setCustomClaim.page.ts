import type { NextApiRequest, NextApiResponse } from 'next';

import { firebaseAdmin } from './lib/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // postの確認
  if (req.method !== 'POST') {
    res.status(400).json({ text: 'not supported' });
    return;
  }
  const { kind, uid } = req.body as { kind: string; uid: string };
  console.log(uid);

  // uidがpostのbodyに含まれているか確認
  if (!uid) {
    res.status(400).json({ text: 'uid is required' });
    return;
  }

  const claims = {
    kind,
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
