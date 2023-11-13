import React from 'react'
import Link from 'next/link';
import AltNavbarDropdown from './NavbarDropdown';
import Image from 'next/image';



const menuItems = [
    {
      title: "Home",
      route: "/",
    },
    {
      title: "Products",
      children: [
        {
          title: "Hinkle Horns",
          route: "/products/hinkle-horns",
        },
        {
          title: "Doozers",
          route: "/products/doozers",
        },
        {
          title: "Zizzer-zazzers",
          route: "/products/zizzer-zazzers",
        },
      ],
    },
  ];


const AltNavbar = () => {
  return (
    <header className="flex gap-10 items-center bg-zinc-800 py-4 px-2">
    <Link href="https://designly.biz" target="_blank">
      <Image src="/shoe-logo.png" width={20} height={20} alt="logo" />
    </Link>
    <div className="flex gap-8 items-center text-white">
      {menuItems.map((item) => {
        return item.hasOwnProperty("children") ? (
          <AltNavbarDropdown item={item} />
        ) : (
          <Link className="hover:text-blue-500" href={item?.route || ""}>
            {item.title}
          </Link>
        );
      })}
    </div>
  </header>
  )
}

export default AltNavbar