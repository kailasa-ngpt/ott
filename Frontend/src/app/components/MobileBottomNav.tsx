"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Search, ListVideo, Menu } from "lucide-react";

interface MobileBottomNavProps {
  toggleSidebar: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 md:hidden">
      <div className="flex justify-around items-center h-14">
        <button
          onClick={toggleSidebar}
          className="flex flex-col items-center justify-center w-1/4 py-2 active:scale-95 transition-transform duration-150"
        >
          <Menu 
            size={20}
            className={isActive("/menu") ? "text-[#ff9901]" : "text-gray-600"}
          />
          <span className={`text-xs mt-1 ${isActive("/menu") ? "text-[#ff9901] font-medium" : "text-gray-500"}`}>Menu</span>
          {isActive("/menu") && <div className="h-1 w-6 mt-1 rounded-full bg-gradient-to-r from-[#ff9901] to-[#ff7801]"></div>}
        </button>

        <button
          onClick={() => navigateTo("/home")}
          className="flex flex-col items-center justify-center w-1/4 py-2 active:scale-95 transition-transform duration-150"
        >
          <Home 
            size={20} 
            className={isActive("/home") ? "text-[#ff9901]" : "text-gray-600"}
          />
          <span className={`text-xs mt-1 ${isActive("/home") ? "text-[#ff9901] font-medium" : "text-gray-500"}`}>Home</span>
          {isActive("/home") && <div className="h-1 w-6 mt-1 rounded-full bg-gradient-to-r from-[#ff9901] to-[#ff7801]"></div>}
        </button>

        <button
          onClick={() => navigateTo("/playlists")}
          className="flex flex-col items-center justify-center w-1/4 py-2 active:scale-95 transition-transform duration-150"
        >
          <ListVideo 
            size={20} 
            className={isActive("/playlists") ? "text-[#ff9901]" : "text-gray-600"}
          />
          <span className={`text-xs mt-1 ${isActive("/playlists") ? "text-[#ff9901] font-medium" : "text-gray-500"}`}>Playlists</span>
          {isActive("/playlists") && <div className="h-1 w-6 mt-1 rounded-full bg-gradient-to-r from-[#ff9901] to-[#ff7801]"></div>}
        </button>

        <button
          onClick={() => navigateTo("/search")}
          className="flex flex-col items-center justify-center w-1/4 py-2 active:scale-95 transition-transform duration-150"
        >
          <Search 
            size={20} 
            className={isActive("/search") ? "text-[#ff9901]" : "text-gray-600"}
          />
          <span className={`text-xs mt-1 ${isActive("/search") ? "text-[#ff9901] font-medium" : "text-gray-500"}`}>Search</span>
          {isActive("/search") && <div className="h-1 w-6 mt-1 rounded-full bg-gradient-to-r from-[#ff9901] to-[#ff7801]"></div>}
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;