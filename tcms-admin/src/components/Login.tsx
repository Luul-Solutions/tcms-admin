// Login.tsx
import React, { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

interface LoginProps {
  setAuth: Dispatch<SetStateAction<boolean>>;
}

const TEMP_EMAIL = "temp@example.com";
const TEMP_PASSWORD = "temp123";

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === TEMP_EMAIL && password === TEMP_PASSWORD) {
      setAuth(true);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Use the temporary credentials.");
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
            placeholder={`Use ${TEMP_EMAIL}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

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
            placeholder={`Use ${TEMP_PASSWORD}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
