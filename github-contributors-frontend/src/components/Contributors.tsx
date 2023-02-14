import { useCallback, useState } from "react";
import useContributors from "../customHooks/useContributors";
import useDebounce from "../customHooks/useDebounce";
import ContributorsList from "./ContributorsList";

const Contributors = () => {
    const [userName, setUserName] = useState('');
    const [repositoryName, setRepositoryName] = useState('');
    const debouncedGithubUser = useDebounce(userName);
    const debouncedGithubRepo = useDebounce(repositoryName);

    const { 
        data,
        error,
        isError,
        isLoading,
        isSuccess,
     } = useContributors(debouncedGithubUser, debouncedGithubRepo);

    const onSetUserName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.currentTarget.value);
    }, [setUserName]);
    
      const onSetRepositoryName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRepositoryName(event.currentTarget.value);
    }, [setRepositoryName]);

    return (
        <>
            <form>
                <label>
                    Github User:
                    <input type="text" name="userName" onChange={onSetUserName} value={userName} />
                </label>
                <label>
                    Github Repository:
                    <input type="text" name="repositoryName" onChange={onSetRepositoryName} value={repositoryName} />
                </label>
            </form>
            <ContributorsList
                data={data}
                error={error instanceof Error ? error : undefined}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
            />
        </>
    );
};

export default Contributors;
