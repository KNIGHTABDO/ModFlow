import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { MoodEntry } from '../types';
import { analyzeEmotionalPatterns, type MoodAnalysis } from '../services/ai';
import { Sparkles, TrendingUp, Brain } from 'lucide-react';

interface InsightsPanelProps {
  entries: MoodEntry[];
}

export default function InsightsPanel({ entries }: InsightsPanelProps) {
  const [analysis, setAnalysis] = useState<MoodAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entries.length >= 5) {
      analyzeEntries();
    }
  }, [entries]);

  const analyzeEntries = async () => {
    setLoading(true);
    try {
      const result = await analyzeEmotionalPatterns(entries.slice(0, 20));
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (entries.length < 5) {
    return (
      <div className="glass-strong rounded-3xl p-8 text-center">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400" />
        <h3 className="text-lg font-semibold mb-2">Gathering Insights</h3>
        <p className="text-sm text-slate-400">
          Track {5 - entries.length} more mood{5 - entries.length !== 1 ? 's' : ''} to unlock AI-powered insights
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="glass-strong rounded-3xl p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-3xl p-8 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-6 h-6 text-purple-400" />
        <h2 className="text-xl font-bold">AI Insights</h2>
      </div>

      {/* Dominant Mood */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-slate-400">Dominant Pattern</span>
            </div>
            <p className="text-lg font-semibold capitalize">{analysis.dominantMood}</p>
          </div>

          {/* Summary */}
          <div className="glass rounded-2xl p-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              {analysis.summary}
            </p>
          </div>

          {/* Trends */}
          {analysis.trends.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-semibold text-slate-400">Recent Trends</span>
              {analysis.trends.map((trend, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-3 text-sm"
                >
                  {trend}
                </motion.div>
              ))}
            </div>
          )}

          {/* Insights */}
          {analysis.insights.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-semibold text-slate-400">Key Insights</span>
              {analysis.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{insight.pattern}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                      {Math.round(insight.confidence * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{insight.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
