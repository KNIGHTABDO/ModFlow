import { motion } from 'framer-motion';
import { Music2, Youtube, Apple, Sparkles, Heart, TrendingUp, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

export default function AuthPage() {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithApple();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      </div>

      {/* Animated orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Hero content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50"
              />
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-3xl">
                <Music2 className="w-16 h-16 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
              MoodFlow
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-purple-100 mb-8 leading-relaxed"
          >
            Your emotional journey, beautifully visualized with AI-powered insights
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { icon: Sparkles, text: 'AI Insights', color: 'from-yellow-400 to-orange-400' },
              { icon: Shield, text: 'Privacy First', color: 'from-green-400 to-emerald-400' },
              { icon: Heart, text: 'Emotional Health', color: 'from-pink-400 to-rose-400' },
              { icon: TrendingUp, text: 'Track Progress', color: 'from-blue-400 to-cyan-400' },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="glass-strong rounded-2xl p-4 hover:scale-105 transition-transform duration-300"
              >
                <feature.icon className={`w-8 h-8 mb-2 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} style={{ WebkitTextStroke: '1px transparent' }} />
                <p className="text-sm font-medium text-white">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Auth card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20"></div>
            
            {/* Card */}
            <div className="relative glass-strong rounded-3xl p-10 shadow-2xl backdrop-blur-xl border border-white/20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Get Started
                </h2>
                <p className="text-purple-200 mb-8">
                  Connect your music and unlock emotional insights
                </p>

                {/* Sign in buttons */}
                <div className="space-y-4 mb-8">
                  <motion.button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white hover:bg-gray-50 text-gray-900 rounded-2xl p-5 flex items-center justify-center gap-4 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <Youtube className="w-6 h-6 text-red-600 relative z-10" />
                    <span className="font-semibold text-lg relative z-10">Continue with YouTube</span>
                  </motion.button>

                  <motion.button
                    onClick={handleAppleSignIn}
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-black hover:bg-gray-900 text-white rounded-2xl p-5 flex items-center justify-center gap-4 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gray-700/30 to-gray-600/30"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <Apple className="w-6 h-6 relative z-10" />
                    <span className="font-semibold text-lg relative z-10">Continue with Apple</span>
                  </motion.button>
                </div>

                {/* Privacy note */}
                <div className="glass rounded-xl p-4 border border-white/10">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-purple-200 leading-relaxed">
                      <strong className="text-white">100% Private.</strong> We never store your music data. Only behavioral metadata is analyzed to provide insights.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
