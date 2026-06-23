import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "profiles.json");

const ensureDb = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({}, null, 2));
};

export async function GET(req: Request) {
  ensureDb();
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const db: Record<string, any> = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  if (!username) return NextResponse.json({ profiles: db });
  if (db[username]) return NextResponse.json({ profile: db[username] });
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function POST(req: Request) {
  ensureDb();
  try {
    const profile = await req.json();
    if (!profile?.username) return NextResponse.json({ error: "Username required" }, { status: 400 });
    const db: Record<string, any> = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    db[profile.username] = profile;
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}