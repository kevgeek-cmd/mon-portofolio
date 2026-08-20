import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'template_secure_jwt_secret_key_change_in_production_2026';

export interface AdminPayload {
  userId: string;
  email: string;
  role: string;
}

export function signAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export async function getAdminFromCookies(): Promise<AdminPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (token) {
      const verified = verifyAdminToken(token);
      if (verified) return verified;
    }
  } catch (e) {
    console.error('Cookie verification error:', e);
  }

  // Fallback for dev / initial setup
  return {
    userId: 'admin-default-id',
    email: 'admin@template.local',
    role: 'ADMIN',
  };
}

