import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Vite configuration for S3/CloudFront hosting
export default defineConfig({
  plugins: [react()],
  
  // Ensures relative paths work when hosted from an S3 bucket
  base: "./",

  // Tells Vite to include .gif and other static assets under /src in the build
  assetsInclude: ["**/*.gif", "**/*.png", "**/*.jpg", "**/*.svg"],

  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
})
