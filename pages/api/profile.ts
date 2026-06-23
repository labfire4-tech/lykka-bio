import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'profiles.json');

const ensureDb = () => {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '{}');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  ensureDb();
  
  const { username } = req.query;
  
  if (req.method === 'GET') {
    const profiles: Record<string, any> = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    if (username && profiles[username as string]) {
      return res.status(200).json(profiles[username as string]);
    }
    return res.status(404).json({ error: 'Profile not found' });
  }
  
  if (req.method === 'POST') {
    const { username: bodyUsername, ...profile } = req.body;
    const profiles: Record<string, any> = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    profiles[bodyUsername] = profile;
    fs.writeFileSync(DB_FILE, JSON.stringify(profiles, null, 2));
    return res.status(200).json({ success: true });
  }
  
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}