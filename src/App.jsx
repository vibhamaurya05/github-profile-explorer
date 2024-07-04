// App.js
import React, { useState } from 'react';
import GithubProfile from './components/GitHubProfile';

const App = () => {
    const [username, setUsername] = useState('');
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(username);
    };

    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    className="p-2 border border-gray-400 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded ml-2">
                    Search
                </button>
            </form>
            {search && <GithubProfile username={search} />}
        </div>
    );
};

export default App;
