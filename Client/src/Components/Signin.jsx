import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cookie from "react-cookies";

axios.defaults.withCredentials = true;

function Signin() {
  const [vote, setVoter] = useState(null); // State variable for storing voter details
  const [Voter_ID, setVoterID] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("voter"); // Default role is 'voter'
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if fields are not empty
      if (!Voter_ID || !password) {
        toast.error("Please fill in all the fields");
        return;
      }

      let endpoint;
      if (role === 'admin') {
        endpoint = "http://localhost:5000/auth/signin";
      } else {
        endpoint = "http://localhost:5000/voterAuth/signin";
      }

      const result = await axios.post(endpoint, {
        Voter_ID,
        password,
      });

      if (result.data.message === "Login Success") {
        toast.success("Login Success");
        setTimeout(() => {
          cookie.save("token", result.data.jwttoken);
          // Store Voter_ID in localStorage
          localStorage.setItem("voterID", Voter_ID);
          if (role === "admin") {
            navigateTo("/home");
            setVoter(result.data.voter);
          } else {
            // Assuming "voter" role
            navigateTo("/voterhome");
          }
        }, 1000);
      } else if (
        result.data.message === "User not found" ||
        result.data.message === "Wrong Password"
      ) {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full flex justify-center items-center bg-gray-100 py-5 min-h-[100vh] h-auto ">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="voterID" className="p-2">Voter ID</label>
            <input
              type="text"
              className="form-control p-2"
              id="voterID"
              placeholder="Enter Voter ID"
              name="voterID"
              onChange={(e) => setVoterID(e.target.value)}
              required // Make the field mandatory
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="p-2">Password</label>
            <input
              type="password"
              className="form-control p-2"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required // Make the field mandatory
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="p-2">Role</label>
            <select
              id="role"
              className="form-control p-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required // Make the field mandatory
            >
              <option value="voter">Voter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary p-2 mt-2 bg-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signin;
