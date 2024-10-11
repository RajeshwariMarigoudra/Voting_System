import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from './Navbar';
import cookie from 'react-cookies';

const AddVoterForm = () => {
    const [id, setId] = useState('');
    const [voterName, setVoterName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [wardNumber, setWardNumber] = useState('');
    const [pincode, setPincode] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');

    const handleVoterData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/voterInsertRoutes/addVoter", {
                id,
                voterName,
                age,
                gender,
                wardNumber,
                pincode,
                district,
                state
            });
            console.log(response);
            toast.success("Voter Added Successfully", {
                position: "top-center",
                autoClose: 2000
            });
            // Reset form fields
            setId('');
            setVoterName('');
            setAge('');
            setGender('');
            setWardNumber('');
            setPincode('');
            setDistrict('');
            setState('');
        } catch (error) {
            console.error('Error adding voter:', error);
            toast.error("Error adding voter");
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
            <div className=' w-[50%] mx-auto'>
                <form onSubmit={handleVoterData} >
                    <div>
                        <label htmlFor="">Voter ID</label>
                        <input value={id} onChange={(e) => setId(e.target.value)} className='block px-2 py-2 bg-gray-200 outline-none rounded-md w-full' type="text" placeholder='ID' required />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Voter Name</label>
                        <input value={voterName} onChange={(e) => setVoterName(e.target.value)} className='block px-2 py-2 bg-gray-200 outline-none rounded-md w-full' type="text" placeholder='Name' required />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Age</label>
                        <input value={age} onChange={(e) => setAge(e.target.value)} className='block px-2 py-2 bg-gray-200 outline-none rounded-md w-full' type="Number" placeholder='Age' required />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Gender</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className='block w-full px-2 py-2 bg-gray-200' name="" id="" required>
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Ward Number</label>
                        <input value={wardNumber} onChange={(e) => setWardNumber(e.target.value)} className='block px-2 py-2 bg-gray-200 outline-none rounded-md w-full' type="number" placeholder='Ward Number' required />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">Pincode</label>
                        <input value={pincode} onChange={(e) => setPincode(e.target.value)} className='block px-2 py-2 bg-gray-200 outline-none rounded-md w-full' type="text" placeholder='Pincode' required />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">District</label>
                        <input value={district} onChange={(e) => setDistrict(e.target.value)} className='block px-2 py-2 bg-gray-200 outline-none rounded-md w-full' type="text" placeholder='City' required />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="">State</label>
                        <input value={state} onChange={(e) => setState(e.target.value)} className='block px-2 py-2 bg-gray-200 outline-none rounded-md w-full' type="text" placeholder='State' required />
                    </div>
                    <button type="submit" className='rounded-md border bg-blue-500 px-3 py-1 cursor-pointer w-full mt-3 text-white font-bold '>Add Voter</button>
                </form>
            </div>
        </>
    )
}

export default AddVoterForm;
