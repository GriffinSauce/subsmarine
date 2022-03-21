import { useTheme } from 'next-themes';
import { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonThemeProvider: React.FC = ({ children }) => {
  const { theme } = useTheme();
  const themeProps =
    theme === 'dark'
      ? {
          baseColor: '#1f2937', // gray800
          highlightColor: '#374151', // gray900
        }
      : {};

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <SkeletonTheme {...themeProps}>{children}</SkeletonTheme>;
};

export default SkeletonThemeProvider;
