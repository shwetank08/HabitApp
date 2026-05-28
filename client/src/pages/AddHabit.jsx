import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { habitService } from '../service/habitService';

const AddHabit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'DAILY', // Set matching uppercase default value
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name.trim() || !formData.frequency) {
      setError('Name and frequency are required.');
      setLoading(false);
      return;
    }

    try {
      // Send data to habit service
      await habitService.createHabit(formData); 
      // Redirect back to dashboard after successful addition
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to create habit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white p-4 sm:p-6 flex items-center justify-center">
      
      <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl">
        
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Add New Habit</h1>
          <p className="text-gray-400 text-sm mt-1">Start small, think big. Consistency is key! 🎯</p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* HABIT NAME */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Habit Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Read 10 pages, Meditate"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Why do you want to build this habit?"
              rows="4"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            ></textarea>
          </div>

          {/* FREQUENCY */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Frequency</label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option className="text-black" value="DAILY">Daily</option>
              <option className="text-black" value="WEEKLY">Weekly</option>
              <option className="text-black" value="MONTHLY">Monthly</option>
            </select>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 border border-white/20 hover:bg-white/5 text-white font-medium py-2.5 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center"
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