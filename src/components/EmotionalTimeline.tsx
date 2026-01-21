import { motion, AnimatePresence } from 'framer-motion';
import type { MoodEntry, MoodType } from '../types';
import { format } from 'date-fns';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface EmotionalTimelineProps {
  entries: MoodEntry[];
  loading: boolean;
}

const moodColors: Record<MoodType, string> = {
  happy: '#FFD700',
  sad: '#95B8D1',
  energetic: '#FF6B6B',
  calm: '#4ECDC4',
  anxious: '#FF8C42',
  content: '#98D8C8',
  excited: '#FF69B4',
  melancholic: '#9B87C7',
};

export default function EmotionalTimeline({ entries, loading }: EmotionalTimelineProps) {
  if (loading) {
    return (
      <div className="glass-strong rounded-3xl p-8 h-96 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="glass-strong rounded-3xl p-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-purple-500/20 flex items-center justify-center">
            <span className="text-4xl">🎵</span>
          </div>
          <h3 className="text-2xl font-semibold mb-2">Start Your Journey</h3>
          <p className="text-slate-400">
            Track your first mood to begin visualizing your emotional patterns
          </p>
        </motion.div>
      </div>
    );
  }

  // Prepare data for chart
  const chartData = entries
    .slice(0, 30)
    .reverse()
    .map(entry => ({
      date: format(entry.timestamp, 'MM/dd'),
      intensity: entry.intensity,
      mood: entry.mood,
    }));

  return (
    <div className="glass-strong rounded-3xl p-8">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Emotional Timeline
      </h2>

      {/* Chart */}
      <div className="mb-8 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" domain={[0, 10]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#fff',
              }}
            />
            <Area
              type="monotone"
              dataKey="intensity"
              stroke="#a855f7"
              fillOpacity={1}
              fill="url(#colorIntensity)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent entries */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Recent Moods
        </h3>
        <AnimatePresence mode="popLayout">
          {entries.slice(0, 5).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="glass hover:glass-strong rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${moodColors[entry.mood]}20` }}
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: moodColors[entry.mood] }}
                />
              </div>
              <div className="flex-1">
                <div className="font-medium capitalize">{entry.mood}</div>
                <div className="text-sm text-slate-400">
                  {format(entry.timestamp, 'MMM dd, yyyy • HH:mm')}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Intensity</div>
                <div className="font-bold text-lg">{entry.intensity}/10</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
