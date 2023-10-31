"use client";
import React, { useState } from "react";
import apiClient from "@/apiClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Validations checks
      if (!email || !password || !username) {
        setError("Email and password are required.");
        return;
      }

      // Call the register function from the ApiClient
      const response = await apiClient.register(email, username, password);

      // Handle success (will navigate to login page)
      console.log("Registration successful:", response);
    } catch (error) {
      // Handle registration error (display error message to the user)
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex flex-col w-96 mx-auto mt-20">
      <h2 className="mb-4">Register</h2>
      <form className="flex flex-col gap-4" onSubmit={handleRegistration}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
