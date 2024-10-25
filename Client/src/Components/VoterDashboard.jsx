import React from "react";
import { Link } from "react-router-dom"; 
import "tailwindcss/tailwind.css";
import voterImage from '../../../Screenshots/electionvoter.jpg'; // Adjust path according to your file structure

const VoterDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold text-center">Welcome to the Voter </h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center">
       <a href="https://www.india.gov.in/spotlight/vote-india-vote-proud-be-voter-ready-vote"><img
          src={voterImage} // Use src attribute for images
          alt="Voting"
          className="mb-6 rounded shadow-lg"
        /></a> 
        <h2 className="text-2xl font-semibold mb-4 text-blue-500">Your Voice Matters</h2>
        <p className="text-center mb-6 text-gray-700">
          Participate in the democratic process by voting. Ensure your voice is heard and make a difference in your community.
        </p>
        <Link to="/signin">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
            Sign In to Vote
          </button>
        </Link>
      </main>
      
      <footer className="bg-gray-200 p-4">
        <p className="text-center text-gray-600">
          &copy; 2024 Voter Dashboard. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default VoterDashboard;
