import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_REACT_APP_BACKEND + "/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("react")) {
            return "react-vendor";
          }
          if (id.includes("react-dom")) {
            return "react-dom-vendor";
          }
          if (id.includes("react-router-dom")) {
            return "react-router-dom-vendor";
          }
          if (id.includes("framer-motion")) {
            return "framer-motion-vendor";
          }
          if (id.includes("axios")) {
            return "axios-vendor";
          }
          if (id.includes("@reduxjs/toolkit")) {
            return "redux-toolkit-vendor";
          }
          if (id.includes("react-redux")) {
            return "react-redux-vendor";
          }
          if (id.includes("styled-components")) {
            return "styled-components-vendor";
          }
          if (id.includes("@babylonjs/loaders")) {
            return "babylon-loaders";
          }
          if (id.includes("@babylonjs/core/Cameras/arcRotateCamera")) {
            return "babylon-arcRotate-camera";
          }
        },
      },
    },
  },
});
