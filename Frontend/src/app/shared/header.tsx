"use client"

import React, { useState, useEffect, FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { z } from 'zod'; 
import { searchSchema } from '../../services/validationSchemas';
import SearchInput from "./../components/searchInput";
import { initiateLogin, logout, getSession } from '../utils/api';
import { Menu, Search, Home, Compass, Radio, LogIn, LogOut, Moon, Sun } from 'lucide-react';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  const isActive = (path: string) => pathname === path;

  // Mobile sidebar component
  const MobileSidebar = () => (
    <div 
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#ffcd99] to-white transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Logo */}
      <div className="flex justify-center p-4 border-b border-gray-200">
        <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
      </div>
      
      {/* Sign In/Out Button */}
      <div className="p-4 border-b border-gray-200">
        {isLoggedIn ? (
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 rounded-md bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-semibold"
          >
            <LogOut className="mr-2" size={18} />
            Sign Out
          </button>
        ) : (
          <button 
            onClick={handleLogin}
            className="flex items-center w-full px-4 py-2 rounded-md bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-semibold"
          >
            <LogIn className="mr-2" size={18} />
            Sign In
          </button>
        )}
      </div>
      
      {/* Navigation Links */}
      <div className="p-2">
        <nav>
          <ul>
            <li>
              <a 
                href="/home" 
                className={`flex items-center p-3 rounded-lg mb-1 ${
                  isActive("/home") ? "bg-[#ff9901] text-white" : "text-gray-700 hover:bg-[#ffe4c4]"
                }`}
              >
                <Home className="mr-3" size={20} />
                Home
              </a>
            </li>
            <li>
              <a 
                href="/playlists" 
                className={`flex items-center p-3 rounded-lg mb-1 ${
                  isActive("/playlists") ? "bg-[#ff9901] text-white" : "text-gray-700 hover:bg-[#ffe4c4]"
                }`}
              >
                <Radio className="mr-3" size={20} />
                Playlists
              </a>
            </li>
            <li>
              <a 
                href="/search" 
                className={`flex items-center p-3 rounded-lg mb-1 ${
                  isActive("/search") ? "bg-[#ff9901] text-white" : "text-gray-700 hover:bg-[#ffe4c4]"
                }`}
              >
                <Search className="mr-3" size={20} />
                Search
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

  // Mobile overlay when sidebar is open
  const MobileOverlay = () => (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setSidebarOpen(false)}
    />
  );

  return (
    <>
      {/* Mobile Components */}
      {isMobile && <MobileSidebar />}
      {isMobile && <MobileOverlay />}
      
      {/* Header */}
      <header className="gradient-header font-sans shadow-sm">
        {isMobile ? (
          /* Mobile Header */
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-1 text-gray-700"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex-shrink-0">
              <a href="/home">
                <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
              </a>
            </div>
            
            <form onSubmit={handleSearch} className="flex-grow mx-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className="w-full py-1.5 px-3 pl-8 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#ff9901]"
                />
                <Search className="absolute left-2 top-1.5 text-gray-400" size={16} />
              </div>
            </form>
            
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="p-1.5 rounded-full bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white"
                aria-label="Sign out"
              >
                <LogOut size={18} />
              </button>
            ) : (
              <button 
                onClick={handleLogin}
                className="p-1.5 rounded-full bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white"
                aria-label="Sign in"
              >
                <LogIn size={18} />
              </button>
            )}
          </div>
        ) : (
          /* Desktop Header */
          <nav className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 w-16">
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
                <a href="/live" className={`font-semibold text-black ${
                  isActive("/live") ? "underline underline-offset-4 decoration-4 decoration-orange-500" : ""
                }`}>
                  Live
                </a>
                <a href="/playlists" className={`font-semibold text-black ${
                  isActive("/playlists") ? "underline underline-offset-4 decoration-4 decoration-orange-500" : ""
                }`}>
                  Playlists
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

            <div className="flex items-center space-x-6">
              <button className="text-xl p-1 text-black">🔔</button>
              <button className="text-xl p-1 text-black">👤</button>
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md border-0 bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-semibold"
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="px-4 py-2 rounded-md border-0 bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-semibold"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;