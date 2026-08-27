// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { cloudflare } from '@cloudflare/vite-plugin'
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     cloudflare({
//       configPath: "../api/wrangler.jsonc",
//     }),
//   ],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    cloudflare({
      configPath: "../api/wrangler.jsonc",
      persistState: {
        path: "../api/.wrangler/state",
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 100
    },
  },
})
