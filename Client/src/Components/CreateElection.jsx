import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from './Navbar';
import cookie from 'react-cookies';

function CreateElection() {
    const [electionId, setElectionId] = useState('');
    const [electionName, setElectionName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState(''); // Add startTime state
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState(''); // Add endTime state
    const [candidatesExist, setCandidatesExist] = useState(false);

    useEffect(() => {
        const fetchCandidateData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/candidateRoutes/getCandidates');
                setCandidatesExist(response.data.length > 0);
            } catch (error) {
                console.error('Error fetching candidate data:', error);
            }
        };
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
                        fetchCandidateData();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const today = new Date();
            const thirtyDaysFromNow = new Date(today);
            thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

            const selectedStartDate = new Date(`${startDate}T${startTime}`);
            const selectedEndDate = new Date(`${endDate}T${endTime}`);

            if (selectedStartDate < today) {
                toast.error('Start date and time cannot be before the present time!');
                return;
            }

            if (selectedStartDate > thirtyDaysFromNow) {
                toast.error('Start date and time cannot be more than 30 days from today!');
                return;
            }

            if (selectedEndDate < selectedStartDate) {
                toast.error('End date and time cannot be before start date and time!');
                return;
            }

            const response = await axios.post("http://localhost:5000/ElectionRoutes/createElection", {
                electionId,
                electionName,
                startDate: selectedStartDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                startTime: selectedStartDate.toISOString().split('T')[1].slice(0, 5), // Format as HH:MM
                endDate: selectedEndDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                endTime: selectedEndDate.toISOString().split('T')[1].slice(0, 5) // Format as HH:MM
            });

            if (response.data.added) {
                toast.success('Election created successfully!');
                console.log('Election created successfully!');
                localStorage.setItem('electionId', electionId);
                setTimeout(() => {
                    window.location.href = "/addCandidate";

                }, 1000);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while submitting the form.');
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="w-full h-full flex justify-center items-center">
                <div className="bg-white rounded shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-4">Create Election</h2>
                    <h2 className="text-base font-semibold mb-4">Please Add Election ID and Election Name differents</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="electionId" className="font-semibold mb-1">Election ID</label>
                            <input
                                type="text"
                                id="electionId"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={electionId}
                                onChange={(e) => setElectionId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="electionName" className="font-semibold mb-1">Election Name</label>
                            <input
                                type="text"
                                id="electionName"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={electionName}
                                onChange={(e) => setElectionName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="startDate" className="font-semibold mb-1">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="startTime" className="font-semibold mb-1">Start Time</label>
                            <input
                                type="time"
                                id="startTime"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="endDate" className="font-semibold mb-1">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="endTime" className="font-semibold mb-1">End Time</label>
                            <input
                                type="time"
                                id="endTime"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Election</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateElection;
