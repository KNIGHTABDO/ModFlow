import { motion } from 'framer-motion';
import { LogOut, Settings, User, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-75"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
                MoodFlow
              </span>
              <div className="text-xs text-purple-300 font-medium">Emotional Intelligence</div>
            </div>
          </motion.div>

          {/* User actions */}
          {user && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              {/* User info */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="hidden md:flex items-center gap-3 glass-strong px-5 py-3 rounded-2xl border border-white/10"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full ring-2 ring-purple-400/50"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-white">
                    {user.displayName || 'User'}
                  </div>
                  <div className="text-xs text-purple-300">{user.email}</div>
                </div>
              </motion.div>
              
              {/* Settings button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="glass-strong hover:bg-white/10 p-3 rounded-2xl transition-all duration-200 border border-white/10"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-purple-200" />
              </motion.button>
              
              {/* Sign out button */}
              <motion.button
                onClick={signOut}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="glass-strong hover:bg-red-500/20 p-3 rounded-2xl transition-all duration-200 border border-white/10 group"
                title="Sign out"
              >
                <LogOut className="w-5 h-5 text-purple-200 group-hover:text-red-400 transition-colors" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
