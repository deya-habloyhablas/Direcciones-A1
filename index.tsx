import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: Could not find root element.</div>';
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Application failed to mount:", error);
  rootElement.innerHTML = `<div style="padding: 20px; color: #7f1d1d; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px;">
    <strong>Error al iniciar la aplicación:</strong><br/>
    Verifica la consola para más detalles.<br/>
    <small>${error instanceof Error ? error.message : String(error)}</small>
  </div>`;
}
