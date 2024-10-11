import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

const Home = () => {
  const [electionData, setElectionData] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // State to manage details display

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/electionRoutes/getElections');
        setElectionData(response.data);
      } catch (error) {
        console.error('Error fetching election data:', error);
      }
    };

    const verifyToken = async () => {
      try {
        const token = cookie.load('token');
        if (!token) {
          window.location.href = '/signin';
        } else {
          const response = await axios.get('http://localhost:3000/auth/middleware', {}, {
            headers: {
              cookie: token,
              withCredentials: true
            }
          }).then(res => {
            console.log('Token verified:', res);
            fetchData();
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

  return (
    <>
      <Navbar />
      <div className="py-5 min-h-[100vh] h-auto">
        <div className="flex items-center justify-center mt-[60px] space-x-3">
          <button className='border bg-blue-500 text-white font-semibold px-3 py-1 cursor-pointer rounded-md' onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide Election Details' : 'Show Election Details'}
          </button>
        </div>
        {showDetails && (
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Start Date</th>
                <th>Start Time</th>
                <th>End Date</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {electionData.map(election => (
                <tr key={election.electionId}>
                  <td>{election.electionId}</td>
                  <td>{election.electionName}</td>
                  <td>{election.startDate}</td>
                  <td>{election.startTime}</td>
                  <td>{election.endDate}</td>
                  <td>{election.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Home;
