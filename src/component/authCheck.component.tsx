"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

export default function AuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = auth.isAuthenticated();
      const pathname = window.location.pathname;

      // If user is not logged in and trying to access protected routes

      if(pathname.startsWith("/") && !isAuthenticated){
        router.push("/")
      }

      else if (!isAuthenticated && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
        router.push('/login');
      }
       
      // If user is logged in and trying to access auth pages
      else if (isAuthenticated && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        router.push('/notes');
      }
    };

    checkAuth();
    // Add event listener for storage changes
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [router]);

  return null;
} 