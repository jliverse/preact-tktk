import partialRight from 'lodash/partialRight';
import { h, render } from 'preact';
import { render as renderAsHTML } from 'preact-render-to-string';

// Provide a way to mount and unmount the component for tests.
//////////////////////////////////////////////////////////////////////////////
export function mount(component) {
  // const root = render(<UI />, document.body); // Mount
  const root = render(
    component,
    document.body,
    document.body.firstElementChild
  );
  // render('', document.body, root); // Unmount
  return () => {
    render('', document.body, root);
  };
}

// Avoid requestAnimationFrame (firing when offscreen) and setTimeout (performance).
//////////////////////////////////////////////////////////////////////////////
const deferWithPromise = Promise.prototype.then.bind(Promise.resolve());
const defer = partialRight(setTimeout, 0);

export { defer, deferWithPromise, renderAsHTML };
