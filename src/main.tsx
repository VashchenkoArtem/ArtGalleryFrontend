import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Providers } from './app/providers'


const root = document.getElementById('root')!
createRoot(root).render(
  <StrictMode>
    <Providers/>
  </StrictMode>
)
