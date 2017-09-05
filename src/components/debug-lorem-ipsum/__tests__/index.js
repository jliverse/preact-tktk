import { h, render } from 'preact';
import { renderAsHTML } from 'lib/preact';

import UI from '../index';

test('UI renders', () => {
  const html = renderAsHTML(<UI />);
  expect(html).toBeTruthy();
});

test('UI is wrapped in a paragraph', () => {
  const html = renderAsHTML(<UI />);
  expect(html).toMatch(/^\<p\>Lorem ipsum.*laborum.\<\/p\>$/);
  expect(html).toMatchSnapshot();
});
