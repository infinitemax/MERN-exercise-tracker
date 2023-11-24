"use client"
import React from 'react'
import Login from '@/components/Login' // Adjust the path to where your Login component is located.
import apiClient from "@/apiClient";


export default function LoggedOut() {
  return (
    <div className='bg-gradient-to-b from-white to-[#f2fff9] sm:w-[500px] py-8 px-6 rounded-lg mt-36 mx-auto'>
      <h2 className='mb-6 text-2xl text-slate-800'>You have successfully logged out. Bye!</h2>
      <a href="/login">
        <p className='mb-4 text-blue-700 underline'>Login again</p>
      </a>
      <a href="/">
        <p className='text-blue-700 underline'>Register</p>
      </a>
    </div>
  )
}
