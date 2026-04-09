import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = true;

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <nav className="h-16 flex justify-between items-center px-6 rounded-2xl text-zinc-900 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <h1 className="text-lg font-semibold">
        <Link to="/">HabitTracker</Link>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {isLoggedIn ? (
          <>
            <Link className="text-zinc-500 hover:text-zinc-900" to="/">
              Dashboard
            </Link>
            <Link className="text-zinc-500 hover:text-zinc-900" to="/add-habit">
              Add Habit
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white/20 px-3 py-1 rounded-full text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="text-white/80" to="/login">
              Login
            </Link>
            <Link
              className="bg-blue-600 px-4 py-1 rounded-full text-white"
              to="/signup"
            >
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 w-48 flex flex-col gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg md:hidden z-50">
          {isLoggedIn ? (
            <>
              <Link
                to="/"
                className="text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/add-habit"
                className="text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Add Habit
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white/20 px-3 py-1 rounded-full text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white/80 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
