"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import apiClient from "@/apiClient";
import { useRouter } from "next/navigation";
import ActivityRecorder from "./ActivityRecorder";
import NavbarDropdown from "./NavbarDropdown";

const Navbar = (props) => {
    // router for redirect
    const router = useRouter();

    // handle navbar functionality
    // on small screens, manage whether navbar is opened or not
    const [navbar, setNavbar] = useState(false);

    
    // THE NEW NAVBAR!
    // The new navbar works like this:
    // - an array holds all the links that the navbar will contain, including sub-links as children.
    // - we map over the array, and if the item has no children, we render a link with various properties within the item in the array
    // - if the item has children, we render a Dropdown component which itself iterates through the children and renders them as links (or another dropdown if there are further children)
    const menuItems = [
        {
            id: 0,
            title: "Home",
            href: "/myarea",
            onClick: () => setNavbar(!navbar)
        },
        {
            id: 1,
            title: "Record",
            href: "#",
            onClick: () => {
                setNavbar(!navbar)
                setIsRecording(!isRecording)
            }
        },
        {
            id: 2,
            title: "Suggestions",
            href: "#",
            onClick: () => setNavbar(!navbar)
        },
        {
            id: 3,
            title: "User",
            href: "#",
            children: [
                {
                    id: 3.0,
                    title: "User settings",
                    href: "/settings",
                    onClick: () => setNavbar(!navbar)
                },
                {
                    id: 3.1,
                    title: "Set goals",
                    href: "#",
                    onClick: () => setNavbar(!navbar)
                },
                {
                    id: 3.2,
                    title: "Sign out",
                    href: "#",
                    onClick: () => {
                        setNavbar(!navbar)
                        logoutHandler()
                    }
                },
            ]
        },
    ]

    // handle drop downs

    
    
    // handle recorder opening and closing when user clicks
    const [isRecording, setIsRecording] = useState(false);
    const closeRecorder = async () => {
        // a function to close the recorder modal when it's open, using the X
        if (isRecording) {
            setIsRecording(false);
        }
        return
    }
    
    const logoutHandler = async () => {
        console.log("test")
        // api call to logout route
        const response = await apiClient.logOut();
        
        // redirect to logged out page
        return router.push("/logged-out");
    };

    return (
        <>
            <nav className="w-full bg-slate-300 top-0 left-0 right-0 z-10">
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

                        <div className="items-center justify-center md:justify-end md:flex">
                            {menuItems.map((item) => {
                                return item.hasOwnProperty("children") ? (
                                    <NavbarDropdown item={item} key={item.id} />
                                ) : (
                                    <Link key={item.id} className="py-2 text-xl text-slate-700 md:px-6 text-center border-b-2 border-slate-400 md:border-b-0 hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500" href={item?.href} onClick={item?.onClick}>{item.title} </Link>
                                )
                            })}
                        </div>


                        {/* <ul className="items-center justify-center md:justify-end md:flex">
                            <li className="py-2 text-xl text-slate-700 md:px-6 text-center border-b-2 border-slate-400 md:border-b-0 hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500">
                                <Link
                                    href="#"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="py-2 text-xl text-slate-700 md:px-6 text-center border-b-2 border-slate-400 md:border-b-0 hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500">
                                <Link
                                    href="#"
                                    onClick={() => {
                                        setNavbar(!navbar)
                                        setIsRecording(!isRecording)    
                                    }}
                                >
                                    Record
                                </Link>
                            </li>
                            <li className="py-2 text-xl text-slate-700 md:px-6 text-center border-b-2 border-slate-400 md:border-b-0 hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500">
                                <Link
                                    href="#"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    Suggestions
                                </Link>
                            </li>
                            <li className="py-2 text-xl text-slate-700 md:px-6 text-center hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500">
                                <Link
                                    href="#"
                                    onClick={() => {
                                        setNavbar(!navbar);
                                        logoutHandler();
                                    }}
                                >
                                    Sign out
                                </Link>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </nav>
            {isRecording && <ActivityRecorder 
                closeRecorder={() => closeRecorder()}
                handleActivityUpdate = {() => props.handleActivityUpdate()}
            />}
        </>
    );
};

export default Navbar;
