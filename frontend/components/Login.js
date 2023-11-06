"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  // State for background image loading
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    // Preload background image
    const img = new window.Image();
    img.src = 'https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80';
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div className="flex min-h-screen text-white">
      <div
        className={`lg:flex w-1/2 hidden items-center relative ${bgLoaded ? '' : 'animate-pulse bg-gray-400'}`}
        style={{
          backgroundImage: bgLoaded ? "url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')" : undefined,
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
        <div className="z-10 w-full px-24">
          <h1 className="text-5xl font-bold tracking-wide text-left">Keep it special</h1>
          <p className="my-4 text-3xl">Capture your personal memory in unique way, anywhere.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 space-x-4 text-center">
          {/* Social icons */}
          {/* ...social icons remain unchanged */}
        </div>
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-[#161616]">
        <div
          className={`absolute lg:hidden z-10 inset-0 items-center ${bgLoaded ? '' : 'animate-pulse bg-gray-400'}`}
          style={{
            backgroundImage: bgLoaded ? "url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')" : undefined,
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
        </div>
        <div className="z-20 w-full py-6">
          <h1 className="my-6">
            {/* Logo or SVG */}
            {/* ...logo remains unchanged */}
          </h1>
        </div>
      </div>
    </div>
  );
}
