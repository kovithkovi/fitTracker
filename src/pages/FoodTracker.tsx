
import React, { useState } from 'react';
import { Plus, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const FoodTracker = () => {
  const [meals, setMeals] = useState([
    { id: 1, name: 'Greek Yogurt with Berries', calories: 220, category: 'breakfast', time: '08:30' },
    { id: 2, name: 'Grilled Chicken Salad', calories: 350, category: 'lunch', time: '12:45' },
    { id: 3, name: 'Apple', calories: 80, category: 'snack', time: '15:20' }
  ]);

  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    category: 'breakfast'
  });

  const calorieGoal = 2000;
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const progressPercentage = (totalCalories / calorieGoal) * 100;

  const addMeal = () => {
    if (newMeal.name && newMeal.calories) {
      const meal = {
        id: Date.now(),
        name: newMeal.name,
        calories: parseInt(newMeal.calories),
        category: newMeal.category,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      };
      setMeals([...meals, meal]);
      setNewMeal({ name: '', calories: '', category: 'breakfast' });
    }
  };

  const getMealsByCategory = (category: string) => {
    return meals.filter(meal => meal.category === category);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      breakfast: '🌅',
      lunch: '☀️',
      dinner: '🌙',
      snack: '🍎'
    };
    return icons[category as keyof typeof icons] || '🍽️';
  };

  const categories = ['breakfast', 'lunch', 'dinner', 'snack'];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Food Tracker
        </h1>
        <p className="text-muted-foreground">Track your daily nutrition</p>
      </div>

      {/* Daily Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Calories consumed</span>
              <span className="font-semibold">{totalCalories} / {calorieGoal}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">{totalCalories}</div>
                <div className="text-xs text-muted-foreground">Consumed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">{calorieGoal - totalCalories}</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">{calorieGoal}</div>
                <div className="text-xs text-muted-foreground">Goal</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Meal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Meal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="food-name">Food Name</Label>
              <Input
                id="food-name"
                placeholder="e.g., Grilled Salmon"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="250"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newMeal.category} onValueChange={(value) => setNewMeal({ ...newMeal, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">🌅 Breakfast</SelectItem>
                  <SelectItem value="lunch">☀️ Lunch</SelectItem>
                  <SelectItem value="dinner">🌙 Dinner</SelectItem>
                  <SelectItem value="snack">🍎 Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={addMeal} className="w-full">
                Add Meal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(category => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 capitalize">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getMealsByCategory(category).length === 0 ? (
                  <p className="text-muted-foreground text-sm">No meals logged yet</p>
                ) : (
                  getMealsByCategory(category).map(meal => (
                    <div key={meal.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-medium">{meal.name}</div>
                        <div className="text-sm text-muted-foreground">{meal.time}</div>
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {meal.calories} cal
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoodTracker;
