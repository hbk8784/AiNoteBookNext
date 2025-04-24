"use client";

import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  async function loginHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email as string,
      password: password as string,
    });

    if (error) {
      console.error("Login error:", error.message);
    } else {
      console.log("Login successful", data);
      router.push('/notes');
    }
  }

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
          Welcome Back
        </motion.header>

        {/* Form section */}
        <section>
          <form onSubmit={loginHandler} className="space-y-6">
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

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-emerald-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl transition-all duration-300 shadow-lg font-semibold"
            >
              Sign In
            </button>
          </form>
        </section>

        {/* Footer link */}
        <footer className="mt-6 text-center">
          <p className="text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </footer>
      </motion.main>
    </div>
    </>
    
  );
};

export default Login;
