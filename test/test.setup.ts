import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

// JSDom doesn't support the second param and adds test log noise
// TODO: clean up when fixed: https://github.com/nickcolley/jest-axe/issues/147
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

// Prevent act() error logs
// TODO: clean up when fixed: https://github.com/vercel/next.js/pull/20169
jest.mock('next/link', () => ({ children }) => children);
