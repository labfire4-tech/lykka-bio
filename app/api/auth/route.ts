import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "users.json");

const ensureDb = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({}, null, 2));
};

export async function POST(req: Request) {
  ensureDb();
  try {
    const body = await req.json();
    const db: Record<string, any> = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

    // Login action
    if (body.action === "login") {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
      }
      const userEntry = Object.values(db).find(
        (u: any) => u.email === email && u.password === password
      );
      if (!userEntry) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
      return NextResponse.json({
        user: { username: userEntry.username, email: userEntry.email },
      });
    }

    // Register (default)
    const { username, email, password } = body;
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (db[username]) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    db[username] = { username, email, password, createdAt: new Date().toISOString() };
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    return NextResponse.json({ user: { username, email } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  ensureDb();
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const db: Record<string, any> = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  if (username && db[username]) {
    const { password, ...userWithoutPassword } = db[username];
    return NextResponse.json({ user: userWithoutPassword });
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
