import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

// JSDom doesn't support the second param and adds test log noise
// TODO: clean up when fixed: https://github.com/nickcolley/jest-axe/issues/147
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

// Prevent act() error logs
// TODO: clean up when fixed: https://github.com/vercel/next.js/pull/20169
jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children,
);

let localStorageMock: { [key: string]: string } = {};

beforeAll(() => {
  // Create a mock of the window.matchMedia function
  global.matchMedia = jest.fn((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  // Create mocks of localStorage getItem and setItem functions
  global.Storage.prototype.getItem = jest.fn(
    (key: string) => localStorageMock[key],
  );
  global.Storage.prototype.setItem = jest.fn((key: string, value: string) => {
    localStorageMock[key] = value;
  });
});

beforeEach(() => {
  // Clear the localStorage-mock
  localStorageMock = {};
});
