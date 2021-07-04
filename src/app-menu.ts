import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement("app-menu")
export class AppMenu extends LitElement {

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px 16px;
      }
    `;
  }

  render() {
    return html`
      <app-navigator href="/">Home</app-navigator>
      <app-navigator href="/user/1111">user</app-navigator>
      <app-navigator href="/xxxx">missing link(redirect home)</app-navigator>
    `;
  }
}