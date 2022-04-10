import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiSun } from 'react-icons/fi';

const ThemeToggle: React.FC = () => {
  const [isMounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []); // theme is never defined on build/server

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  if (!isMounted) return null;
  return (
    <div className="inline-flex items-center justify-center space-x-1 text-sm dark:text-gray-50">
      <FiSun />
      <select
        className="rounded border border-gray-300 p-1 font-semibold dark:border-gray-700 dark:bg-gray-900"
        value={theme}
        data-testid="theme-select"
        aria-label="App theme"
        onChange={handleChange}
      >
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
        <option value="system">System</option>
      </select>
    </div>
  );
};

export default ThemeToggle;
