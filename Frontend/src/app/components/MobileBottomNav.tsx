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
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-30 md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        <button
          onClick={toggleSidebar}
          className="flex flex-col items-center justify-center w-1/4 py-1 active:scale-95 transition-transform duration-150"
        >
          <div className={`p-1 rounded-full ${isActive("/menu") ? "bg-gradient-to-r from-[#ff9901] to-[#ff7801]" : ""}`}>
            <Menu 
              size={24}
              className={isActive("/menu") ? "text-white" : "text-gray-600"}
            />
          </div>
          <span className="text-xs mt-1 font-medium text-gray-600">Menu</span>
        </button>

        <button
          onClick={() => navigateTo("/home")}
          className="flex flex-col items-center justify-center w-1/4 py-1 active:scale-95 transition-transform duration-150"
        >
          <div className={`p-1 rounded-full ${isActive("/home") ? "bg-gradient-to-r from-[#ff9901] to-[#ff7801]" : ""}`}>
            <Home 
              size={24} 
              className={isActive("/home") ? "text-white" : "text-gray-600"}
            />
          </div>
          <span className="text-xs mt-1 font-medium text-gray-600">Home</span>
        </button>

        <button
          onClick={() => navigateTo("/playlists")}
          className="flex flex-col items-center justify-center w-1/4 py-1 active:scale-95 transition-transform duration-150"
        >
          <div className={`p-1 rounded-full ${isActive("/playlists") ? "bg-gradient-to-r from-[#ff9901] to-[#ff7801]" : ""}`}>
            <ListVideo 
              size={24} 
              className={isActive("/playlists") ? "text-white" : "text-gray-600"}
            />
          </div>
          <span className="text-xs mt-1 font-medium text-gray-600">Playlists</span>
        </button>

        <button
          onClick={() => navigateTo("/search")}
          className="flex flex-col items-center justify-center w-1/4 py-1 active:scale-95 transition-transform duration-150"
        >
          <div className={`p-1 rounded-full ${isActive("/search") ? "bg-gradient-to-r from-[#ff9901] to-[#ff7801]" : ""}`}>
            <Search 
              size={24} 
              className={isActive("/search") ? "text-white" : "text-gray-600"}
            />
          </div>
          <span className="text-xs mt-1 font-medium text-gray-600">Search</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;