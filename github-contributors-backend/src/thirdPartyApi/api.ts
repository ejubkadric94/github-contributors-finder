import { GITHUB_URL } from "./hosts";

export const GithubApi = {
    getContributorsConfig: (githubUser, repositoryName) => ({
        url: `${GITHUB_URL}/repos/${githubUser}/${repositoryName}/contributors`,
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${process.env.GITHUB_API_KEY}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })
}