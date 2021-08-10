import { TokenEntity } from 'types/auth';

export interface UserMetaData {
  tokenEntity: TokenEntity;
}

interface AuthenticationData {
  connection: string;
  isSocial: boolean;
  provider: string;
  user_id: string;
  profileData: Record<string, unknown>;
  access_token: string; // Technically optional
  expires_in: number; // Technically optional
  refresh_token: string; // Technically optional
}

export interface User {
  created_at: string; // ISO date string
  email_verified: boolean;
  email: string;
  family_name: string;
  given_name: string;
  identities: AuthenticationData[];
  last_password_reset: string; // ISO date string
  last_login: string; // ISO date string
  multifactor: string[];
  name: string;
  nickname: string;
  permissions: string;
  phone_number: string;
  phone_verified: boolean;
  picture: string;
  updated_at: string; // ISO date string
  user_id: string;
  username: string;
  user_metadata?: UserMetaData;
  app_metadata?: Record<string, unknown>;
}
