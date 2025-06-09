import { useState, useEffect } from 'react';
import Converter from './components/Converter';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={isDarkMode ? 'app dark' : 'app'}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {isDarkMode ? '☀️ Terang' : '🌙 Gelap'}
        </button>
      </div>
      <Converter />
    </div>
  );
}

export default App;
