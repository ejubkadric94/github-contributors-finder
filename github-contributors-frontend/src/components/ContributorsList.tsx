import externalLinks from "../api/externalLinks";

type Props = {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error?: Error;
    data?: string[];
}

const getUserNameFromGithubURL = (link: string): string => link.split(externalLinks.githubUrl)[1];

const ContributorsList = ({ isLoading, isError, error, isSuccess, data }: Props): JSX.Element => {
    if (isLoading) {
        return <div>Loading...</div>;
    } else if (isError && (error instanceof Error)) {
        return <div>{error.message}</div>;
    } else if (isSuccess && data) {
        return (
            <ol data-testid='list'>
                {data.map((link: string, index: number) =>
                    <li key={index}>
                        <a href={link} target="_blank" rel="noreferrer">{getUserNameFromGithubURL(link)}</a>
                    </li>
                )}
            </ol>
        )
    }
    
    return <div />;
};

export default ContributorsList;
