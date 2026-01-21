import { motion } from 'framer-motion';
import { useState } from 'react';
import { useMoodEntries } from '../hooks/useMoodEntries';
import EmotionalTimeline from '../components/EmotionalTimeline';
import InsightsPanel from '../components/InsightsPanel';
import QueryInterface from '../components/QueryInterface';
import Header from '../components/Header';
import MoodSelector from '../components/MoodSelector';

export default function Dashboard() {
  const { entries, loading } = useMoodEntries();
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Your Emotional Journey
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover patterns, gain insights, and understand your emotional landscape through AI-powered analysis
          </p>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <button
            onClick={() => setShowMoodSelector(true)}
            className="glass-strong hover:bg-white/10 px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            + Track Current Mood
          </button>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Timeline - takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <EmotionalTimeline entries={entries} loading={loading} />
          </motion.div>

          {/* Insights panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
