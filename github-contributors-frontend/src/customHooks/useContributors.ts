import { useQuery } from "react-query";
import Api from "../api/api";

const useContributors = (githubUser: string, repositoryId: string) => {
    const fetchContributors = async (githubUser: string, repositoryId: string) => {
        const response = await fetch(Api.getRepositoryContributors(githubUser, repositoryId));
        if (!!response && !response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }
        return await response.json();
    };

    const contributors = useQuery(
        ['contributors', githubUser, repositoryId],
        () => fetchContributors(githubUser, repositoryId),
        {
            staleTime: Infinity,
            retry: 1,
            enabled: !!githubUser && !!repositoryId,
        }
    );

    return contributors;
};

export default useContributors;
