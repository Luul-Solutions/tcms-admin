import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative">
        {/* Circular Background */}
        <div className="w-20 h-20 border-4 border-gray-300 rounded-full animate-spin-slow"></div>

        {/* Spinning Loader Icon */}
        <Loader
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-spin"
          size={40}
        />
      </div>
    </div>
  );
}
