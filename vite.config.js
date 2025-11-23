import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      options: {
        // Obfuscation options - makes code harder to read
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false, // Set to true for extra protection (may break dev tools)
        debugProtectionInterval: 0,
        disableConsoleOutput: false, // Set to true to disable console.log
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ['base64'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
      },
      // Only obfuscate in production builds
      apply: 'build'
    })
  ],
  build: {
    // Minify and optimize production build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Set to true to remove console.log
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug'] // Remove specific console methods
      },
      format: {
        comments: false // Remove comments
      }
    },
    // Generate source maps (set to false for better protection, but harder to debug)
    sourcemap: false,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunking for better code splitting
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'animation-vendor': ['framer-motion', 'gsap', 'aos']
        }
      }
    }
  }
})
