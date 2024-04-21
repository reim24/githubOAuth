import { NextFunction, Request, Response } from 'express';
import { getGitHubAccessToken, getGitHubUser } from '../helpers/githubApi';

const loginWithGithub = (req: Request, res: Response) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user`;
  res.redirect(url);
};

const redirectFromGithub = async (req: Request, res: Response) => {
  const code = req.query.code;

  try {
    const access_token = await getGitHubAccessToken(code);
    const userResponse = await getGitHubUser(access_token);

    req.session!.userId = userResponse.data.id;
    req.session!.username = userResponse.data.login;
    req.session!.accessToken = access_token;

    res.redirect(`${process.env.CLIENT_URL}/redirect`);
  } catch (error) {
    console.error('Error redirecting', error);
    res.redirect(`${process.env.CLIENT_URL}/failure`);
  }
};

const logout = (req: Request, res: Response) => {
  req.session.destroy(() => res.redirect(`${process.env.CLIENT_URL}`));
};

const me = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.accessToken) {
    return res.sendStatus(204);
  }
  try {
    const response = await getGitHubUser(req.session.accessToken);
    res.json(response.data);
  } catch (error) {
    req.session.destroy(() =>
      next({ statusCode: 401, message: 'Unauthorized' })
    );
  }
};

export default { loginWithGithub, logout, redirectFromGithub, me };
