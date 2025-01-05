"use client"

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import SearchInput from "./../components/searchInput";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

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
              <SearchInput
                  id="search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  label="Search"
                  type="text"
              />
              <div className="flex items-center space-x-4 px-2">
                <button className="text-xl p-1">🔔</button>
                <button className="text-xl p-1">👤</button>
              </div>
            </div>
        </nav>
    </header>
  );
};

export default Header;
