// TODO: clean up after auth0

export interface Token {
  accessToken: string;
  accessTokenExpires: number | null;
  refreshToken: string;
  user: Record<string, unknown>;
  error?: string;
}

export enum AuthProviderId {
  Google = 'google',
}
