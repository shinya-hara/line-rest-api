export interface ICreateAccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: 'Bearer';
}
