import TapConsoleParser from 'tap-console-parser';

import './browser.less';

// Configure a TAP parser for the console to add styling to browser tests.
//////////////////////////////////////////////////////////////////////////////
(() => {
  const logs = [];
  let name;

  const parser = TapConsoleParser()
    .on('assert', data => {
      (data.ok ? console.groupCollapsed : console.group).call(this, name);
      (data.ok ? console.debug : console.warn).apply(this, [data.name, data]);
      console.groupEnd();
    })
    .on('log', log => {
      if (!isTapeText(log)) {
        logs.push(log);
      } else if (logs.length !== 0) {
        console.debug(logs.join('\n'));
        logs.length = 0;
      }
    })
    .on('test', test => (name = test.name))
    .on('complete', data => {
      parser.detach();
      document.documentElement.setAttribute(
        'data-tape-status',
        data.ok ? 'pass' : 'fail'
      );
      console.debug(
        `%cTests: ${data.pass} passed, ${data.total} total`,
        [
          `background: ${data.ok ? 'green' : 'red'}`,
          'color: #fff',
          'padding: 1px 8px'
        ].join(';')
      );
    });

  const isTapeText = string =>
    /^\s*$/.test(string) ||
    /^\s*(not ok|ok)/.test(string) ||
    /^\s+[\.\-]{3}$/.test(string) ||
    /^      Error: /.test(string) ||
    /^          at /.test(string) ||
    /^\#\s/.test(string) ||
    /^\s*(operator|expected|actual|stack):\s/.test(string) ||
    /^[0-9]+\.{2}[0-9]+$/.test(string) ||
    /^TAP version [0-9]+$/.test(string);
})();

// Include (and run) all tests in the __browser__ directories.
//////////////////////////////////////////////////////////////////////////////
const requireAll = fn => fn.keys().forEach(fn);
document.addEventListener('DOMContentLoaded', () => {
  requireAll(require.context('../src/', true, /__browser__\/.+\.(js)$/));
});
