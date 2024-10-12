import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'
import cookie from 'react-cookies'

const ManageCandidate = () => {
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
			<div className="py-5 min-h-[100vh] h-auto">
				<div className="flex items-center justify-center mt-[60px] space-x-3">
					<Link to={"/manageVoter/AllVoters"}>
						<button className='border bg-blue-500 text-white font-semibold px-3 py-1 cursor-pointer rounded-md'>Show Voters</button>
					</Link>
					<Link to={"/manageVoter/addVoter"}><button className='border bg-blue-500 text-white font-semibold px-3 py-1 cursor-pointer rounded-md'>Add Voters</button></Link>
				</div>
				<Outlet />
			</div>
		</>
	)
}

export default ManageCandidate
