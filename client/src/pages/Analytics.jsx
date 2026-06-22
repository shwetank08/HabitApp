import React, { useState, useEffect } from "react";
import ChartSection from "../utility/ChartSection";
import PerformanceSection from "../utility/PerformanceSection";
import AnalyticsProgress from "../utility/AnalyticsProgress";
import { habitService } from "../service/habitService";
import { analyticsService } from "../service/getAnalytics";

const AnalyticsPage = () => {
  const [habits, setHabits] = useState([]);
  const [habitStats, setHabitStats] = useState({});

  useEffect(() => {
    // Fetch habits and stats from the backend
    const fetchHabits = async () => {
      try {
        const res = await habitService.getAllHabits();
        console.log("Fetched Habits Analytics Section:", res.data);
        setHabits(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchHabitStats = async () => {
      try {
        console.log("Fetching habit stats...");
        const response = await analyticsService.getAnalytics();
        console.log("Fetched Habit Stats:", response.data);
        setHabitStats(response.data);
      } catch (error) {
        console.error("Error fetching habit stats:", error);
      }
    };

    fetchHabits();
    fetchHabitStats();
  }, []);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-sm text-gray-400">
          Track your consistency and monitor your trends across time
        </p>
      </div>

      <AnalyticsProgress habits={habits}/>

      <ChartSection statistics = {habitStats}/>

      <PerformanceSection />
    </div>
  );
};

export default AnalyticsPage;
