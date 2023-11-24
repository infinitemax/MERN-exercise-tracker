"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import apiClient from "@/apiClient";
import { useRouter } from "next/navigation";

export default function Login(props) {
  // router for redirect
  const router = useRouter();

  // State for background image loading
  const [bgLoaded, setBgLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Preload background image
    const img = new window.Image();
    img.src =
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    img.onload = () => setBgLoaded(true);
  }, []);


  // reset message after 3 seconds
  useEffect(()=> {
 
    setTimeout(() => {
      setMessage("");
    }, 3000)
  }, [message])

  // login handler function
  const loginHandler = async (e) => {
    // prevent reload
    e.preventDefault();

    try {
      // call apiclient's login method
      const response = await apiClient.login(username, password);

      // redirect to myarea if user logs in
      if (response?.data?.status === 200) {
        return router.push("/myarea");

      // if the login fails, send a pop up message
      } else {
        
        // make message sentence case.
        let alert = response.response.data.message
        alert = alert.split('')[0].toUpperCase() + alert.slice(1)
        await setMessage(alert);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen text-white">
      <div
        className={`lg:flex w-1/2 hidden items-center relative ${
          bgLoaded ? "" : "animate-pulse bg-gray-400"
        }`}
        style={{
          backgroundImage: bgLoaded
            ? "url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            : undefined,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
        <div className="z-10 w-full px-24">
          <h1 className="text-5xl font-bold tracking-wide text-left">
            Exercise Tracking App
          </h1>
          <p className="my-4 text-3xl">
          Discover the ultimate platform for tracking your workouts and unlocking personalized exercise recommendations tailored to your goals. 
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 space-x-4 text-center">
          {/* Social icons */}
          {/* ...social icons remain unchanged */}
        </div>
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-[#161616]">
        <div
          className={`absolute lg:hidden z-10 inset-0 items-center ${
            bgLoaded ? "" : "animate-pulse bg-gray-400"
          }`}
          style={{
            backgroundImage: bgLoaded
              ? "url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')"
              : undefined,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 z-0 bg-black opacity-60"></div>
        </div>
        {/* <div className="z-20 w-full py-6">
          <h1 className="my-6"> */}
        {/* Logo or SVG */}
        {/* ...logo remains unchanged */}
        {/* </h1>
        </div> */}
        <div className="static z-20 w-full py-6">
          <form
            onSubmit={(e) => {
              loginHandler(e);
            }}
          >
            <div className="my-2">
              <label htmlFor="username">Username: </label>
              <input
                className="text-slate-700"
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="my-2">
              <label htmlFor="password">Password: </label>
              <input
                className="text-slate-700"
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button className="px-6 py-1 my-2 bg-green-600 rounded-md">
              Enter
            </button>
          </form>
          {message && <div className="flex justify-center">
            <h3 className="absolute">{message}</h3>
          </div>}
        </div>
      </div>
    </div>
  );
}
