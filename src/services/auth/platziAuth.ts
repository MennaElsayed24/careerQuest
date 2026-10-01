import { isAxiosError } from "axios";
import { api } from "../../lib/axios";
import { API_CONFIG } from "../../lib/apiConfig";
import type { User } from "../../types/user";

const SESSION_KEY = "careerquest_auth_session";

export function getAuthErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) {
    return error instanceof Error ? error.message : "Authentication failed.";
  }

  if (error.response?.status === 401) {
    return "Email or password is incorrect.";
  }
  if (error.response?.status === 409) {
    return "An account with this email already exists. Sign in instead.";
  }

  const responseMessage = error.response?.data?.message;
  if (typeof responseMessage === "string") return responseMessage;
  if (Array.isArray(responseMessage)) return responseMessage.join(" ");
  if (!error.response) {
    return "Could not reach the authentication service. Check your connection and try again.";
  }

  return "The authentication service could not complete this request.";
}

interface PlatziUser {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  creationAt?: string;
}

interface ApiTokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthSession extends ApiTokens {
  user: User;
}

function toUser(user: PlatziUser): User {
  return {
    id: String(user.id),
    email: user.email,
    fullName: user.name,
    avatarUrl: user.avatar,
    createdAt: user.creationAt,
  };
}

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== "object") return false;

  const session = value as Partial<AuthSession>;
  return (
    typeof session.access_token === "string" &&
    typeof session.refresh_token === "string" &&
    typeof session.user?.id === "string" &&
    typeof session.user.email === "string" &&
    typeof session.user.fullName === "string"
  );
}

export function readAuthSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isAuthSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function saveAuthSession(session: AuthSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

async function loadProfile(accessToken: string): Promise<User> {
  const response = await api.get<PlatziUser>(
    `${API_CONFIG.platziStore}/auth/profile`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return toUser(response.data);
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthSession> {
  const response = await api.post<ApiTokens>(
    `${API_CONFIG.platziStore}/auth/login`,
    { email: email.trim().toLowerCase(), password },
  );
  const user = await loadProfile(response.data.access_token);
  const session = { ...response.data, user };
  saveAuthSession(session);
  return session;
}

export async function registerWithEmail(
  fullName: string,
  email: string,
  password: string,
): Promise<AuthSession> {
  const normalizedEmail = email.trim().toLowerCase();
  const avatar = new URL("/favicon.svg", window.location.origin).toString();

  await api.post<PlatziUser>(`${API_CONFIG.platziStore}/users`, {
    name: fullName.trim(),
    email: normalizedEmail,
    password,
    role: "customer",
    avatar,
  });

  return signInWithEmail(normalizedEmail, password);
}

async function refreshAuthSession(session: AuthSession): Promise<AuthSession> {
  const response = await api.post<ApiTokens>(
    `${API_CONFIG.platziStore}/auth/refresh-token`,
    { refreshToken: session.refresh_token },
  );
  const user = await loadProfile(response.data.access_token);
  const refreshed = { ...response.data, user };
  saveAuthSession(refreshed);
  return refreshed;
}

export async function restoreAuthSession(): Promise<AuthSession | null> {
  const session = readAuthSession();
  if (!session) return null;

  try {
    const user = await loadProfile(session.access_token);
    const restored = { ...session, user };
    saveAuthSession(restored);
    return restored;
  } catch (error) {
    if (!isAxiosError(error) || error.response?.status !== 401) {
      clearAuthSession();
      return null;
    }
  }

  try {
    return await refreshAuthSession(session);
  } catch {
    clearAuthSession();
    return null;
  }
}

export async function updateAuthProfile(
  fullName: string,
): Promise<AuthSession> {
  const session = readAuthSession();
  if (!session) throw new Error("Your session has expired. Please sign in again.");

  const response = await api.put<PlatziUser>(
    `${API_CONFIG.platziStore}/users/${session.user.id}`,
    { name: fullName.trim() },
    { headers: { Authorization: `Bearer ${session.access_token}` } },
  );

  const updatedSession = { ...session, user: toUser(response.data) };
  saveAuthSession(updatedSession);
  return updatedSession;
}

export function signOutFromAuth() {
  clearAuthSession();
}
