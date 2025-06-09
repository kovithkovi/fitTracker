
import React, { useState } from 'react';
import { Moon, Heart, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const SleepMoodTracker = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2024-06-09',
      sleepHours: 7.5,
      sleepQuality: 'Good sleep, felt rested',
      mood: '😊',
      moodNote: 'Productive day at work, feeling positive'
    },
    {
      id: 2,
      date: '2024-06-08',
      sleepHours: 6.5,
      sleepQuality: 'Tossed and turned a bit',
      mood: '😐',
      moodNote: 'Neutral day, nothing special'
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    sleepHours: '',
    sleepQuality: '',
    mood: '😊',
    moodNote: ''
  });

  const moodOptions = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😄', label: 'Excited' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '😰', label: 'Anxious' }
  ];

  const addEntry = () => {
    if (newEntry.sleepHours && newEntry.mood) {
      const entry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        sleepHours: parseFloat(newEntry.sleepHours),
        sleepQuality: newEntry.sleepQuality,
        mood: newEntry.mood,
        moodNote: newEntry.moodNote
      };
      setEntries([entry, ...entries]);
      setNewEntry({ sleepHours: '', sleepQuality: '', mood: '😊', moodNote: '' });
    }
  };

  const averageSleep = entries.reduce((sum, entry) => sum + entry.sleepHours, 0) / entries.length;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Sleep & Mood Tracker
        </h1>
        <p className="text-muted-foreground">Track your rest and emotional well-being</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Sleep</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSleep.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              per night this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Mood</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries[0]?.mood || '😊'}</div>
            <p className="text-xs text-muted-foreground">
              {entries[0]?.moodNote || 'No mood logged today'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Log Sleep & Mood
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sleep Section */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Sleep
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sleep-hours">Hours of Sleep</Label>
                <Input
                  id="sleep-hours"
                  type="number"
                  step="0.5"
                  placeholder="7.5"
                  value={newEntry.sleepHours}
                  onChange={(e) => setNewEntry({ ...newEntry, sleepHours: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sleep-quality">Sleep Quality (optional)</Label>
                <Input
                  id="sleep-quality"
                  placeholder="How was your sleep?"
                  value={newEntry.sleepQuality}
                  onChange={(e) => setNewEntry({ ...newEntry, sleepQuality: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Mood Section */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Mood
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select your mood</Label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {moodOptions.map((option) => (
                    <button
                      key={option.emoji}
                      type="button"
                      className={`p-3 text-2xl rounded-lg border-2 transition-colors ${
                        newEntry.mood === option.emoji
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-primary/50'
                      }`}
                      onClick={() => setNewEntry({ ...newEntry, mood: option.emoji })}
                      title={option.label}
                    >
                      {option.emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mood-note">Mood Note (optional)</Label>
                <Textarea
                  id="mood-note"
                  placeholder="What's on your mind today?"
                  value={newEntry.moodNote}
                  onChange={(e) => setNewEntry({ ...newEntry, moodNote: e.target.value })}
                />
              </div>
            </div>
          </div>

          <Button onClick={addEntry} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Save Entry
          </Button>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.length === 0 ? (
              <p className="text-muted-foreground">No entries logged yet</p>
            ) : (
              entries.map(entry => (
                <div key={entry.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-2xl">{entry.mood}</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Sleep</div>
                      <div className="font-medium">{entry.sleepHours} hours</div>
                      {entry.sleepQuality && (
                        <div className="text-sm text-muted-foreground italic">{entry.sleepQuality}</div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Mood</div>
                      <div className="font-medium">{entry.mood}</div>
                      {entry.moodNote && (
                        <div className="text-sm text-muted-foreground italic">{entry.moodNote}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepMoodTracker;
