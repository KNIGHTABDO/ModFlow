import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import type { MoodType } from '../types';
import { useMoodEntries } from '../hooks/useMoodEntries';

interface MoodSelectorProps {
  onClose: () => void;
}

const moods: { type: MoodType; emoji: string; color: string; gradient: string }[] = [
  { type: 'happy', emoji: '😊', color: '#FFD700', gradient: 'from-yellow-400 to-orange-400' },
  { type: 'sad', emoji: '😢', color: '#95B8D1', gradient: 'from-blue-400 to-indigo-400' },
  { type: 'energetic', emoji: '⚡', color: '#FF6B6B', gradient: 'from-red-400 to-pink-400' },
  { type: 'calm', emoji: '😌', color: '#4ECDC4', gradient: 'from-teal-400 to-cyan-400' },
  { type: 'anxious', emoji: '😰', color: '#FF8C42', gradient: 'from-orange-400 to-red-400' },
  { type: 'content', emoji: '😊', color: '#98D8C8', gradient: 'from-green-400 to-teal-400' },
  { type: 'excited', emoji: '🤩', color: '#FF69B4', gradient: 'from-pink-400 to-purple-400' },
  { type: 'melancholic', emoji: '🌙', color: '#9B87C7', gradient: 'from-purple-400 to-blue-400' },
];

export default function MoodSelector({ onClose }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [saving, setSaving] = useState(false);
  const { addEntry } = useMoodEntries();

  const handleSave = async () => {
    if (!selectedMood) return;

    setSaving(true);
    try {
      await addEntry({
        mood: selectedMood,
        intensity,
        source: 'manual',
      });
      onClose();
    } catch (error) {
      console.error('Error saving mood:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How are you feeling?
            </h2>
            <button
              onClick={onClose}
              className="glass hover:glass-strong p-2 rounded-xl transition-all duration-200 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mood grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {moods.map((mood) => (
              <motion.button
                key={mood.type}
                onClick={() => setSelectedMood(mood.type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  glass rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-300
                  ${selectedMood === mood.type ? 'ring-2 ring-white/50 glass-strong' : 'hover:glass-strong'}
                `}
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className="font-medium capitalize text-sm">{mood.type}</span>
              </motion.button>
            ))}
          </div>

          {/* Intensity slider */}
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-slate-400">
                  Intensity
                </label>
                <span className="text-2xl font-bold">{intensity}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${moods.find(m => m.type === selectedMood)?.color} 0%, ${moods.find(m => m.type === selectedMood)?.color} ${intensity * 10}%, rgb(51, 65, 85) ${intensity * 10}%, rgb(51, 65, 85) 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Mild</span>
                <span>Intense</span>
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 glass hover:glass-strong rounded-2xl py-4 font-medium transition-all duration-300 hover:scale-[1.02]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedMood || saving}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl py-4 font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {saving ? 'Saving...' : 'Save Mood'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
