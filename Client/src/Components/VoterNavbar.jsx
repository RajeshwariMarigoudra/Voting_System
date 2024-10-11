import React from "react";
import cookie from "react-cookies";

function VoterNavbar() {
  const handleSignOut = () => {
    try {
      cookie.remove('token');
      window.location.href = '/signin';
    }
    catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-blue-500"
    >
      <div className="container-fluid">
        <div
          className="logo font-bold text-2xl text-white"
          style={{
            marginRight: "20px",
            cursor: "pointer"
          }}
        >
          VOTING SYSTEM
        </div>
        <div className="d-flex justify-content-flex-start">
          <button
            className="btn btn-outline-light"
            onClick={() => (window.location.href = "/voterhome")}
            style={{
              border: "none",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Voter Dashboard
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => (window.location.href = "/GiveVote")}
            style={{
              border: "none",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Give Vote
          </button>
        </div>
        <div className="ms-auto">
          <button
            className="btn btn-outline-light"
            onClick={() => handleSignOut()}
            style={{
              border: "none",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default VoterNavbar