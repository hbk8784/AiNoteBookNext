"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const WelcomePage = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-4">
      <div className="text-center max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 text-emerald-400"
        >
          Welcome to AI Notes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mb-8"
        >
          Organize your thoughts effortlessly with the power of artificial
          intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center"
        >
          <button
            onClick={() => router.push("/register")}
            className="px-6 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg transition"
          >
            Register
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 rounded-2xl border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black font-semibold transition"
          >
            Login
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default WelcomePage;
