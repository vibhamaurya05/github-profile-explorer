import React, { useState, useRef } from "react";

const GitHubUser = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [liveLink, setLiveLink] = useState([])
  const [fetchUsermsg, setFetchUsermsg] = useState(false)

  const inputRef = useRef(null);

  const fetchUserData = async (e) => {
    e.preventDefault();
    if (!username) return;

    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      const userData = await userResponse.json();
      setUserData(userData);

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const userRepos = await reposResponse.json();
      setUserRepos(userRepos);
    } catch (error) {
      setError("Error fetching user data");
      setUserData(null);
      setUserRepos([]);
    }

  };

  const sendFetchDataMsg = () => {
    if (username == "") {
      alert("Enter Username");
    } else {
      setFetchUsermsg(true);
    }
  };

  return (
    <div className=" text-[white] flex flex-col gap-6 text-center py-4">
      <h1 className="text-4xl font-bold">Github User</h1>
      <div>
        <form onSubmit={fetchUserData}>
          <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Github username"
            className=" text-[black] border-[2px] rounded py-2 px-4 pr-16"
          />
          <button
            type="submit"
            className="bg-[#f56826] border-[2px] border-[#00000005] rounded py-2 px-5"
            onClick={sendFetchDataMsg}
          >
            Submit
          </button>
        </form>
      </div>

      <div className="flex justify-evenly gap-6 mx-6 px-6">
        <div className="h-[30vh] w-[35vw] rounded-lg my-4 text-left text-[#a8a8a8]">
          {userData && (
            <div className="">
            <h3 className="text-2xl font-bold">USER DETAILS</h3>
              <h2>USERNAME: {userData.name}</h2>
              <p>BIO: {userData.bio}</p>
              <p>LOCATION: {userData.location}</p>
            </div>
          )}
        </div>

        <div className="h-[69vh] w-[60vw] rounded-lg my-4 overflow-y-auto no-scrollbar text-left text-[#a8a8a8]">
          {userRepos.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold">PROJECTS</h3>
              <ul>
                {userRepos.map((repo) => (
                  <li key={repo.id}>
                    <a
                      href={repo.html_url}
                      target="_blank"

                    >
                     REPOSITORY: {repo.name}
                    </a><br/>

                    <p>DESCRIPTION: {repo.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubUser;

