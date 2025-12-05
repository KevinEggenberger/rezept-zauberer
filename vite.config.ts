import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/rezept-zauberer/",
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
});
