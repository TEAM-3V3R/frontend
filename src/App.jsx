import Router from './Router';
import './App.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (
      path === '/register' ||
      path === '/chat' ||
      path === '/demo' ||
      path === '/inpainting'
    ) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [location.pathname]);
  return <Router />;
}

export default App;
