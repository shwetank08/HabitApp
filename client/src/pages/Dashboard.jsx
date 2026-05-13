import React, { useEffect, useMemo, useState } from "react";
import { habitService } from "../service/habitService";
import HabitCard from "../utility/HabitCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [streak, setStreak] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState("DAILY");

  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
  }, []);


  const fetchHabitStreaks = async (habitId) => {
    try {
      const res = await habitLogService.getHabitLogsByHabitId(habitId);
      setStreak(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHabits = async () => {
    try {
      const res = await habitService.getAllHabits();
      setHabits(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (habit) => {
    navigate(`/habit/${habit._id}`);
  };

  const handleToggleComplete = (id) => {
    setHabits((prev) =>
      prev.map((h) =>
        h._id === id
          ? { ...h, completedToday: !h.completedToday }
          : h
      )
    );
  };

  // FILTER HABITS BASED ON FREQUENCY
  const filteredHabits = useMemo(() => {
    return habits.filter(
      (habit) => habit.frequency === selectedFrequency
    );
  }, [habits, selectedFrequency]);

  // STATS
  const totalHabits = filteredHabits.length;

  const completedToday = filteredHabits.filter(
    (h) => h.completedToday
  ).length;

  const progress =
    totalHabits === 0
      ? 0
      : Math.round((completedToday / totalHabits) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white p-4 sm:p-6">
      {console.log(habits)}
      {console.log(streak)}
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Habit Dashboard
          </h1>

          <p className="text-gray-400 mt-1">
            Track your consistency and build discipline 🚀
          </p>
        </div>

        {/* FREQUENCY FILTER */}
        <select
          value={selectedFrequency}
          onChange={(e) => setSelectedFrequency(e.target.value)}
          className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl backdrop-blur-md text-white outline-none"
        >
          <option className="text-black" value="DAILY">
            Daily
          </option>

          <option className="text-black" value="WEEKLY">
            Weekly
          </option>

          <option className="text-black" value="MONTHLY">
            Monthly
          </option>
        </select>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-5 shadow-lg">
          <p className="text-gray-400 text-sm mb-1">
            Total Habits
          </p>

          <h2 className="text-3xl font-bold">
            {totalHabits}
          </h2>
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-5 shadow-lg">
          <p className="text-gray-400 text-sm mb-1">
            Completed
          </p>

          <h2 className="text-3xl font-bold">
            {completedToday}
          </h2>
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-5 shadow-lg">
          <p className="text-gray-400 text-sm mb-1">
            Progress
          </p>

          <h2 className="text-3xl font-bold">
            {progress}%
          </h2>
        </div>
      </div>

      {/* HABITS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold capitalize">
            {selectedFrequency} Habits
          </h2>

          <span className="text-sm text-gray-400">
            {filteredHabits.length} habits found
          </span>
        </div>

        {/* EMPTY STATE */}
        {filteredHabits.length === 0 ? (
          <div className="bg-white/10 border border-dashed border-white/20 rounded-2xl p-10 text-center text-gray-400">
            No {selectedFrequency} habits found.
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit._id}
                habit={habit}
                onEdit={handleEdit}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;