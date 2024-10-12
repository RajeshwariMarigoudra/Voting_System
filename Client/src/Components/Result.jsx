import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import cookie from 'react-cookies';

function Result() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchResults = async () => {
        try {
            const response = await axios.get('http://localhost:5000/voteRoutes/electionResults');
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching election results:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = cookie.load('token');
                if (!token) {
                    window.location.href = '/signin';
                } else {
                    const response = await axios.get('http://localhost:5000/auth/middleware', {}, {
                        headers: {
                            cookie: token,
                            withCredentials: true
                        }
                    }).then(res => {
                        console.log('Token verified:', res);
                        fetchResults();
                    }).catch(err => {
                        console.error('Error verifying token:', err);
                        cookie.remove('token');
                        window.location.href = '/signin';
                    });
                }
            } catch (error) {
                console.error('Error verifying token:', error);
            }
        };
        verifyToken();
    }, []);


    const handleRefresh = async () => {

        setLoading(true);

        await fetchResults();
    };

    return (
        <>
            <Navbar />
            <div className="py-5 min-h-[100vh] h-auto">
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-4 mt-4">Election Results</h2>

                    <button className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded" onClick={handleRefresh}>Refresh Election Results</button>
                    {loading ? (
                        <p className="text-gray-600 mt-4">Loading...</p>
                    ) : (
                        <table className="w-full mt-4 border-collapse border border-gray-200">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2">Election ID</th>
                                    <th className="px-4 py-2">Winner</th>
                                    <th className="px-4 py-2">Votes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(result => (
                                    <tr key={result._id} className="border-b border-gray-200">
                                        <td className="px-4 py-2">{result.electionName}</td>
                                        <td className="px-4 py-2">{result.winner}</td>
                                        <td className="px-4 py-2">{result.votes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Result;
