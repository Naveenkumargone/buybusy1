import React from 'react';
import home from '../assets/home.png';
import lock from '../assets/lock.png';
import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className='m-auto p-7 z-10 shadow-md w-full overflow-hidden'>
            <div className='mx-16 flex justify-between w-100'>
                <div className="">
                    <Link to="/" className='text-xl'>Busy Buy</Link>
                </div>
                <div className='w-1/6 flex align-baseline justify-between text-xl text-blue-700 font-semibold'>
                    <Link to="/" className='flex items-center'>
                        <img src={home} className='w-10 h-10 object-cover home' alt="" />
                        <h1>Home</h1>
                    </Link>
                    <Link to="/signin" className='flex items-center'>
                        <img src={lock} className='w-10 h-10 object-cover' alt="" />
                        <h1>SignIn</h1>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

