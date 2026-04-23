import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.post("/login", data);
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 transition-all duration-500">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm hover:shadow-lg transition-all">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-1">Login</h2>
        <p className="text-sm text-gray-500 mb-6">
          Welcome back! Please enter your details.
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            placeholder=" "
            className="peer w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label className="absolute left-3 top-3 text-gray-500 text-sm 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 
            peer-valid:-top-2 peer-valid:text-xs transition-all bg-white px-1">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <input
            type="password"
            placeholder=" "
            className="peer w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <label className="absolute left-3 top-3 text-gray-500 text-sm 
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 
            peer-valid:-top-2 peer-valid:text-xs transition-all bg-white px-1">
            Password
          </label>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition flex justify-center items-center"
        >
          {loading ? (
            <span className="animate-pulse">Logging in...</span>
          ) : (
            "Login"
          )}
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => nav("/register")}
            className="text-blue-600 cursor-pointer font-medium hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}