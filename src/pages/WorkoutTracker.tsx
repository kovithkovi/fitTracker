import React, { useEffect, useState } from "react";
import { Dumbbell, Plus, Clock, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { addWorkout, getWorkoutsByDate } from "@/service/workoutService";
interface Set {
  reps: number;
  weight: number;
}

interface Exercise {
  name: string;
  sets: Set[];
}

interface Workout {
  id: number;
  date: string;
  exercises: Exercise[];
  notes: string;
  duration: number;
}

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const [currentWorkout, setCurrentWorkout] = useState({
    exercises: [] as Exercise[],
    notes: "",
    duration: "",
  });

  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: [{ reps: "", weight: "" }],
  });

  const addSet = () => {
    setNewExercise({
      ...newExercise,
      sets: [...newExercise.sets, { reps: "", weight: "" }],
    });
  };

  const removeSet = (setIndex: number) => {
    if (newExercise.sets.length > 1) {
      const updatedSets = newExercise.sets.filter((_, index) => index !== setIndex);
      setNewExercise({ ...newExercise, sets: updatedSets });
    }
  };

  const updateSet = (setIndex: number, field: "reps" | "weight", value: string) => {
    const updatedSets = newExercise.sets.map((set, index) => (index === setIndex ? { ...set, [field]: value } : set));
    setNewExercise({ ...newExercise, sets: updatedSets });
  };

  const addExercise = () => {
    if (newExercise.name && newExercise.sets.every((set) => set.reps && set.weight)) {
      const exercise: Exercise = {
        name: newExercise.name,
        sets: newExercise.sets.map((set) => ({
          reps: parseInt(set.reps),
          weight: parseInt(set.weight),
        })),
      };
      setCurrentWorkout({
        ...currentWorkout,
        exercises: [...currentWorkout.exercises, exercise],
      });
      setNewExercise({ name: "", sets: [{ reps: "", weight: "" }] });
    }
  };

  const saveWorkout = async () => {
    if (currentWorkout.exercises.length > 0) {
      const workout: Workout = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        exercises: currentWorkout.exercises,
        notes: currentWorkout.notes,
        duration: parseInt(currentWorkout.duration) || 0,
      };
      setWorkouts([workout, ...workouts]);
      console.log(workout);
      await addWorkout(workout);
      setCurrentWorkout({ exercises: [], notes: "", duration: "" });
    }
  };

  const removeExercise = (index: number) => {
    const updatedExercises = currentWorkout.exercises.filter((_, i) => i !== index);
    setCurrentWorkout({ ...currentWorkout, exercises: updatedExercises });
  };

  const getTotalSets = (exercise: Exercise) => exercise.sets.length;
  const getTotalReps = (exercise: Exercise) => exercise.sets.reduce((total, set) => total + set.reps, 0);

  useEffect(() => {
    const getWorkOuts = async () => {
      const today = new Date().toISOString().split("T")[0];
      const response = await getWorkoutsByDate(today);
      setWorkouts(response);
    };
    getWorkOuts();
  });
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Workout Tracker
        </h1>
        <p className="text-muted-foreground">Track your exercises and build strength</p>
      </div>

      {/* Current Workout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            Current Workout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Exercise */}
          <div className="space-y-4">
            <h3 className="font-semibold">Add Exercise</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exercise-name">Exercise Name</Label>
                <Input
                  id="exercise-name"
                  placeholder="e.g., Push-ups"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Sets</Label>
                  <Button onClick={addSet} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Set
                  </Button>
                </div>

                {newExercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                    <span className="text-sm font-medium min-w-[60px]">Set {setIndex + 1}:</span>
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="Reps"
                        value={set.reps}
                        onChange={(e) => updateSet(setIndex, "reps", e.target.value)}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">reps @</span>
                      <Input
                        type="number"
                        placeholder="Weight"
                        value={set.weight}
                        onChange={(e) => updateSet(setIndex, "weight", e.target.value)}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">kg</span>
                    </div>
                    {newExercise.sets.length > 1 && (
                      <Button
                        onClick={() => removeSet(setIndex)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button onClick={addExercise} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>
            </div>
          </div>

          {/* Current Exercises */}
          {currentWorkout.exercises.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Today's Exercises</h3>
              <div className="space-y-4">
                {currentWorkout.exercises.map((exercise, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-lg">{exercise.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {getTotalSets(exercise)} sets • {getTotalReps(exercise)} total reps
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExercise(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {exercise.sets.map((set, setIndex) => (
                        <div
                          key={setIndex}
                          className="flex items-center justify-between p-2 bg-background rounded text-sm"
                        >
                          <span className="font-medium">Set {setIndex + 1}</span>
                          <span>
                            {set.reps} reps @ {set.weight}kg
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workout Notes and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="45"
                value={currentWorkout.duration}
                onChange={(e) => setCurrentWorkout({ ...currentWorkout, duration: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="How did the workout feel?"
                value={currentWorkout.notes}
                onChange={(e) => setCurrentWorkout({ ...currentWorkout, notes: e.target.value })}
              />
            </div>
          </div>

          {currentWorkout.exercises.length > 0 && (
            <Button onClick={saveWorkout} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Workout
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Workout History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workouts.length === 0 ? (
              <p className="text-muted-foreground">No workouts logged yet</p>
            ) : (
              workouts.map((workout) => (
                <div key={workout.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{new Date(workout.date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {workout.duration} min
                    </div>
                  </div>

                  <div className="space-y-3">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{exercise.name}</span>
                          <Badge variant="secondary">
                            {getTotalSets(exercise)} sets • {getTotalReps(exercise)} reps
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 text-xs">
                          {exercise.sets.map((set, setIndex) => (
                            <div key={setIndex} className="bg-muted/50 px-2 py-1 rounded text-center">
                              {set.reps}×{set.weight}kg
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {workout.notes && <p className="text-sm text-muted-foreground italic">{workout.notes}</p>}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutTracker;
