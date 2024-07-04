
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GithubProfile = ({ username }) => {
    const [userData, setUserData] = useState(null);
    const [repoData, setRepoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userResponse = await axios.get(`https://api.github.com/users/${username}`);
                setUserData(userResponse.data);

                const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
                const filteredRepos = reposResponse.data.filter(repo => repo.homepage !== null);
                setRepoData(filteredRepos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p className="text-red-500">An error has occurred: {error}</p>;

    return (
        <div className=" flex justify-between gap-6 w-full  h-auto p-8 mt-9  rounded-lg">
            <div className=" h-[38vh] w-[30vw] flex gap-3 p-3 flex-wrap ">
                <h1 className='text-3xl font-bold'>USER DETAILS</h1>
                <div className="text-justify">
                    <p className=" text-xl font-semibold">{userData?.name}</p>
                    <p>
                        <span className="text-gray-500">{userData?.login}</span>
                        <br />
                        {userData?.bio}
                        <br />
                        {userData?.location}
                    </p>
                </div>
            </div>
            <div className="h-[62vh] flex justify-center text-left overflow-y-scroll">
                <ul className="w-[50vw] ">
                <h1 className='text-3xl font-bold p-3'>PROJECTS</h1>
                    {repoData.map(repo => (
                        <li key={repo.id} className="mt-3   w-full px-3 py-2 rounded-md">
                            {repo.name}:{" "}
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                Live link
                            </a>
                            <p className=''>{repo.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GithubProfile;
