import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="bg-white shadow-sm px-6 py-3 flex justify-between items-center relative">
      <h1 className="font-bold text-lg">Lost & Found</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shadow"
          title="Profile"
        >
          {initial}
        </button>

        {open && (
          <div className="absolute right-6 top-16 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20">
            <div className="mb-3">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="font-semibold">{user?.name || "Unknown"}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email || "No email"}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}