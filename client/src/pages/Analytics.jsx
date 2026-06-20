import React, { useState, useEffect } from "react";
import ChartSection from "../utility/ChartSection";
import PerformanceSection from "../utility/PerformanceSection";
import AnalyticsProgress from "../utility/AnalyticsProgress";
import {habitService} from "../service/habitService";

const AnalyticsPage = () => {
  const [habits, setHabits] = useState([]);
  const [habitStats, setHabitStats] = useState({});

  useEffect(() => {
    // Fetch habits and stats from the backend
    const fetchHabits = async () => {
      try {
        const res = await habitService.getAllHabits();
        console.log("Fetched Habits:", res.data);
        setHabits(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    // const fetchHabitStats = async () => {
    //   try {
    //     const response = await fetch("/api/habits/stats");
    //     const data = await response.json();
    //     setHabitStats(data);
    //   } catch (error) {
    //     console.error("Error fetching habit stats:", error);
    //   }
    // };

    fetchHabits();
    // fetchHabitStats();
  }, []);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      {/* Page Title Header */}
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-sm text-gray-400">
          Track your consistency and monitor your trends across time
        </p>
      </div>

      {/* 1. Global KPIs (The cards you already have) */}
      <AnalyticsProgress habits={habits}/>

      {/* 2. Middle Section: Visual Charts */}
      <ChartSection />

      {/* 3. Bottom Section: Insights & Individual Leaderboard */}
      <PerformanceSection />
    </div>
  );
};

export default AnalyticsPage;
