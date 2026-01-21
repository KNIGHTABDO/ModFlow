import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { MoodEntry } from '../types';
import { useAuth } from '../contexts/AuthContext';

export function useMoodEntries() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'moodEntries'),
      where('userId', '==', user.id),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const moodEntries: MoodEntry[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date(),
        } as MoodEntry;
      });
      setEntries(moodEntries);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addEntry = async (entry: Omit<MoodEntry, 'id' | 'userId' | 'timestamp'>) => {
    if (!user) throw new Error('User not authenticated');

    await addDoc(collection(db, 'moodEntries'), {
      ...entry,
      userId: user.id,
      timestamp: Timestamp.now(),
    });
  };

  return { entries, loading, addEntry };
}
