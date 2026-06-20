import React, { useState } from "react";
import { ArrowLeft, Calendar, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { habitService } from "../service/habitService";

const AddHabit = () => {
  const navigate = useNavigate();

  const allDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const frequencies = [
    { value: "DAILY", label: "Daily" },
    { value: "WEEKLY", label: "Weekly" },
    { value: "MONTHLY", label: "Monthly" },
    { value: "YEARLY", label: "Yearly" },
  ];

  const [form, setForm] = useState({
    name: "",
    description: "",
    frequency: "DAILY", // Defaulting to DAILY for better initial UX
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
  };

  const handleFrequencyChange = (value) => {
    setForm((prev) => ({
      ...prev,
      frequency: value,
    }));
    if (value !== "WEEKLY") {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white p-4 sm:p-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-xl">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transitionall duration-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Create New Habit
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">Track your progress and build a better routine.</p>
          </div>
        </div>

        {/* MAIN CONTAINER */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 rounded-2xl shadow-2xl shadow-black/40">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* HABIT NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Habit Name <span className="text-indigo-400">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="E.g., Morning Meditation, Hit the Gym"
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-gray-500 transition-all outline-none"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Description <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Why do you want to build this habit? What are your specific rules?"
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-gray-500 transition-all outline-none resize-none"
                rows="3"
              />
            </div>

            {/* FREQUENCY CARDS */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Frequency
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {frequencies.map((freq) => {
                  const isSelected = form.frequency === freq.value;
                  return (
                    <button
                      key={freq.value}
                      type="button"
                      onClick={() => handleFrequencyChange(freq.value)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 flex flex-col items-center gap-1 ${
                        isSelected
                          ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/10"
                          : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10 hover:text-gray-200"
                      }`}
                    >
                      {isSelected && <CheckCircle2 size={14} className="text-indigo-400 absolute self-end -mt-1 -mr-2" />}
                      <span>{freq.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CONDITIONAL DAY SELECTION */}
            {form.frequency === "WEEKLY" && (
              <div className="pt-2 border-t border-white/5 animate-fadeIn">
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-1.5">
                  <Calendar size={16} className="text-indigo-400" />
                  Select Active Days
                </label>

                <div className="flex flex-wrap gap-2">
                  {allDays.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`w-12 h-12 rounded-full text-xs font-bold border flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? "bg-indigo-500 text-white border-indigo-400 shadow-md shadow-indigo-500/30 ring-2 ring-indigo-500/20"
                            : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-gray-200"
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 hover:text-white transition-all"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || (form.frequency === "WEEKLY" && selectedDays.length === 0)}
                className="px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-semibold text-sm transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Add Habit</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;