import { h, render } from 'preact';

import './css';

let root = document.getElementById('root');
function init() {
  let App = require('./components/index').default;
  const el = root || document.body.firstElementChild;
  root = render(<App />, el.parentNode, root);
}
document.addEventListener('DOMContentLoaded', init);

if (module.hot) {
  module.hot.accept('./components/index', () => requestAnimationFrame(init));
}
