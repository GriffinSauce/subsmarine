import React from 'react';
import { useTheme } from 'next-themes';
import { render, fireEvent } from 'test-utils';
import { axe } from 'jest-axe';
import ThemeButton from './ThemeButton';

const ThemeSpy: React.FC = () => {
  const { theme } = useTheme();
  return <span data-testid="theme-spy">{theme}</span>;
};

it('toggles the theme', () => {
  const { getByTestId } = render(
    <>
      <ThemeButton />
      <ThemeSpy />
    </>,
    { theme: 'dark' },
  );
  const button = getByTestId('theme-button');
  const spy = getByTestId('theme-spy');

  expect(spy).toHaveTextContent('dark');

  fireEvent.click(button);

  expect(spy).toHaveTextContent('light');
});

it('passes accessibility tests', async () => {
  const { container } = render(<ThemeButton />);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
