"use client";
import { FaRegUser } from "react-icons/fa";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-gray-900 px-6 py-4 shadow-md flex items-center justify-between text-emerald-400">
      <div className="text-xl font-semibold">AI NoteBook</div>

      <div className="relative group">
        <div className="w-10 h-10 rounded-full cursor-pointer border-2 border-emerald-400 flex justify-center items-center">
          <FaRegUser />
        </div>

        <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 shadow-lg rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          <button 
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-sm disabled:opacity-50" 
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
