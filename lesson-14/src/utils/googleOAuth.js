import { OAuth2Client } from 'google-auth-library';

import { getEnvVariable } from './getEnvVariable.js';

const client = new OAuth2Client({
  clientId: getEnvVariable('GOOGLE_CLIENT_ID'),
  clientSecret: getEnvVariable('GOOGLE_CLIENT_SECRET'),
  redirectUri: getEnvVariable('GOOGLE_REDIRECT_URI'),
});

export function getOAuthURL() {
  return client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
}

export async function validateCode(code) {
  const response = await client.getToken(code);

  return client.verifyIdToken({
    idToken: response.tokens.id_token,
  });
}
