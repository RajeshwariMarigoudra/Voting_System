import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import cookie from 'react-cookies';


const UpdateElection = () => {
  const navigate = useNavigate();
  const [electionId, setElectionId] = useState('');
  const [electionName, setElectionName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');


  const handleTimeChange = (timeType, value) => {
    if (timeType === 'start') {
        setStartTime(value);
    } else if (timeType === 'end') {
        setEndTime(value);
    }
};

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const today = new Date();
      const thirtyDaysFromNow = new Date(today);
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const selectedStartDate = new Date(`${startDate}T${startTime}`);
      const selectedEndDate = new Date(`${endDate}T${endTime}`);

        // Validation checks
        if (!startTime || !endTime) {
          toast.error('Both start and end times must be selected!');
          return;
      }

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

      const result = await axios.put("http://localhost:5000/ElectionRoutes/updateElection", {
        electionId,
        electionName,
        startDate: selectedStartDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        startTime: startTime, // Format as HH:MM
        endDate: selectedEndDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        endTime: endTime // Format as HH:MM
      });

      if (result.data.message === "Election updated successfully") {
        toast.success("Update Success");
        setTimeout(() => {
          navigate("/manageElection");
        }, 1000);
      } else {
        toast.error("Election not found");
      }
    } catch (error) {
      toast.error("Election not found");
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
      <div className="w-full h-full flex justify-center items-center ">
        <div className="bg-white rounded shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Update Election</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
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
                                onChange={(e) => handleTimeChange('start', e.target.value)}
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
                               onChange={(e) => handleTimeChange('end', e.target.value)}
                               required
                           />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update Election</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default UpdateElection;
