import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "postcss",
      async transform(css, id) {
        if (!id.endsWith(".css")) return;
        const { default: postcss } = await import("postcss");
        const { default: autoprefixer } = await import("autoprefixer");
        const { default: postcssImport } = await import("postcss-import");

        return postcss([postcssImport(), autoprefixer()]).process(css, {
          from: undefined,
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) {
              return "vendor-framer";
            }
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("matter-js")) {
              return "vendor-matter";
            }
            if (id.includes("react-icons")) {
              return "vendor-icons";
            }
            return "vendor";
          }
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
        passes: 2,
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    cssMinify: true,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
  },
});
