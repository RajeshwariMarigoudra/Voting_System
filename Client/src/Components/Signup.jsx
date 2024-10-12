import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cookie from "react-cookies";

axios.defaults.withCredentials = true;

function Signup() {
  const [Voter_ID, setVoterID] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if fields are not empty
      if (!Voter_ID || !password) {
        toast.error("Please fill in all the fields");
        return;
      }
  
      const endpoint = "http://localhost:5000/voterAuth/signup"; // Update with your signup endpoint
  
      const result = await axios.post(endpoint, {
        Voter_ID,
        password,
      });
  
      if (result.data.message === "Voter registered successfully") {
        toast.success("Voter registered successfully");
        // Show a red toast after a successful registration
        setTimeout(() => {
          toast.error("This is a red toast after registration"); // Custom message for red toast
          navigateTo("/signin"); // Redirect to signin after successful registration
        }, 1000);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during registration");
    }
  };
  

  return (
    <>
      <ToastContainer />
        <h3>Register</h3>
      <div className="w-full flex justify-center items-center bg-gray-100 py-5 min-h-[100vh] h-auto ">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="voterID" className="p-2">
              Voter ID
            </label>
            <input
              type="text"
              className="form-control p-2"
              id="voterID"
              placeholder="Enter Voter ID"
              name="voterID"
              onChange={(e) => setVoterID(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="p-2">
              Password
            </label>
            <input
              type="password"
              className="form-control p-2"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary p-2 mt-2 bg-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
