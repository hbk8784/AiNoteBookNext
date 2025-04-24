"use client";

import Link from "next/link";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

async function registerHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

   const { data, error } = await supabase.auth.signUp({
    email: email as string,
    password: password as string,
    options: {
      data: {
        name: name as string
      }
    }
  });

  if (error) {
    console.error("Register error:", error.message);
    // TODO: Add error handling UI
  } else {
    console.log("Registered successful",data);
    // TODO: Add redirect to dashboard/home
  }
}

const Register = () => {
  
  return (
    <>
    <Link href="/" className="absolute z-50  left-6 top-6 text-emerald-400 outline-1 py-1 px-2 rounded-sm cursor-pointer hover:bg-emerald-400 hover:text-white hover:outline-0">Go Home</Link>
    <div className="w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-4 relative">
      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-black/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-emerald-500 z-10"
      >
        {/* Title */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-8 text-emerald-400"
        >
          Create Account
        </motion.header>

        {/* Form section */}
        <section>
          <form onSubmit={registerHandler} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiUser className="text-emerald-400" size={18} />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiMail className="text-emerald-400" size={18} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiLock className="text-emerald-400" size={18} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl transition-all duration-300 shadow-lg font-semibold"
            >
              Register Now
            </button>
          </form>
        </section>

        {/* Footer link */}
        <footer className="mt-6 text-center">
          <p className="text-gray-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </footer>
      </motion.main>
    </div>
    </>
    
  );
};

export default Register;
