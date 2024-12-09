import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "localhost",
    port: 5175, // Ensure it matches your npm script
  },
  plugins: [react()],
});
