import { useCallback, useState } from "react";
import useContributors from "../customHooks/useContributors";

const Contributors = () => {
    const [userName, setUserName] = useState('');
    const [repositoryName, setRepositoryName] = useState('');

    const { data, isError, isLoading, error } = useContributors(userName, repositoryName);

    const onSetUserName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.currentTarget.value);
    }, [setUserName]);
    
      const onSetRepositoryName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRepositoryName(event.currentTarget.value);
    }, [setRepositoryName]);

    let list;

    if (isLoading) {
        list = <div>Loading...</div>;
    } else if (isError && (error instanceof Error)) {
        list = <div>{error.message}</div>;
    } else {
        list = (
            <ol>
                {data.map((e: string, index: number) => <li key={index}>{e}</li>)}
            </ol>
        )
    }

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
            {list}
        </>
    );
};

export default Contributors;
