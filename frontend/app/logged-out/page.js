"use client"
import React from 'react'
import Login from '@/components/Login' // Adjust the path to where your Login component is located.
import apiClient from "@/apiClient";


export default function LoggedOut() {
  return (
    <div className='bg-slate-300 sm:w-[500px] py-8 px-6 rounded-lg mt-36 mx-auto'>
      <h2 className='text-2xl mb-6 text-slate-800'>You have successfully logged out. Bye!</h2>
      <a href="/login">
        <p className='text-blue-700 underline mb-4'>Login again</p>
      </a>
      <a href="/">
        <p className='text-blue-700 underline'>Register</p>
      </a>
    </div>
  )
}
