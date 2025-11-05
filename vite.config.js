import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      // 👇 Aquí conectamos tu service worker personalizado
      srcDir: 'public',
      filename: 'sw.js',
      // Opcional pero recomendado: activa notificaciones y mejoras offline
      devOptions: {
        enabled: true, // habilita PWA también en modo desarrollo
        type: 'module'
      },
      manifest: {
        name: 'POKEPWA',
        short_name: 'PokePWA',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563eb',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
