import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement("app-header")
export class AppHeader extends LitElement {

  @property() title = '';

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        padding: 0 16px;
        background: var(--header-color, #999);
        color: var(--header-text-color, #333);
      }
    `;
  }

  render() {
    return html`
      <div>${this.title}</div>
    `;
  }
}