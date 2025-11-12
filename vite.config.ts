import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  base: '/resource-management-poc/',
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      srcDirectory: 'app',
      spa: {
        enabled: true,
        prerender: {
          crawlLinks: true,
        },
      },
    }),
    viteReact(),
  ],
})
