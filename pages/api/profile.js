import fs from 'fs';
import path from 'path';

const DB_FILE = '/tmp/profiles.json';

const ensureDb = () => {
  const dir = '/tmp';
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '{}');
};

export default async function handler(req, res) {
  ensureDb();
  
  const { username } = req.query;
  
  if (req.method === 'GET') {
    try {
      const profiles = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      if (username && profiles[username]) {
        return res.status(200).json(profiles[username]);
      }
      return res.status(404).json({ error: 'Profile not found' });
    } catch {
      return res.status(404).json({ error: 'Profile not found' });
    }
  }
  
  if (req.method === 'POST') {
    try {
      const { username: bodyUsername, ...profile } = req.body;
      const profiles = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      profiles[bodyUsername] = profile;
      fs.writeFileSync(DB_FILE, JSON.stringify(profiles, null, 2));
      return res.status(200).json({ success: true });
    } catch {
      return res.status(500).json({ error: 'Save failed' });
    }
  }
  
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}