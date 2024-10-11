import React, { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar"; // Assuming Navbar is in the same directory
import cookie from "react-cookies";

function DeleteElection() {
  const [electionId, setElectionId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:3000/ElectionRoutes/deleteElection/${electionId}`
      );

      if (response.data.message === "Election deleted successfully") {
        toast.success("Election deleted successfully!");
        console.log("Election deleted successfully!");

        // Redirect or update the UI as needed
      } else {
        toast.error(response.data.message || "An error occurred while deleting the election.");
      }
    } catch (error) {
      console.error("Error deleting election:", error);
      toast.error("An error occurred while deleting the election.");
    }
  };
  useEffect(() => {
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
      <ToastContainer />
      <div className="w-full h-full flex justify-center items-center ">
        <div className="bg-white rounded shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Delete Election</h2>
          <form onSubmit={handleDelete} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="electionId" className="font-semibold mb-1">
                Election ID
              </label>
              <input
                type="text"
                id="electionId"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                value={electionId}
                onChange={(e) => setElectionId(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Delete Election
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default DeleteElection;