import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");   // remove token
    navigate("/");                      // redirect to login
  };

  return (
    <div className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">Lost & Found</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}