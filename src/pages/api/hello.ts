// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

// type Data = {
//   name: string;
// };

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const handles = (process as any)._getActiveHandles?.() || [];
  res.json({ openHandles: handles.length });
  // res.status(200).json({ name: 'John Doe' });
}
