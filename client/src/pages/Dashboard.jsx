import React, { useEffect, useMemo, useState } from "react";
import { habitService } from "../service/habitService";
import HabitCard from "../utility/HabitCard";
import { useNavigate } from "react-router-dom";
import { habitLogService } from "../service/habitLogService";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFrequency, setSelectedFrequency] = useState("DAILY");

  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await habitService.getAllHabits();
      console.log("Fetched Habits:", res.data);
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (habit) => {
    navigate(`/habit/${habit._id}`);
  };

  const handleToggleComplete = async (habit) => {
    const previous = habit.completedToday;

    // Optimistic UI update
    setHabits((prev) =>
      prev.map((h) =>
        h._id === habit._id ? { ...h, completedToday: !previous } : h
      )
    );

    try {
      await habitLogService.upsertHabitLog(habit._id, {
        date: new Date(),
        status: previous ? "MISSED" : "COMPLETED",
      });
      fetchHabits();
    } catch (err) {
      console.error(err);
      // Rollback on error
      setHabits((prev) =>
        prev.map((h) =>
          h._id === habit._id ? { ...h, completedToday: previous } : h
        )
      );
    }
  };

  // Filter habits based on frequency
  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => habit.frequency === selectedFrequency);
  }, [habits, selectedFrequency]);

  // Statistics
  const totalHabits = filteredHabits.length;
  const completedToday = filteredHabits.filter((h) => h.completedToday).length;
  const progress = totalHabits === 0 ? 0 : Math.round((completedToday / totalHabits) * 100);

  const frequencies = ["DAILY", "WEEKLY", "MONTHLY"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white p-4 sm:p-8 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Habit Dashboard
            </h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Track your consistency and build discipline 🚀
            </p>
          </div>

          {/* MODERN TAB FILTER */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md self-start md:self-center">
            {frequencies.map((freq) => (
              <button
                key={freq}
                onClick={() => setSelectedFrequency(freq)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
                  selectedFrequency === freq
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {freq.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl transition-transform hover:scale-[1.01]">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Total Habits
            </p>
            <h2 className="text-4xl font-bold tracking-tight">{totalHabits}</h2>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl transition-transform hover:scale-[1.01]">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Completed
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-emerald-400">
              {completedToday} <span className="text-sm font-normal text-slate-500">/ {totalHabits}</span>
            </h2>
          </div>

          {/* Card 3: Dynamic Progress */}
          <div className="bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl transition-transform hover:scale-[1.01] flex flex-col justify-between">
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Progress
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-indigo-400">{progress}%</h2>
            </div>
            {/* Visual Progress Bar */}
            <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* HABITS LIST SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-200 capitalize">
              {selectedFrequency.toLowerCase()} Tasks
            </h2>
            <span className="text-xs bg-white/5 text-slate-400 px-2.5 py-1 rounded-full border border-white/5">
              {filteredHabits.length} active
            </span>
          </div>

          {/* LOADING SKELETON */}
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-20 bg-white/5 border border-white/10 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredHabits.length === 0 ? (
            /* EMPTY STATE */
            <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-2xl p-12 text-center max-w-md mx-auto mt-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-slate-200 font-medium mb-1">No habits here yet</h3>
              <p className="text-slate-500 text-sm capitalize">
                Ready to crush some new {selectedFrequency.toLowerCase()} targets?
              </p>
            </div>
          ) : (
            /* HABIT CARDS GRID */
            <div className="grid gap-3 grid-cols-1">
              {filteredHabits.map((habit) => (
                <div 
                  key={habit._id} 
                  className="transition-all duration-200 hover:translate-x-1"
                >
                  <HabitCard
                    habit={habit}
                    onEdit={handleEdit}
                    onToggleComplete={handleToggleComplete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;