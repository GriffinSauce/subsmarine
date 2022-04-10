import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import tailshake from 'tailshake';

interface Props {
  className?: string;
}

const themes = ['light', 'dark'];

const iconsMap: Record<string, React.ComponentType> = {
  light: FiSun,
  dark: FiMoon,
};

const ThemeButton: React.FC<Props> = ({ className = 'w-8 h-8' }) => {
  const [isMounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const nextTheme = themes[(themes.indexOf(resolvedTheme) + 1) % themes.length];
  const Icon = iconsMap[nextTheme];

  useEffect(() => setMounted(true), []); // theme is never defined on build/server

  const toggleDarkMode = () => {
    setTheme(nextTheme);
  };

  if (!isMounted) return null;
  return (
    <button
      className={tailshake(
        'flex items-center justify-center rounded-full bg-gray-50 text-sm dark:bg-gray-700 dark:text-gray-50',
        className,
      )}
      type="button"
      data-testid="theme-button"
      aria-label="App theme"
      onClick={toggleDarkMode}
    >
      <Icon />
    </button>
  );
};

export default ThemeButton;
