import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(), // Enable React plugin
    {
      name: "postcss",
      async transform(css, id) {
        if (!id.endsWith(".css")) return;
        const { default: postcss } = await import("postcss");
        const { default: autoprefixer } = await import("autoprefixer");
        const { default: postcssImport } = await import("postcss-import");

        return postcss([
          postcssImport(),
          autoprefixer(),
          // Add more plugins as needed
        ]).process(css, { from: undefined });
      },
    },
  ],
  resolve: {
    alias: {
      "@": "/src", // Example alias configuration
    },
  },
});
