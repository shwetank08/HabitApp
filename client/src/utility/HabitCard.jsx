import { useState } from "react";
import { Check, CheckCircle, Info } from "lucide-react";

const HabitCard = ({ habit, onEdit, onToggleComplete }) => {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div
      onClick={() => onEdit(habit)}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl mb-3 cursor-pointer transition hover:bg-white/20"
    >
      <div className="flex items-start justify-between gap-3">
        {/* LEFT */}
        <div className="min-w-0">
          <h3 className="font-semibold text-base sm:text-lg truncate">
            {habit.name}
          </h3>

          {showDesc && (
            <p className="text-sm text-gray-400 mt-1">
              {habit.description}
            </p>
          )}

          <p className="text-sm text-gray-400">
            🔥 Streak: {habit.streak || 0}
          </p>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          {/* Info */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDesc((prev) => !prev);
            }}
            className="p-2 rounded-lg hover:bg-white/20"
          >
            <Info size={16} className="text-gray-300" />
          </button>

          {/* Complete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(habit._id);
            }}
            className={`p-2 rounded-lg transition ${
              habit.completedToday
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            {habit.completedToday ? (
              <Check size={16} />
            ) : (
              <CheckCircle size={16} className="text-green-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;