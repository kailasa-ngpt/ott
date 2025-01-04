"use client"

import React, { useState } from "react";
import Image from "next/image";
import Input from "./../components/input";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <header className="bg-[#220E0E] text-white font-sans">
        <nav className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
              <ul className="flex space-x-6">
                <li><a href="#">HOME</a></li>
                <li><a href="#">LIVE</a></li>
                <li><a href="#">PLAYLISTS</a></li>
              </ul>
            </div>

            <div className="flex items-center space-x-4">
            <Input
                id="search"
                value=""
                onChange={handleSearchChange}
                label="Search"
                placeholder=""
                type="text"
            />
            <button className="text-xl">🔔</button>
            <button className="text-xl">👤</button>
            </div>
        </nav>
    </header>
  );
};

export default Header;
