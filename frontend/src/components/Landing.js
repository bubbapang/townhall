import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000';

const Landing = () => {
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch(`${API_BASE}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProblems(data);
            } catch (error) {
                setError(`Error fetching problems: ${error.message}`);
            }
        };

        fetchProblems();
    }, []);

    return (
        <div>
            <h1>Problems</h1>
            {error && <p>Error fetching problems: {error}</p>}
            <ul>
                {problems.map((problem) => (
                    <li key={problem._id}>
                        <h2>{problem.name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Landing;