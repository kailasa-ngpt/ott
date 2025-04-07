"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, Home, List, Search, LogIn, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  handleLogin: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isLoggedIn, handleLogin }) => {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle outside click to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const isActive = (path: string) => pathname === path;

  const navigateTo = (path: string) => {
    router.push(path);
    onClose();
  };

  // Click animation class
  const buttonClass = "flex items-center w-full px-4 py-3 rounded-lg transition-all active:scale-95 hover:bg-white hover:bg-opacity-10";
  
  // Active indicator class
  const activeClass = "bg-white bg-opacity-10 font-medium";

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-gradient-to-b from-[#ff9901] to-[#ff7801] text-white shadow-lg`}
      >
        {/* Logo and close button */}
        <div className="flex justify-between items-center p-4 border-b border-white border-opacity-20">
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            <span className="ml-2 font-bold text-lg">NTV</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 active:scale-95 transition-all"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Menu Items */}
        <div className="py-4">
          {/* Sign In / Sign Out */}
          {!isLoggedIn ? (
            <button 
              onClick={handleLogin}
              className={`${buttonClass} mb-4`}
            >
              <LogIn className="mr-3" size={20} />
              <span>Sign In</span>
            </button>
          ) : null}
          
          {/* Home */}
          <button 
            onClick={() => navigateTo("/home")}
            className={`${buttonClass} ${isActive("/home") ? activeClass : ""}`}
          >
            <Home className="mr-3" size={20} />
            <span>Home</span>
          </button>
          
          {/* Playlists */}
          <button 
            onClick={() => navigateTo("/playlists")}
            className={`${buttonClass} ${isActive("/playlists") ? activeClass : ""}`}
          >
            <List className="mr-3" size={20} />
            <span>Playlists</span>
          </button>
          
          {/* Search */}
          <button 
            onClick={() => navigateTo("/search")}
            className={`${buttonClass} ${isActive("/search") ? activeClass : ""}`}
          >
            <Search className="mr-3" size={20} />
            <span>Search</span>
          </button>
        </div>
        
        {/* Bottom section - could add more items here */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white border-opacity-20">
          <div className="text-center text-white text-opacity-80 text-sm">
            © 2024 NTV
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;