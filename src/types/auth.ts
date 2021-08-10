export interface TokenEntity {
  accessToken: string;
  expiresAt: string; // ISO date
  refreshToken: string;
}
