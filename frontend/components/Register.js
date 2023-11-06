import React, { useState } from "react";
import apiClient from "@/apiClient";
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  // State variables to track the validity of input fields
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);


  // Asynchronous function that handles the registration form submission. 
  // 'e' is the event object capturing details of the submit event, like which form was submitted and any default behavior.
  const handleRegistration = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload).

    // Resetting errors state before client-side validation
    setErrors({
      email: "",
      password: "",
      username: "",
      global: ""
    });
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setIsUsernameValid(true);

    
      // Client-side validation checks
    // Check if email is provided and valid
      if (!email) {
        setIsEmailValid(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required.",
        }));
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setIsEmailValid(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address.",
        }));
      }

      // Check if password is provided and meets requirements
      if (!password) {
        setIsPasswordValid(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required.",
        }));
     } else if (password.length < 6 || /\s/.test(password)) {
        setIsPasswordValid(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Use at least 6 characters and do not use spaces.",
        }));
    }

   // Check if username is provided
      if (!username) {
        setIsUsernameValid(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Username is required.",
        }));
      }

      if (!email || !username || !password) {
        console.log("Validation failed. Not calling the API.");
        return;
      }


      // Start API call
     
      setIsSubmitting(true);
      

      try {
         // Call to register API endpoint
        const response = await apiClient.register(email, password, username);
        console.log("API Response:", response);
  
        // Check API response status and set appropriate messages or errors
        if (response.status === 200) {
          setSuccessMessage(response.data.message);
          console.log("response.data.message:", response.data.message);
          console.log("Registration successful:", response.data);
          router.push('/login');}
         } catch (error) {
          console.error('Registration error:', error);
      
          
          if (error.response) {
           
            if (error.response.status === 400) {
              setErrors((prevErrors) => ({
                ...prevErrors,
                global: error.response.data.message,
              }));
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                global: 'An unexpected error occurred. Please try again later.',
              }));
            }
          } else if (error.request) {
            // The request was made but no response was received
            setErrors((prevErrors) => ({
              ...prevErrors,
              global: 'No response from server. Please check your network connection.',
            }));
          } else {
            // Something happened in setting up the request that triggered an Error
            setErrors((prevErrors) => ({
              ...prevErrors,
              global: 'An error occurred while setting up the registration request.',
            }));
          };
        } finally {
          setIsSubmitting(false);
        }
      };
    

    // Rendering the registration form
  return (
    <form onSubmit={handleRegistration}>
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-auto p-6 shadow-lg rounded-xl bg-gradient-to-b from-white to-gray-100 w-80">
        <div className="flex items-center mb-6">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold">Create an account</h2>
          </div>
        </div>

        <div className="relative mb-4">
          <label className="block mt-1 text-lg font-bold" htmlFor="email">
            Email:
          </label>
          <input
            className={`w-full p-2 border rounded focus:outline-none ${
              isEmailValid ? "border-blue-500" : "border-red-500"
            }`}
            type="email"
            id="email"
            placeholder="Enter an email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
         
        </div>

        <div className="relative mb-4">
          <label className="block mt-1 text-lg font-bold" htmlFor="username">
            Username:
          </label>
          <input
            className={`w-full p-2 border rounded focus:outline-none ${
              !isUsernameValid ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            id="username"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
           {/* {console.log('errors.username:', errors.username)} */}
           {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>

        <div className="relative mb-4">
          <label className="block mt-1 text-lg font-bold" htmlFor="password">
            Password:
          </label>
          <input
            className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${
              !isPasswordValid ? "border-red-500" : "border-gray-300"
            }`}
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        {errors.global && (
          <p className="mb-4 text-red-500">{errors.global}</p>
        )}

        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
        )}

        <button
          className={`p-2 text-white bg-blue-500 rounded w-full ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>
      </div>
    </div>
  </form>
);
        }