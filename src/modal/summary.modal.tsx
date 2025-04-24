"use client";

import { motion } from "framer-motion";

const Summary = ({setSummeryToggle, content}:{setSummeryToggle: (toggle:boolean)=> void, content: string}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-2xl"
      >
        {/* Modal Header */}
        <div className="mb-4 border-b border-gray-700 pb-3">
          <motion.h4 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-emerald-400"
          >
            Summary
          </motion.h4>
        </div>

        {/* Modal Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-300">
           {content}
          </p>
        </motion.div>

        {/* Modal Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end space-x-3 border-t border-gray-700 pt-4"
        >
         
          <button
            className="rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 transition-colors"
              onClick={()=> setSummeryToggle(false)}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Summary;