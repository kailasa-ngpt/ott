"use client"

import React, { useState,useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { z } from 'zod'; 
import { searchSchema } from '../../services/validationSchemas';
import SearchInput from "./../components/searchInput";
import { initiateLogin, logout, getSession } from '../utils/api';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Initialize as null
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      console.log('Header useEffect: Starting');
      const checkSession = async () => {
          console.log('Header useEffect: Checking session');
          setIsLoading(true);
          try {
            const sessionResponse = await getSession();
            console.log('Header useEffect: Session data:', sessionResponse);

               // Check if sessionResponse is not null or undefined and has a valid session object
               const hasValidSession = sessionResponse && sessionResponse.session !== null && sessionResponse.session !== undefined;
               setIsLoggedIn(hasValidSession);
          } catch (error) {
              console.error('Header useEffect: Error checking session:', error);
              setIsLoggedIn(false); // Handle errors by assuming user is not logged in
          } finally {
              setIsLoading(false);
              console.log('Header useEffect: Session check complete, isLoggedIn:', isLoggedIn);
          }
      };

      checkSession();
      console.log('Header useEffect: Ending');
  }, []);

  const handleLogin = () => {
    console.log('Header: handleLogin called');
    initiateLogin();
  };

  const handleLogout = async () => {
    console.log('Header: handleLogout called');
    try {
      const success = await logout();
      if (success) {
        console.log('Header: Logout successful');
        setIsLoggedIn(false); // Update the isLoggedIn state
      } else {
        console.error('Header: Logout failed');
      }
    } catch (error) {
      console.error('Header: Error during logout:', error);
    } finally {
      // This will always execute after the try/catch block
      console.log('Header: reloading to update state.');
      window.location.reload(); // Refresh the page after logout
    }
  };


  // Handles event when any text is typed/deleted 
  const handleSearchChange = (searchText: string) => {
    setSearchValue(searchText);
  };

  // When the seafrch button is clicked
  const handleSearch = (e) => {
    e.preventDefault();
    try {
    // Validate input using Zod schema
    searchSchema.parse({ query: searchValue });
    setError(null); // Clear any previous errors

    if (searchValue.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      setError(err.errors[0].message); // Show the first validation error
    }
  }
  };

  if (isLoading) {
    console.log('Header: Displaying loading indicator');
    return <div>Loading...</div>; // Display loading indicator while checking session
  }
  
  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-[#150B0B] text-white font-sans">
        <nav className="flex items-center justify-between px-2 py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-16 pl-2">
                <a href="/home">
                  <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
                </a>
              </div>
              <div className="px-2">
                <ul className="flex space-x-6">
                  <li>
                    <a href="/home" className=
                      {`${
                        isActive("/home") ? "underline underline-offset-4 decoration-4 decoration-yellow-500" : ""
                      }`}>
                      HOME
                    </a>
                  </li>
                  <li>
                    <a href="/live" className=
                      {`${
                        isActive("/live") ? "underline underline-offset-4 decoration-4 decoration-yellow-500" : ""
                      }`}>
                      LIVE
                    </a>
                  </li>
                  <li>
                    <a href="/playlists" className=
                      {`${
                        isActive("/playlists") ? "underline underline-offset-4 decoration-4 decoration-yellow-500" : ""
                      }`}>
                      PLAYLISTS
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center flex-grow">
            <form onSubmit = {handleSearch}>
              <SearchInput
                  id="search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  label="Search"
                  type="text"
              />
              <div className="flex items-center space-x-4 px-2">
              <button type="submit" className="text-xl p-1">Search</button>
                <button className="text-xl p-1">🔔</button>
                <button className="text-xl p-1">👤</button>
              </div>
              </form>
            </div>
            {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
        </nav>
    </header>
  );
};

export default Header;
