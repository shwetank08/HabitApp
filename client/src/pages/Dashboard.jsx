import React, { useState } from "react"; 

const Dashboard = () => {

  const [habits, setHabits] = useState([{
    habitName: "",
    description: "",
    frequency: "",
    days: [],
  }]);

  const fetchHabits = async () => {
    const gethabits = await habitService.getHabits(`69c61b11a819b4c403e3de67`);
    console.log(gethabits);
    setHabits(gethabits.data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add a new habit
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      {habits.map((habit) => (
        <div key={habit._id} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold">{habit.habitName}</h2>
          <p className="text-gray-300">{habit.description}</p>
          <p className="text-blue-400">Frequency: {habit.frequency}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;