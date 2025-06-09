
import React, { useState } from 'react';
import { Dumbbell, Plus, Clock, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      date: '2024-06-09',
      exercises: [
        { name: 'Bench Press', sets: 3, reps: 12, weight: 80 },
        { name: 'Squats', sets: 4, reps: 10, weight: 100 }
      ],
      notes: 'Great session, felt strong today!',
      duration: 45
    }
  ]);

  const [currentWorkout, setCurrentWorkout] = useState({
    exercises: [],
    notes: '',
    duration: ''
  });

  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: ''
  });

  const addExercise = () => {
    if (newExercise.name && newExercise.sets && newExercise.reps) {
      const exercise = {
        name: newExercise.name,
        sets: parseInt(newExercise.sets),
        reps: parseInt(newExercise.reps),
        weight: newExercise.weight ? parseInt(newExercise.weight) : 0
      };
      setCurrentWorkout({
        ...currentWorkout,
        exercises: [...currentWorkout.exercises, exercise]
      });
      setNewExercise({ name: '', sets: '', reps: '', weight: '' });
    }
  };

  const saveWorkout = () => {
    if (currentWorkout.exercises.length > 0) {
      const workout = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        exercises: currentWorkout.exercises,
        notes: currentWorkout.notes,
        duration: parseInt(currentWorkout.duration) || 0
      };
      setWorkouts([workout, ...workouts]);
      setCurrentWorkout({ exercises: [], notes: '', duration: '' });
    }
  };

  const removeExercise = (index: number) => {
    const updatedExercises = currentWorkout.exercises.filter((_, i) => i !== index);
    setCurrentWorkout({ ...currentWorkout, exercises: updatedExercises });
  };

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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exercise-name">Exercise</Label>
                <Input
                  id="exercise-name"
                  placeholder="e.g., Push-ups"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sets">Sets</Label>
                <Input
                  id="sets"
                  type="number"
                  placeholder="3"
                  value={newExercise.sets}
                  onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reps">Reps</Label>
                <Input
                  id="reps"
                  type="number"
                  placeholder="12"
                  value={newExercise.reps}
                  onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="50"
                  value={newExercise.weight}
                  onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addExercise} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Current Exercises */}
          {currentWorkout.exercises.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Today's Exercises</h3>
              <div className="space-y-2">
                {currentWorkout.exercises.map((exercise, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {exercise.sets} sets × {exercise.reps} reps
                        {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
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
              workouts.map(workout => (
                <div key={workout.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{new Date(workout.date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {workout.duration} min
                    </div>
                  </div>
                  <div className="space-y-2">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{exercise.name}</span>
                        <Badge variant="secondary">
                          {exercise.sets}×{exercise.reps}
                          {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  {workout.notes && (
                    <p className="text-sm text-muted-foreground italic">{workout.notes}</p>
                  )}
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
