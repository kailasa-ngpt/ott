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
      <div className="flex justify-around items-center h-14 px-2">
        <button
          onClick={toggleSidebar}
          className={`px-3 py-2 rounded-md transition-all active:scale-95 flex items-center justify-center ${
            isActive("/menu") 
              ? "bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white" 
              : "text-gray-600"
          }`}
        >
          <div className="flex flex-col items-center">
            <Menu size={20} />
            <span className="text-xs mt-1 font-medium">Menu</span>
          </div>
        </button>

        <button
          onClick={() => navigateTo("/home")}
          className={`px-3 py-2 rounded-md transition-all active:scale-95 flex items-center justify-center ${
            isActive("/home") 
              ? "bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white" 
              : "text-gray-600"
          }`}
        >
          <div className="flex flex-col items-center">
            <Home size={20} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </div>
        </button>

        <button
          onClick={() => navigateTo("/playlists")}
          className={`px-3 py-2 rounded-md transition-all active:scale-95 flex items-center justify-center ${
            isActive("/playlists") 
              ? "bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white" 
              : "text-gray-600"
          }`}
        >
          <div className="flex flex-col items-center">
            <ListVideo size={20} />
            <span className="text-xs mt-1 font-medium">Playlists</span>
          </div>
        </button>

        <button
          onClick={() => navigateTo("/search")}
          className={`px-3 py-2 rounded-md transition-all active:scale-95 flex items-center justify-center ${
            isActive("/search") 
              ? "bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white" 
              : "text-gray-600"
          }`}
        >
          <div className="flex flex-col items-center">
            <Search size={20} />
            <span className="text-xs mt-1 font-medium">Search</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;