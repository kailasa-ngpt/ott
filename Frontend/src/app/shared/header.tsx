"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { z } from 'zod'; 
import { searchSchema } from '../../services/validationSchemas';
import SearchInput from "./../components/searchInput";
import { initiateLogin, logout, getSession } from '../utils/api';
import { Menu } from 'lucide-react';
import MobileBottomNav from "../components/MobileBottomNav";
import Sidebar from "../components/Sidebar";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      try {
        const sessionResponse = await getSession();
        const hasValidSession = sessionResponse && sessionResponse.session !== null && sessionResponse.session !== undefined;
        setIsLoggedIn(hasValidSession);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogin = () => {
    initiateLogin();
  };

  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      window.location.reload();
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      searchSchema.parse({ query: searchValue });
      setError(null);

      if (searchValue.trim()) {
        router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Sidebar component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isLoggedIn={!!isLoggedIn}
        handleLogin={handleLogin}
      />
      
      {/* Header - Only show on desktop */}
      {!isMobile && (
        <header className="gradient-header font-sans shadow-sm">
          <nav className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <a href="/home">
                  <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
                </a>
              </div>
              
              <div className="flex space-x-8">
                <a href="/home" className={`font-semibold text-black ${
                  isActive("/home") ? "underline underline-offset-4 decoration-4 decoration-orange-500" : ""
                }`}>
                  Home
                </a>
                <a href="/playlists" className={`font-semibold text-black ${
                  isActive("/playlists") ? "underline underline-offset-4 decoration-4 decoration-orange-500" : ""
                }`}>
                  Playlists
                </a>
                <a href="/search" className={`font-semibold text-black ${
                  isActive("/search") ? "underline underline-offset-4 decoration-4 decoration-orange-500" : ""
                }`}>
                  Search
                </a>
              </div>
            </div>

            <div className="flex items-center flex-grow mx-8">
              <form onSubmit={handleSearch} className="flex items-center w-full">
                <SearchInput
                  id="search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  label="Search"
                  type="text"
                />
              </form>
            </div>

            {/* <div className="flex items-center">
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md border-0 bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-semibold active:scale-95 transition-transform duration-150"
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="px-4 py-2 rounded-md border-0 bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-semibold active:scale-95 transition-transform duration-150"
                >
                  Login
                </button>
              )}
            </div> */}
          </nav>
        </header>
      )}

      {/* Mobile Bottom Navigation - Only shown on mobile devices */}
      {isMobile && <MobileBottomNav toggleSidebar={toggleSidebar} />}
    </>
  );
};

export default Header;