import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    {
      name: 'treat-js-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (!/\.js$/.test(id)) return null
        // Transform .js files containing JSX with esbuild
        return transformWithEsbuild(code, id + '?jsx', {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
    react(),
  ],
  resolve: {
    alias: {
      'loopda': path.resolve(__dirname),
      'qux': path.resolve(__dirname, 'lib/qux'),
      'trax': path.resolve(__dirname, 'lib/trax/index.js'),
      'timer2': path.resolve(__dirname, 'lib/timer2/index.js'),
      'sentry': path.resolve(__dirname, 'lib/sentry/index.js'),
      'dom-util': path.resolve(__dirname, 'lib/dom-util/index.js'),
      'stateful-router': path.resolve(__dirname, 'lib/stateful-router/index.js'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
      },
    },
  },
  server: {
    port: 6060,
  },
})
