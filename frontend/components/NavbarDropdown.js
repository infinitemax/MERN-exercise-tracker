import React, { useState } from "react";
import Link from "next/link";


const NavbarDropdown = (props) => {
    const item = props.item;
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = item?.children ? item.children : [];

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const transClass = isOpen ? "flex" : "hidden";

    return (
        <>
            <div className="relative">
                <button className="py-2 text-xl text-white md:px-6 text-center border-b-2 border-slate-400 md:border-b-0 hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500" onClick={toggle}>
                    {item.title}
                </button>
                <div
                    className={`absolute top-10 right-2 z-30 w-[200px] flex flex-col py-4 bg-white rounded-md ${transClass}`}
                >
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            className="py-2 text-xl text-slate-900 md:px-6 text-left border-b-2 border-slate-400 md:border-b-0 hover:underline hover:decoration-4 hover:underline-offset-[1px] hover:decoration-teal-500"
                            href={item?.href || ""}
                        onClick={toggle && item.onClick}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
            {isOpen ? (
                <div
                    className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-black/40"
                    onClick={toggle}
                ></div>
            ) : (
                <></>
            )}
        </>
    );
};

export default NavbarDropdown;
