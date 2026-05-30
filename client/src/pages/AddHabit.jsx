import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { habitService } from "../service/habitService";

const AddHabit = () => {
  const navigate = useNavigate();

  const allDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const [form, setForm] = useState({
    name: "",
    description: "",
    frequency: "",
  });

  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "frequency" && value !== "WEEKLY") {
      setSelectedDays([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      days: form.frequency === "WEEKLY" ? selectedDays : [],
    };

    console.log("New Habit Payload:", payload);

    const createNewHabit = async () => {
      try {
        await habitService.addHabit(payload);
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    createNewHabit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold">Add Habit</h1>
      </div>

      
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter habit name"
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your habit..."
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white resize-none"
              rows="4"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Frequency</label>
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none text-white"
              required
            >
              <option className="text-black" value="">Select frequency</option>
              <option className="text-black" value="DAILY">Daily</option>
              <option className="text-black" value="WEEKLY">Weekly</option>
              <option className="text-black" value="MONTHLY">Monthly</option>
              <option className="text-black" value="YEARLY">Yearly</option>
            </select>
          </div>

          {form.frequency === "WEEKLY" && (
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Select Days
              </label>

              <div className="flex flex-wrap gap-2">
                {allDays.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                      selectedDays.includes(day)
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 font-medium transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Add Habit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;