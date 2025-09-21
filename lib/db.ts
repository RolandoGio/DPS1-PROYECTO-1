import { promises as fs } from "fs";
import path from "path";

export type User = { id: number|string; name: string; email: string; password?: string; role?: "manager"|"user" };
export type Project = { id: number|string; name: string; description?: string; progress?: number; createdAt?: string };
export type Task = { id: number|string; title: string; status: "todo"|"doing"|"done"; projectId: number|string; assignee?: string };

export type DB = { users: User[]; projects: Project[]; tasks: Task[] };

const DB_PATH = path.join(process.cwd(), "db.json");

export async function readDB(): Promise<DB> {
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw);
}

export async function writeDB(db: DB) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export function genId(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2,10)}`;
}
