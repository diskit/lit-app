import { LitElement, html, css, customElement, property } from 'lit-element';

@customElement("app-menu")
export class AppMenu extends LitElement {

  render() {
    return html`
      <app-navigator href="/">Home</app-navigator>
      <app-navigator href="/info">Info</app-navigator>
      <app-navigator href="/info?data=12345">Info?data=12345</app-navigator>
      <app-navigator href="/user/14">user/14</app-navigator>
    `;
  }
}