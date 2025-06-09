
import React, { useState } from 'react';
import { Scale, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeightTracker = () => {
  const [weightEntries, setWeightEntries] = useState([
    { date: '2024-06-01', weight: 74.2 },
    { date: '2024-06-03', weight: 73.8 },
    { date: '2024-06-05', weight: 73.5 },
    { date: '2024-06-07', weight: 73.1 },
    { date: '2024-06-09', weight: 72.5 }
  ]);

  const [newWeight, setNewWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState(70);

  const addWeightEntry = () => {
    if (newWeight) {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(newWeight)
      };
      setWeightEntries([...weightEntries, entry]);
      setNewWeight('');
    }
  };

  const currentWeight = weightEntries[weightEntries.length - 1]?.weight || 0;
  const previousWeight = weightEntries[weightEntries.length - 2]?.weight || currentWeight;
  const weightChange = currentWeight - previousWeight;
  const progressToTarget = ((weightEntries[0]?.weight - currentWeight) / (weightEntries[0]?.weight - targetWeight)) * 100;

  const chartData = weightEntries.map(entry => ({
    ...entry,
    displayDate: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Weight Tracker
        </h1>
        <p className="text-muted-foreground">Monitor your weight progress</p>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWeight} kg</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {weightChange > 0 ? (
                <TrendingUp className="h-3 w-3 text-red-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green-500" />
              )}
              {Math.abs(weightChange).toFixed(1)} kg from last entry
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Weight</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{targetWeight} kg</div>
            <p className="text-xs text-muted-foreground">
              {(currentWeight - targetWeight).toFixed(1)} kg to go
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.max(0, progressToTarget).toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              towards goal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add Weight Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Log Weight</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="space-y-2 flex-1">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="72.5"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
              />
            </div>
            <Button onClick={addWeightEntry}>
              Add Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weight Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weight Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="displayDate" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} kg`, 'Weight']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weight History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weightEntries.slice(-5).reverse().map((entry, index) => (
              <div key={entry.date} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div className="font-medium">
                  {new Date(entry.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="font-semibold text-primary">
                  {entry.weight} kg
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightTracker;
