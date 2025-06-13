import React, { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Apple, Dumbbell, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getFoodByDate } from "@/service/foodService";
import { getWorkoutsByDate } from "@/service/workoutService";

interface Set {
  reps: number;
  weight: number;
}

interface Exercise {
  name: string;
  sets: Set[];
}

const DailyView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-CA");
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const [dayMeals, setDayMeals] = useState([]);
  const [dayWorkouts, setDayWorkOuts] = useState([]);

  const totalCalories = dayMeals.reduce((sum, meal) => sum + meal.calories, 0);

  const getCategoryIcon = (category: string) => {
    const icons = {
      breakfast: "🌅",
      lunch: "☀️",
      dinner: "🌙",
      snack: "🍎",
    };
    return icons[category as keyof typeof icons] || "🍽️";
  };

  const getTotalSets = (exercise: Exercise) => exercise.sets.length;
  const getTotalReps = (exercise: Exercise) => exercise.sets.reduce((total, set) => total + set.reps, 0);

  useEffect(() => {
    if (!selectedDate) return;
    console.log(selectedDate);

    const selectedDateString = formatDate(selectedDate); // example
    console.log(selectedDateString);

    const getfoodByDate = async () => {
      try {
        const response = await getFoodByDate(selectedDateString);
        setDayMeals(response);
      } catch (error) {
        setDayMeals([]);
      }
    };
    const getDayWorkOut = async () => {
      try {
        const response = await getWorkoutsByDate(selectedDateString);
        setDayWorkOuts(response);
      } catch (error) {
        setDayWorkOuts([]);
      }
    };
    getfoodByDate();
    getDayWorkOut();
    console.log(dayMeals);
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Daily View
        </h1>
        <p className="text-muted-foreground">View your food and workout logs by day</p>
      </div>

      {/* Date Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-auto justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              {isToday(selectedDate) && (
                <Badge variant="secondary" className="ml-2">
                  Today
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="gap-6">
        {/* Food Intake */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              Food Intake
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="font-medium">Total Calories</span>
              <span className="text-lg font-bold text-primary">{totalCalories} cal</span>
            </div>

            {dayMeals.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No meals logged for this day</p>
            ) : (
              <div className="space-y-3">
                {dayMeals.map((meal) => (
                  <div key={meal._id} className="flex items-center justify-between p-3 bg-background border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getCategoryIcon(meal.category)}</span>
                      <div>
                        <div className="font-medium">{meal.name}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {meal.category} • {meal.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-primary">{meal.calories} cal</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workouts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Workouts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dayWorkouts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No workouts logged for this day</p>
            ) : (
              dayWorkouts.map((workout) => (
                <div key={workout._id} className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium">Workout Duration</span>
                    <span className="text-lg font-bold text-primary">{workout.duration} min</span>
                  </div>

                  <div className="space-y-3">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="p-3 bg-background border rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{exercise.name}</div>
                          <Badge variant="secondary">
                            {getTotalSets(exercise)} sets • {getTotalReps(exercise)} reps
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-xs">
                          {exercise.sets.map((set, setIndex) => (
                            <div key={setIndex} className="bg-muted/50 px-2 py-1 rounded text-center">
                              Set {setIndex + 1}: {set.reps}×{set.weight}kg
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {workout.notes && (
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="text-sm font-medium mb-1">Notes:</div>
                      <p className="text-sm text-muted-foreground italic">{workout.notes}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyView;
