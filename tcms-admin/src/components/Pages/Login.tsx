import React, { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../../services/auth";
import { Mail, Lock } from "lucide-react";

interface LoginProps {
  setAuth: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      setAuth(true);
      localStorage.setItem("user", JSON.stringify(data)); // Store token or user details
      navigate("/dashboard");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Invalid email or password.");
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error state
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg shadow-lg p-12 max-w-md w-full backdrop-blur-lg bg-opacity-80"
      >
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="/logo icon.png"
            alt="Logo"
            className="h-16 w-16 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        {/* Error Message */}
        {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="font-medium text-gray-700 mb-2 block"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-gray-500" />
              Email Address
            </div>
          </label>
          <input
            id="email"
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="font-medium text-gray-700 mb-2 block"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-gray-500" />
              Password
            </div>
          </label>
          <input
            id="password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition transform hover:scale-105 disabled:opacity-50"
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
