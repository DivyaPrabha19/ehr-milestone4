import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '50px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🏥 AI-Powered EHR System</h1>
      <p>Medical Imaging & Documentation Platform</p>
      <div style={{ marginTop: '30px' }}>
        <a href="/index.html" style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          padding: '15px 30px',
          textDecoration: 'none',
          borderRadius: '25px',
          margin: '10px'
        }}>
          Go to Main App
        </a>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);