import { test } from 'tape-catch';
import { h, render } from 'preact';
import { defer, mount } from 'lib/preact';

import UI from '..';

test('UI can render', t => {
  const unmount = mount(<UI />);
  let el = document.querySelector('p');
  t.ok(el);
  t.end();
});

test('UI has expected font size', t => {
  const unmount = mount(<UI />);
  let el = document.querySelector('p');
  t.ok(el);
  defer(() => {
    const css = [getComputedStyle(el)].map(i => ::i.getPropertyValue)[0];
    t.equals(css('font-size'), '16px', 'font matches default CSS');
    t.end();
  });
});
