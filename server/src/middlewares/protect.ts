import { Request, Response, NextFunction } from 'express';
import { getGitHubUser } from '../helpers/githubApi';

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.session?.accessToken;

  if (!accessToken) {
    req.session?.destroy(() => {});
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const response = await getGitHubUser(accessToken);
  if (response.status !== 200) {
    req.session?.destroy(() => {});
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
