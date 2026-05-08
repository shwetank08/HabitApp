import React, { useEffect, useState } from "react";
import { habitService } from "../service/habitService";
import HabitCard from "../utility/HabitCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await habitService.getAllHabits();
      console.log(res.data);
      
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (habit) => {
    console.log("Edit habit:", habit);
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

  

  const totalHabits = habits.length;
  const completedToday = habits.filter((h) => h.completedToday).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-4 sm:p-6 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Dashboard
      </h1>
      {console.log(habits)}
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Total Habits</p>
          <h2 className="text-xl sm:text-2xl font-bold">
            {totalHabits}
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Completed</p>
          <h2 className="text-xl sm:text-2xl font-bold">
            {completedToday}
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Progress</p>
          <h2 className="text-xl sm:text-2xl font-bold">
            {totalHabits === 0
              ? 0
              : Math.round((completedToday / totalHabits) * 100)}
            %
          </h2>
        </div>
      </div>

      {/* Habit List */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Today's Habits
        </h2>

        {habits.map((habit) => (
          <HabitCard
            key={habit._id}
            habit={habit}
            onEdit={handleEdit}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;