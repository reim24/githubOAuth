import { NextFunction, Request, Response } from 'express';
import Commit from '../models/Commit';
import { fetchGitHubData } from '../helpers/githubApi';

const getStarredRepos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.session?.username;
  const accessToken = req.session?.accessToken;

  if (!username || !accessToken) {
    return next({ statusCode: 401, message: 'Unauthorized' });
  }

  try {
    const response = await fetchGitHubData(
      `https://api.github.com/users/${username}/starred`,
      accessToken
    );
    res.json(response.data);
  } catch (error) {
    next({
      statusCode: 500,
      message: 'Failed to fetch starred repositories.',
      error,
    });
  }
};

const getStarredRepoCommits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repoName = req.params.name;
  const author = req.session?.username;

  if (!author) {
    return next({ statusCode: 401, message: 'Unauthorized' });
  }

  try {
    const commits = await Commit.aggregate([
      { $match: { author: author, repoName: repoName } },
      {
        $project: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          message: 1,
        },
      },
      { $group: { _id: '$date', commits: { $push: '$message' } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(commits);
  } catch (error) {
    next({
      statusCode: 500,
      message: 'Failed to fetch repository commits.',
      error,
    });
  }
};

export default { getStarredRepos, getStarredRepoCommits };
