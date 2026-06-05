import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

// Import Fontsource Fonts (Recoleta & Berthold equivalents)
import '@fontsource/fraunces/300.css'
import '@fontsource/fraunces/400.css'
import '@fontsource/fraunces/400-italic.css'
import '@fontsource/fraunces/600.css'
import '@fontsource/fraunces/700.css'
import '@fontsource/fraunces/800.css'
import '@fontsource/fraunces/900.css'

import '@fontsource/hanken-grotesk/300.css'
import '@fontsource/hanken-grotesk/400.css'
import '@fontsource/hanken-grotesk/500.css'
import '@fontsource/hanken-grotesk/600.css'
import '@fontsource/hanken-grotesk/700.css'
import '@fontsource/hanken-grotesk/800.css'

// Import Retro Pixel Fonts (from image request)
import '@fontsource/silkscreen/index.css'
import '@fontsource/pixelify-sans/index.css'
import '@fontsource/pixelify-sans/700.css'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
