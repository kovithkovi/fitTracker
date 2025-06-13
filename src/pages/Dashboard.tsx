import React, { useEffect, useState } from "react";
import { Calendar, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getFoodByDate } from "@/service/foodService";
import { getWorkoutsByDate } from "@/service/workoutService";
import { getAllWeights } from "@/service/weightService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Mock data - in real app this would come from API
  const navigate = useNavigate();
  const [todayStats, setTodayStats] = useState({
    caloriesConsumed: 0,
    calorieGoal: 2800,
    workoutsCompleted: 0,
    currentWeight: 0,
  });
  const [message, setMessage] = useState("");
  const progressPercentage = (todayStats.caloriesConsumed / todayStats.calorieGoal) * 100;
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const getFood = async (today) => {
      const response = await getFoodByDate(today);
      const totalCalories = response.reduce((sum, meal) => sum + meal.calories, 0);
      setTodayStats((prev) => ({ ...prev, caloriesConsumed: totalCalories }));
    };

    const getWorkout = async (today) => {
      const response = await getWorkoutsByDate(today);
      setTodayStats((prev) => ({ ...prev, workoutsCompleted: response.length }));
    };

    const getWeight = async (today) => {
      const response = await getAllWeights();
      console.log(response.data);
      setTodayStats((prev) => ({ ...prev, currentWeight: response.data[0].weight }));
      if (response.data[0].date == today) {
        setMessage("Today's weight");
      } else {
        setMessage("Yesterday's weight");
      }
    };
    getFood(today);
    getWorkout(today);
    getWeight(today);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="text-muted-foreground">Let's make today amazing</p>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories Today</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.caloriesConsumed}</div>
            <p className="text-xs text-muted-foreground">of {todayStats.calorieGoal} goal</p>
            <Progress value={progressPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workouts</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.workoutsCompleted}</div>
            <p className="text-xs text-muted-foreground">completed today</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.currentWeight}kg</div>
            <p className="text-xs text-muted-foreground">{message}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              className="p-4 text-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200"
              onClick={() => navigate("/food")}
            >
              <div className="text-2xl mb-2">🍎</div>
              <div className="text-sm font-medium">Log Food</div>
            </button>
            <button
              className="p-4 text-center rounded-lg bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-200 border border-green-200"
              onClick={() => navigate("/workouts")}
            >
              <div className="text-2xl mb-2">💪</div>
              <div className="text-sm font-medium">Log Workout</div>
            </button>
            <button
              className="p-4 text-center rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200"
              onClick={() => navigate("/weight")}
            >
              <div className="text-2xl mb-2">⚖️</div>
              <div className="text-sm font-medium">Log Weight</div>
            </button>
            <button
              className="p-4 text-center rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 border border-orange-200"
              onClick={() => navigate("/daily")}
            >
              <div className="text-2xl mb-2">📅</div>
              <div className="text-sm font-medium">Daily View</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
