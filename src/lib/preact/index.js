import { h, render } from 'preact';
import { deep } from 'preact-render-spy';
import { render as renderAsHTML } from 'preact-render-to-string';

export { renderAsHTML };

export function css() {
  return [...arguments].filter(Boolean).join(' ');
}

export function renderAsDocument(component) {
  const root = deep(component);
  return Object.assign(root, {
    findAll: selector => {
      const matches = root.find(selector);
      return [...matches].map((_, i) => matches.at(i));
    }
  });
}
