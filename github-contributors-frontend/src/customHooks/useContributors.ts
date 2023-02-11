import { useQuery } from "react-query";

const useContributors = (userName: string, repositoryName: string) => {
    const fetchContributors = async (userName: string, repositoryName: string) => {
        const response = await fetch(`https://reqres.in/api/users?userName=${userName}&repositoryName=${repositoryName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const results = await response.json();
        return results.data.map((el: { first_name: string }) => el.first_name);
    };

    const contributors = useQuery(
        ['contributors', userName, repositoryName],
        () => fetchContributors(userName, repositoryName),
        { staleTime: Infinity }
    );

    return contributors;
};

export default useContributors;
