
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import FoodTracker from "./pages/FoodTracker";
import WorkoutTracker from "./pages/WorkoutTracker";
import WeightTracker from "./pages/WeightTracker";
import SleepMoodTracker from "./pages/SleepMoodTracker";
import WeeklyReview from "./pages/WeeklyReview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/food" element={<FoodTracker />} />
            <Route path="/workouts" element={<WorkoutTracker />} />
            <Route path="/weight" element={<WeightTracker />} />
            <Route path="/sleep-mood" element={<SleepMoodTracker />} />
            <Route path="/review" element={<WeeklyReview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
