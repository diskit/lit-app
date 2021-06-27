import { LitElement, html, css, customElement, property } from 'lit-element';

@customElement("app-header")
export class AppHeader extends LitElement {

  render() {
    return html`
      <div>header</div>
    `;
  }
}