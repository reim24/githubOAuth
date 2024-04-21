import axios from 'axios';

export async function fetchGitHubData(url: string, accessToken: string) {
  return await axios.get(url, {
    headers: { Authorization: `token ${accessToken}` },
  });
}

export async function getGitHubAccessToken(
  code: string | any
): Promise<string> {
  const { data } = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    { headers: { accept: 'application/json' } }
  );
  return data.access_token;
}

export async function getGitHubUser(access_token: string) {
  return await axios.get('https://api.github.com/user', {
    headers: { Authorization: `token ${access_token}` },
  });
}
