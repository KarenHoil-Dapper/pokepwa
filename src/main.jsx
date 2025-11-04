import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {
    console.log('La aplicación está lista para usarse sin conexión.')
  }
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.jsx')
      .then(reg => console.log('ServiceWorker registrado.', reg))
      .catch(err => console.log('ServiceWorker fallo:', err));
  });
}