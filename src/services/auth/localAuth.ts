import type { User } from "../../types/user";

const ACCOUNTS_KEY = "careerquest_accounts";
const SESSION_KEY = "careerquest_user";
const PASSWORD_ITERATIONS = 120_000;

interface StoredAccount {
  user: User;
  salt: string;
  passwordHash: string;
}

function readAccounts(): StoredAccount[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(ACCOUNTS_KEY) ?? "[]",
    );
    return Array.isArray(value) ? (value as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;

  const user = value as Partial<User>;
  return (
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    typeof user.fullName === "string"
  );
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

function fromHex(value: string): Uint8Array {
  return Uint8Array.from(
    value.match(/.{1,2}/g) ?? [],
    (byte) => Number.parseInt(byte, 16),
  );
}

async function hashPassword(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: new Uint8Array(salt),
      iterations: PASSWORD_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256,
  );
  return toHex(new Uint8Array(bits));
}

export function getCurrentUser(): User | null {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null");
    return isUser(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: User) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(SESSION_KEY);
}

export async function registerLocalAccount(
  fullName: string,
  email: string,
  password: string,
): Promise<User> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = readAccounts();

  if (accounts.some((account) => account.user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists. Sign in instead.");
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const user: User = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    fullName: fullName.trim(),
    createdAt: new Date().toISOString(),
  };

  accounts.push({
    user,
    salt: toHex(salt),
    passwordHash: await hashPassword(password, salt),
  });
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  return user;
}

export async function signInLocalAccount(
  email: string,
  password: string,
): Promise<User> {
  const normalizedEmail = email.trim().toLowerCase();
  const account = readAccounts().find(
    (entry) => entry.user.email === normalizedEmail,
  );

  if (!account) throw new Error("Email or password is incorrect.");

  const passwordHash = await hashPassword(password, fromHex(account.salt));
  if (passwordHash !== account.passwordHash) {
    throw new Error("Email or password is incorrect.");
  }

  return account.user;
}