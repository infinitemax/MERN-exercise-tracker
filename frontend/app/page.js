"use client"
import Register from "@/components/Register"
import Login from "@/components/Login";
import { useState } from "react"
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Register />
      <Link href="/login">
        Go to Login
      </Link>
    </div>
  )
}
