import { h, render } from 'preact';
import { renderAsHTML, renderAsDocument } from 'lib/preact';

import UI from '../index';

test('UI renders', () => {
  const html = renderAsHTML(<UI />);
  expect(html).toBeTruthy();
});

test('UI is wrapped in a paragraph', () => {
  const document = renderAsDocument(<UI />);
  expect(document.find('p').text()).toMatch(/^Lorem ipsum/);
});
