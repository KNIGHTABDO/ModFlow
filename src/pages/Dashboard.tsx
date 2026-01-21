import { motion } from 'framer-motion';
import { useState } from 'react';
import { useMoodEntries } from '../hooks/useMoodEntries';
import EmotionalTimeline from '../components/EmotionalTimeline';
import InsightsPanel from '../components/InsightsPanel';
import QueryInterface from '../components/QueryInterface';
import Header from '../components/Header';
import MoodSelector from '../components/MoodSelector';
import { Plus, Zap } from 'lucide-react';

export default function Dashboard() {
  const { entries, loading } = useMoodEntries();
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 -z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      </div>

      {/* Floating orbs */}
      <motion.div
        className="fixed top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="fixed bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-purple-400/30">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-purple-200">AI-Powered Insights</span>
            </div>
          </motion.div>
          
          <h1 className="text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
              Your Emotional Journey
            </span>
          </h1>
          <p className="text-purple-200 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover patterns, gain insights, and understand your emotional landscape through beautiful visualizations
          </p>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <motion.button
            onClick={() => setShowMoodSelector(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="flex items-center gap-3 relative z-10">
              <Plus className="w-6 h-6" />
              Track Current Mood
            </span>
          </motion.button>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-16">
          {/* Timeline - takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-2"
          >
            <EmotionalTimeline entries={entries} loading={loading} />
          </motion.div>

          {/* Insights panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="xl:col-span-1"
          >
            <InsightsPanel entries={entries} />
          </motion.div>
        </div>

        {/* AI Query Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <QueryInterface entries={entries} />
        </motion.div>
      </main>

      {/* Mood Selector Modal */}
      {showMoodSelector && (
        <MoodSelector onClose={() => setShowMoodSelector(false)} />
      )}
    </div>
  );
}
