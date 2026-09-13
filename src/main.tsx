import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PoliciesPage } from './features/policies/PoliciesPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PoliciesPage />
  </StrictMode>,
)
