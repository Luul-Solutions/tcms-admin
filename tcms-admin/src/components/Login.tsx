// Login.tsx
import React, { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

interface LoginProps {
  setAuth: Dispatch<SetStateAction<boolean>>;
}

// Temporary fake users for now
const fakeUsers = [
  { email: "temp@example.com", password: "temp123" },
  { email: "john@example.com", password: "pass123" },
  { email: "admin@example.com", password: "admin123" },
];

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check against fake users
    const userExists = fakeUsers.some(
      (user) => user.email === email && user.password === password,
    );

    if (userExists) {
      setAuth(true);
      localStorage.setItem("user", email);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg shadow-lg p-12 max-w-md w-full backdrop-blur-lg bg-opacity-80"
      >
        <div className="mb-6 flex justify-center">
          <img
            src="/logo icon.png"
            alt="Logo"
            className="h-16 w-16 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

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
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition transform hover:scale-105"
        >
          Login
        </button>

        {/* Future server-side integration commented out */}
        {/*
        const { data: users, error: fetchError } = useQuery(["users"], fetchUsers);

        const handleServerLogin = (e) => {
          e.preventDefault();

          if (users && users.some(user => user.email === email && user.password === password)) {
            setAuth(true);
            localStorage.setItem("user", email);
            navigate('/dashboard');
          } else {
            setError('Invalid login credentials');
          }
        };
        */}
      </form>
    </div>
  );
};

export default Login;
