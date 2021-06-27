import { customElement, html, LitElement, property } from "lit-element";
import { navigator } from "lit-element-router";

@customElement("app-navigator")
export class AppNavigator extends navigator(LitElement) {

  @property() href: string = '';

  render() {
    return html`
      <a href="${this.href}" @click="${this.linkClick}">
        <slot></slot>
      </a>
    `;
  }

  linkClick(event: MouseEvent) {
    event.preventDefault();
    this.navigate(this.href);
  }
}