import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      await API.post("/register", data);
      nav("/");
    } catch {
      setError("Email already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm hover:shadow-lg transition">

        <h2 className="text-2xl font-bold mb-1">Register</h2>
        <p className="text-sm text-gray-500 mb-6">
          Create your account to continue.
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Name */}
        <input
          placeholder="Name"
          className="w-full border p-3 rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        {/* Email */}
        <input
          placeholder="Email"
          className="w-full border p-3 rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-md mb-5 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => nav("/")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}