import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // React plugin for JSX/TSX support
  ],
  server: {
    host: true, // Allows access via local network (good for testing on multiple devices)
    port: 5173, // Default port for Vite, can be customized
    open: true, // Automatically opens the app in the default browser
    watch: {
      ignored: ["**/node_modules/**", "**/.git/**"], // Ignore unnecessary files
    },
  },
  build: {
    outDir: "dist", // Output directory for production build
    sourcemap: false, // Disables source maps for faster builds (set to true for debugging production code)
    target: "esnext", // Ensures modern JavaScript syntax is used for the build
    chunkSizeWarningLimit: 500, // Increases the warning limit for large chunk sizes (optional)
  },
  base: "./", // Ensures relative paths for assets, useful for deployment in subdirectories
  optimizeDeps: {
    include: ["react", "react-dom"], // Pre-bundle common dependencies for faster startup
  },
  css: {
    modules: {
      // Optional: Configure CSS modules for better styling encapsulation
      scopeBehaviour: "local", // Local by default
    },
  },
  define: {
    // Optional: You can define global constants for use in your app
    "process.env": {},
  },
});
