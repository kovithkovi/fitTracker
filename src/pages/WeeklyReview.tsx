
import React from 'react';
import { Calendar, TrendingUp, Target, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const WeeklyReview = () => {
  // Mock data for weekly summary
  const weeklyData = {
    workouts: {
      completed: 4,
      goal: 5,
      totalMinutes: 180,
      favoriteExercise: 'Squats'
    },
    calories: {
      averageConsumed: 1850,
      goal: 2000,
      daysOnTrack: 5,
      totalDeficit: 750
    },
    weight: {
      startWeight: 73.5,
      endWeight: 72.5,
      change: -1.0,
      trend: 'down'
    },
    sleep: {
      averageHours: 7.2,
      goal: 8,
      bestNight: 8.5,
      worstNight: 6.0
    },
    mood: {
      dominant: '😊',
      positive: 5,
      neutral: 2,
      negative: 0
    }
  };

  const workoutProgress = (weeklyData.workouts.completed / weeklyData.workouts.goal) * 100;
  const calorieProgress = (weeklyData.calories.daysOnTrack / 7) * 100;
  const sleepProgress = (weeklyData.sleep.averageHours / weeklyData.sleep.goal) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Weekly Review
        </h1>
        <p className="text-muted-foreground">Your week at a glance</p>
        <div className="text-sm text-muted-foreground">
          June 3 - June 9, 2024
        </div>
      </div>

      {/* Weekly Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workouts</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyData.workouts.completed}/{weeklyData.workouts.goal}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {weeklyData.workouts.totalMinutes} minutes total
            </p>
            <Progress value={workoutProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nutrition</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyData.calories.daysOnTrack}/7</div>
            <p className="text-xs text-muted-foreground mb-2">
              days on track
            </p>
            <Progress value={calorieProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-1">
              {weeklyData.weight.change > 0 ? '+' : ''}{weeklyData.weight.change}kg
            </div>
            <p className="text-xs text-muted-foreground">
              {weeklyData.weight.startWeight}kg → {weeklyData.weight.endWeight}kg
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyData.sleep.averageHours}h</div>
            <p className="text-xs text-muted-foreground mb-2">
              average per night
            </p>
            <Progress value={sleepProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Workout Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Sessions completed</span>
              <span className="font-semibold">{weeklyData.workouts.completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total time</span>
              <span className="font-semibold">{weeklyData.workouts.totalMinutes} minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Favorite exercise</span>
              <Badge variant="secondary">{weeklyData.workouts.favoriteExercise}</Badge>
            </div>
            <div className="pt-2">
              <div className="text-sm text-muted-foreground mb-2">Goal progress</div>
              <Progress value={workoutProgress} className="h-3" />
              <div className="text-xs text-muted-foreground mt-1">
                {workoutProgress.toFixed(0)}% of weekly goal
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Nutrition Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Average calories</span>
              <span className="font-semibold">{weeklyData.calories.averageConsumed}/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Days on track</span>
              <span className="font-semibold">{weeklyData.calories.daysOnTrack}/7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total deficit</span>
              <Badge variant="outline" className="text-green-600">-{weeklyData.calories.totalDeficit} cal</Badge>
            </div>
            <div className="pt-2">
              <div className="text-sm text-muted-foreground mb-2">Consistency</div>
              <Progress value={calorieProgress} className="h-3" />
              <div className="text-xs text-muted-foreground mt-1">
                {calorieProgress.toFixed(0)}% of days on target
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sleep & Mood Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Sleep & Mood
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Average sleep</span>
              <span className="font-semibold">{weeklyData.sleep.averageHours} hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Best night</span>
              <span className="font-semibold">{weeklyData.sleep.bestNight}h</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Dominant mood</span>
              <span className="text-2xl">{weeklyData.mood.dominant}</span>
            </div>
            <div className="pt-2">
              <div className="text-sm text-muted-foreground mb-2">Sleep goal progress</div>
              <Progress value={sleepProgress} className="h-3" />
              <div className="text-xs text-muted-foreground mt-1">
                {sleepProgress.toFixed(0)}% of sleep goal
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Week's Wins
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
              <span className="text-lg">🎯</span>
              <span className="text-sm">Hit calorie goal 5 days this week</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-lg">💪</span>
              <span className="text-sm">Completed 4 workout sessions</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-lg">📉</span>
              <span className="text-sm">Lost 1kg this week</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-lg">😊</span>
              <span className="text-sm">Maintained positive mood most days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Quote */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="text-lg font-semibold">
              "Progress, not perfection."
            </div>
            <div className="text-sm text-muted-foreground">
              You're building healthy habits that will last a lifetime. Keep going! 🌟
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyReview;
