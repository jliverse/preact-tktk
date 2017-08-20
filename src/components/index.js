import { h, Component } from 'preact';

import DebugLoremIpsum from './debug-lorem-ipsum';

export default class extends Component {
  render({ ...props }) {
    return <DebugLoremIpsum />;
  }
}
