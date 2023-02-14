import externalLinks from "./externalLinks";

const Api = {
    getRepositoryContributors: (githubUser: string, repositoryId: string) => `${externalLinks.backendUrl}contributors?githubUser=${githubUser}&repositoryId=${repositoryId}`,
}

export default Api;
