import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VoterNavbar from './VoterNavbar';
import cookie from 'react-cookies';

function GiveVote() {
    const [selectedElection, setSelectedElection] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState("");
    const [candidateParty, setCandidateParty] = useState("");
    const [elections, setElections] = useState([]);
    const [candidatesByElection, setCandidatesByElection] = useState([]);
    const [voterData, setVoterData] = useState([]);
    const [canVote, setCanVote] = useState(false);
    const [voterID, setVoterID] = useState(localStorage.getItem("voterID") || "");
    const [voterName, setVoterName] = useState("");

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const response = await axios.get('http://localhost:5000/electionRoutes/getElections');
                setElections(response.data);
            } catch (error) {
                console.error('Error fetching elections:', error);
            }
        };

        const fetchVoterDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/voterRoutes/${voterID}`);
                if (response.data) {
                    setVoterName(response.data.voterName);
                }
            } catch (error) {
                console.error('Error fetching voter details:', error);
            }
        };

        const verifyToken = async () => {
            const token = cookie.load('token');
            if (!token) {
                window.location.href = '/signin';
            } else {
                try {
                    await axios.get('http://localhost:5000/auth/middleware', {
                        headers: { cookie: token, withCredentials: true }
                    });
                    fetchElections();
                    fetchVoterDetails();
                } catch (error) {
                    console.error('Error verifying token:', error);
                    cookie.remove('token');
                    window.location.href = '/signin';
                }
            }
        };

        verifyToken();
    }, [voterID]);

    const handleElectionChange = async (e) => {
        const selectedElectionId = e.target.value;
        setSelectedElection(selectedElectionId);
        try {
            const response = await axios.post('http://localhost:5000/candidateRoutes/getCandidates', { electionId: selectedElectionId });
            setCandidatesByElection(response.data);
            const selectedElectionData = elections.find(election => election.electionId === selectedElectionId);
            if (selectedElectionData) {
                checkVotingEligibility(selectedElectionData);
            }
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const checkVotingEligibility = (election) => {
        const now = new Date();
        const startDateTime = new Date(`${election.startDate.split("T")[0]}T${election.startTime}:00`);
        const endDateTime = new Date(`${election.endDate.split("T")[0]}T${election.endTime}:00`);
        const utcNow = new Date(now.toUTCString());
        const eligibility = utcNow >= startDateTime && utcNow <= endDateTime;
        setCanVote(eligibility);
    };

    const handleCandidate = (e) => {
        const selectedValue = e.target.value;
        const [candidateName, party] = selectedValue.split(" - ");
        setSelectedCandidate(candidateName);
        setCandidateParty(party);
    };

    const handleVote = async () => {
        const hasVoted = voterData.some(voter => voter.Election_ID === selectedElection);
        if (hasVoted) {
            toast.error("You have already voted in this election.");
            return;
        }

        try {
            await axios.post('http://localhost:5000/voteRoutes/submitVote', {
                Voter_ID: voterID,
                Voter_Name: voterName,
                Candidate_Name: selectedCandidate,
                Candidate_Party: candidateParty,
                Election_ID: selectedElection
            });
            toast.success("Thank you! Your vote has been submitted");

            setVoterData([...voterData, { Election_ID: selectedElection }]);
            setSelectedElection("");
            setSelectedCandidate("");
            setCandidateParty("");
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    return (
        <>
            <VoterNavbar />
            <ToastContainer />
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="bg-white shadow-md rounded-md p-6">
                    <h1 className="text-2xl font-bold mb-4">Give Vote</h1>
                    <div className="mb-4">
                        <label htmlFor="election" className="block text-sm font-semibold mb-2">Select Election:</label>
                        <select
                            id="election"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                            value={selectedElection}
                            onChange={handleElectionChange}
                            required
                        >
                            <option value="">Select election</option>
                            {elections.map(election => (
                                <option key={election.electionId} value={election.electionId}>{election.electionName}</option>
                            ))}
                        </select>
                    </div>
                    {selectedElection && (
                        <div className="mb-4">
                            <label htmlFor="candidate" className="block text-sm font-semibold mb-2">Select Candidate:</label>
                            <select
                                id="candidate"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                                value={`${selectedCandidate} - ${candidateParty}`}
                                onChange={handleCandidate}
                                required
                            >
                                <option value="">Select candidate</option>
                                {candidatesByElection.map(candidate => (
                                    <option key={candidate.name} value={`${candidate.name} - ${candidate.party}`}>
                                        {candidate.name} - {candidate.party}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button
                        className={`py-2 px-4 rounded-md ${canVote ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        onClick={handleVote}
                        disabled={!canVote}
                    >
                        Submit Vote
                    </button>
                </div>
            </div>
        </>
    );
}

export default GiveVote;
