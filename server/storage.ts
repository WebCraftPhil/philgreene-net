import {
  type User,
  type InsertUser,
  type ContactSubmission,
  type InsertContactSubmission,
  users,
  contactSubmissions
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contact submission
  insertContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async insertContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.insert(contactSubmissions).values(submission).returning();
    return result;
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private submissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async insertContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const result: ContactSubmission = {
      ...submission,
      id,
      projectType: submission.projectType ?? null,
      budget: submission.budget ?? null,
      sentAt: new Date().toISOString()
    };
    this.submissions.set(id, result);
    return result;
  }
}

export const storage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemStorage();
