import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "React.createElement", // Ensures JSX is compiled with React.createElement
    jsxInject: `import React from 'react'`, // Automatically inject React for JSX/TSX files
  },
  optimizeDeps: {
    // Improve the performance of dependency pre-bundling
    include: ["react", "react-dom"], // Add other packages you frequently use here
    esbuildOptions: {
      target: "esnext", // Set target to esnext for faster build times
    },
  },
  server: {
    open: true, // Automatically open the app in the browser
  },
});
