import React from 'react'
import { Link } from 'react-router-dom'
import cookie from "react-cookies";

function Navbar() {
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
		<>
			<nav className='bg-blue-500 top-0 fixed w-full flex items-center min-h-[8vh] px-5 justify-between t'>
				<div className="left flex text-white">
					<Link to={"/home"}><div className="logo font-bold text-2xl text-white mt-2">VOTING SYSTEM</div></Link>
					<ul className='flex ml-4 items-center space-x-4 mt-2 no-underlin'>
						<Link to={"/home"}><li className='text-white '>Home</li></Link >
						<Link to={"/ManageElection"}><li className='text-white'>Manage Election</li></Link>
						<Link to={"/ManageVoter"}><li className='text-white'>Manage Voter</li></Link>
						<Link to={"/Result"}><li className='text-white'>Result</li></Link>
					</ul>
				</div>
				<button onClick={handleSignOut} className='text-white'>Sign Out</button>
			</nav>
		</>
	)
}

export default Navbar