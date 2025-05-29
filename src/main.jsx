import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { storyblokInit, apiPlugin } from '@storyblok/react'
import App from './App.jsx'

storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
