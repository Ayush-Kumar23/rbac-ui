import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RBACProvider } from './context/RBACContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RBACProvider>
      <App />
    </RBACProvider>
  </StrictMode>
);