import { motion } from 'framer-motion';
import { useState } from 'react';
import type { MoodEntry } from '../types';
import { handleNaturalLanguageQuery } from '../services/ai';
import { Send, Loader2 } from 'lucide-react';

interface QueryInterfaceProps {
  entries: MoodEntry[];
}

export default function QueryInterface({ entries }: QueryInterfaceProps) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    try {
      const result = await handleNaturalLanguageQuery(query, { entries });
      setResponse(result);
    } catch (error) {
      setResponse('Sorry, I encountered an error processing your question.');
    } finally {
      setLoading(false);
    }
  };

  const suggestedQuestions = [
    "How has my mood changed over time?",
    "What patterns do you notice?",
    "What can I do to improve my emotional well-being?",
    "When am I most energetic?",
  ];

  return (
    <div className="glass-strong rounded-3xl p-8">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Ask About Your Journey
      </h2>

      {/* Response area */}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <span className="text-sm">🤖</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-200 flex-1">
              {response}
            </p>
          </div>
        </motion.div>
      )}

      {/* Query input */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything about your emotional patterns..."
            className="flex-1 glass-strong rounded-2xl px-6 py-4 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="glass-strong hover:bg-white/10 px-6 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {/* Suggested questions */}
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setQuery(question)}
            className="glass hover:glass-strong px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105"
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
