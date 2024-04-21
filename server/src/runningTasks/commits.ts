import axios from 'axios';
import Session from '../models/Session';
import Commit from '../models/Commit';
import schedule from 'node-schedule';

const fetchStarredRepos = async (accessToken: string, username: string) => {
  const url = `https://api.github.com/users/${username}/starred`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `token ${accessToken}` },
    });
    return response.data.map((repo: any) => ({
      name: repo.name,
      owner: repo.owner.login,
    }));
  } catch (error) {
    console.error('Error fetching starred repos:', error);
    return [];
  }
};

const fetchCommitsForRepo = async (
  repo: any,
  username: string,
  accessToken: string
) => {
  const url = `https://api.github.com/repos/${repo.owner}/${repo.name}/commits?author=${username}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `token ${accessToken}` },
    });
    return response.data.map((commit: any) => ({
      date: new Date(commit.commit.committer.date),
      message: commit.commit.message,
      sha: commit.sha,
    }));
  } catch (error) {
    console.error(`Error fetching commits for ${repo.name}:`, error);
    return [];
  }
};

const fetchAndStoreData = async () => {
  const sessions = await Session.find();
  sessions.forEach(async (session) => {
    const { accessToken, username } = session.session;
    const repos = await fetchStarredRepos(accessToken, username);
    repos.forEach(async (repo: any) => {
      const commits = await fetchCommitsForRepo(repo, username, accessToken);
      commits.forEach(async (commit: any) => {
        const uniqueIdentifier = `${repo.name}:${commit.sha}`;
        if (!(await Commit.exists({ uniqueIdentifier }))) {
          const newCommit = new Commit({
            date: commit.date,
            message: commit.message,
            author: username,
            repoName: repo.name,
            uniqueIdentifier,
          });
          await newCommit.save();
        }
      });
    });
  });
};
const initialize = () => {
  schedule.scheduleJob('*/5 * * * *', () => {
    console.log('Running scheduled task to fetch and store commits');
    fetchAndStoreData();
  });
};

export default { initialize };
