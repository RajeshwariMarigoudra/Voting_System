import React, { useEffect, useState } from "react";
import axios from "axios";
import VoterNavbar from "./VoterNavbar";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import cookie from 'react-cookies';

const VoterHome = () => {
  const [voterID, setVoterID] = useState(localStorage.getItem("voterID") || "");
  const [voterDetails, setVoterDetails] = useState(null);

  useEffect(() => {
    const fetchVoterDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/voterRoutes/${voterID}`
        );
        setVoterDetails(response.data);
      } catch (error) {
        console.error("Error fetching voter details:", error);
      }
    };

    const verifyToken = async () => {
      try {
        const token = cookie.load('token');
        if (!token) {
          window.location.href = '/signin';
        } else {
          await axios.get('http://localhost:5000/auth/middleware', {}, {
            headers: {
              cookie: token,
              withCredentials: true
            }
          });
          fetchVoterDetails();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        cookie.remove('token');
        window.location.href = '/signin';
      }
    };

    verifyToken();

    if (voterID) {
      fetchVoterDetails();
    }
  }, [voterID]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <VoterNavbar />

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl text-blue-500">Welcome {voterID}!</h1>
        </div>

        {voterDetails && (
          <div className="bg-gray-100 p-6 rounded w-full max-w-screen-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-500">
              Voter Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <p className="text-gray-600">ID:</p>
                <p className="font-semibold">{voterDetails.id}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Name:</p>
                <p className="font-semibold">{voterDetails.voterName}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Age:</p>
                <p className="font-semibold">{voterDetails.age}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Gender:</p>
                <p className="font-semibold capitalize">
                  {voterDetails.gender}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Ward Number:</p>
                <p className="font-semibold">{voterDetails.wardNumber}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Pincode:</p>
                <p className="font-semibold">{voterDetails.pincode}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">District:</p>
                <p className="font-semibold">{voterDetails.district}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">State:</p>
                <p className="font-semibold">{voterDetails.state}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterHome;
