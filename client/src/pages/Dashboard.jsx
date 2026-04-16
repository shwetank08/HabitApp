import React, { useEffect, useState } from "react";
import { habitService } from "../service/habitService";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await habitService.getAllHabits();
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter((h) => h.completedToday).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-4 sm:p-6 text-white">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard</h1>

      {/* 🔹 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Total Habits</p>
          <h2 className="text-xl sm:text-2xl font-bold">{totalHabits}</h2>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Completed</p>
          <h2 className="text-xl sm:text-2xl font-bold">{completedToday}</h2>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Progress</p>
          <h2 className="text-xl sm:text-2xl font-bold">
            {totalHabits === 0
              ? 0
              : Math.round((completedToday / totalHabits) * 100)}%
          </h2>
        </div>
      </div>

      {/* 🔹 Habits */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Today's Habits
        </h2>

        {habits.map((habit) => (
          <div
            key={habit._id}
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl mb-3"
          >
            {/* 🔥 Responsive layout */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              {/* LEFT SIDE */}
              <div className="min-w-0">
                <h3 className="font-semibold text-base sm:text-lg truncate">
                  {habit.habitName}
                </h3>

                <p className="text-sm text-gray-400">
                  🔥 Streak: {habit.streak || 0}
                </p>
              </div>

              {/* BUTTON */}
              <button
                className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition ${
                  habit.completedToday
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                {habit.completedToday ? "Done" : "Mark Done"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;