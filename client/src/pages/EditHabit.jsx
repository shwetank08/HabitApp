import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { habitService } from "../service/habitService";

const EditHabit = () => {
  const navigate = useNavigate();
  const habitID = useParams().id;

  const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [fetchHabit, setFetchHabit] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    frequency: "",
  });

  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await habitService.getHabits(habitID);
        setFetchHabit(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [habitID]);

  useEffect(() => {
    if (fetchHabit) {
      setForm({
        name: fetchHabit.name || "",
        description: fetchHabit.description || "",
        frequency: fetchHabit.frequency || "",
      });
      
      setSelectedDays(fetchHabit.days || []);
    }
  }, [fetchHabit]);

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

    const payload = {
      ...form,
      days: form.frequency === "WEEKLY" ? selectedDays : [],
    };

    console.log("Updated Habit:", payload);

    const updateData = async () => {
      try {
        await habitService.updateHabit(habitID, payload);

        navigate("/dashboard");
      } catch (err) {
        console.error(err);
      }
    };

    updateData();

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold">Edit Habit</h1>
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
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your habit..."
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Frequency</label>
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
            >
              <option value="">Select frequency</option>
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
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
              className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHabit;
