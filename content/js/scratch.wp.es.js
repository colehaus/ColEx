import { props, withComponent } from 'skatejs';
import withReact from '@skatejs/renderer-react';
import React from 'react';

class WithReact extends withComponent(withReact()) {
  static get props() {
    return {
      name: props.string
    };
  }
  render({ name }) {
    return <span>Jello, {name}!</span>;
  }
}

customElements.define('with-react', WithReact);
