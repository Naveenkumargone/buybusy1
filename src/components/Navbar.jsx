import React from 'react';
import home from '../assets/home.png';
import lock from '../assets/lock.png';

export default function Navbar() {
    return (
        <nav className='m-auto p-7 shadow-md'>
            <div className='mx-16 flex justify-between w-100'>
                <div className="">
                    <a href="/" className='text-xl'>Busy Buy</a>
                </div>
                <div className='w-1/6 flex align-baseline justify-between text-xl text-blue-700 font-semibold'>
                    <a href="/home" className='flex items-center'>
                        <img src={home} className='w-10 h-10 object-cover home' alt="" />
                        <h1>Home</h1>
                    </a>
                    <a href="/signin" className='flex items-center'>
                        <img src={lock} className='w-10 h-10 object-cover' alt="" />
                        <h1>SignIn</h1>
                    </a>
                </div>
            </div>
        </nav>
    )
}

