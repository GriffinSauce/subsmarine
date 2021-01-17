import React from 'react';
import { useTheme } from 'next-themes';
import { render, fireEvent } from 'test-utils';
import { axe } from 'jest-axe';
import ThemeToggle from './ThemeToggle';

const ThemeSpy: React.FC = () => {
  const { theme } = useTheme();
  return <span data-testid="theme-spy">{theme}</span>;
};

it('toggles the theme', () => {
  const { getByTestId } = render(
    <>
      <ThemeToggle />
      <ThemeSpy />
    </>,
    { theme: 'dark' },
  );
  const select = getByTestId('theme-select');
  const spy = getByTestId('theme-spy');

  fireEvent.change(select, { target: { value: 'light' } });

  expect(spy).toHaveTextContent('light');
});

it('passes accessibility tests', async () => {
  const { container } = render(<ThemeToggle />);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
