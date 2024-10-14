import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ManageCandidate from './Components/ManageCandidate';
import ManageElection from './Components/ManageElection';
import AddVoterForm from './Components/AddVoterForm';
import Voters from './Components/Voters';
import CreateElection from './Components/CreateElection';
import UpdateElection from './Components/UpdateElection';
import DeleteElection from './Components/DeleteElection';
import Signin from './Components/Signin';
import GiveVote from './Components/GiveVote';
import AddCandidate from './Components/AddCandidate';
import VoterNavbar from './Components/VoterNavbar';
import VoterHome from './Components/VoterHome';
import Result from './Components/Result';
import Signup from './Components/Signup';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/givevote" element={<GiveVote />} />
        <Route path="/voterhome" element={<VoterHome />} />
        <Route path="/voterNavbar" element={<VoterNavbar />} />
        <Route path="/addCandidate" element={<AddCandidate />} />
        <Route path="/manageVoter" element={<ManageCandidate />}>
          <Route path="addVoter" element={<AddVoterForm />} />
          <Route path="AllVoters" element={<Voters />} />
        </Route>
        <Route path="/manageElection" element={<ManageElection />}>
          <Route path="createElection" element={<CreateElection />} />
          <Route path="updateElection" element={<UpdateElection />} />
          <Route path="deleteElection" element={<DeleteElection />} />
          <Route path="updateElection/:id" element={<UpdateElection />} />
        </Route>
        <Route path="/signout" element={<Signin />} />
      </Routes>
    </div>
  );
};

export default App;
