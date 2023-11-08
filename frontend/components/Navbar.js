"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import apiClient from "@/apiClient";
import { useRouter } from "next/navigation";
import ActivityCard from "./ActivityCard";


const Navbar = () => {
    // router for redirect
    const router = useRouter();

    const [navbar, setNavbar] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
  

    const logoutHandler = async () => {
        // api call to logout route
        const response = await apiClient.logOut()

        console.log(response)
        // redirect to logged out page
        return router.push("/logged-out")

    }


    return (
        <nav className="w-full bg-slate-300 fixed top-0 left-0 right-0 z-10">
            <div className="justify-bewteen px-4 mx-auto lg:max-w-7xl md:items-center md:flex p-2 md:px-8">
                <div className="flex items-center justify-between md:block">
                    {/* LOGO */}
                    <Link href="/myarea">
                    <Image
                                    src="/shoe-logo.png"
                                    width={45}
                                    height={45}
                                    alt="logo"
                                />
                    </Link>
                    {/* HAMBURGER FOR MOBILE */}
                    <div className="md:hidden">
                        {/* button inverts the value of navbar on click */}
                        <button
                            className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400"
                            onClick={() => setNavbar(!navbar)}
                        >
                            {navbar ? (
                                <Image
                                    src="/close-icon.png"
                                    width={30}
                                    height={30}
                                    alt="logo"
                                />
                            ) : (
                                <Image
                                    src="/hamburger.svg"
                                    width={30}
                                    height={30}
                                    alt="logo"
                                />
                            )}
                        </button>
                    </div>
                </div>
                <div
                    className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
                        navbar ? " pb-8 md:p-0 block" : "hidden"
                    }`}
                >
                    <ul className="items-center justify-center md:justify-end md:flex">
                        <li className="py-2 text-xl text-slate-700 md:px-6 text-center border-b-2 border-slate-400 md:border-b-0 hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500">
                            <Link href="#" onClick={() => setNavbar(!navbar)}>
                                Home
                            </Link>
                        </li>
                        <li className="py-2 text-xl text-slate-700 md:px-6 text-center border-b-2 border-slate-400 md:border-b-0 hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500">
                            <Link href="#" onClick={() => setNavbar(!navbar)}>
                                Record
                            </Link>
                        </li>
                        <li className="py-2 text-xl text-slate-700 md:px-6 text-center border-b-2 border-slate-400 md:border-b-0 hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500">
                            <Link href="#" onClick={() => setNavbar(!navbar)}>
                                Suggestions
                            </Link>
                        </li>
                        <li className="py-2 text-xl text-slate-700 md:px-6 text-center hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500">
                            <Link href="#" onClick={() => {
                                setNavbar(!navbar)
                                logoutHandler()
                            }}>
                                Sign out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
