import {  html, LitElement } from "lit";
import { customElement, property } from 'lit/decorators.js';

@customElement("app-navigator")
export class AppNavigator extends LitElement {

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
    this.navigate()
  }

  private navigate() {
    history.pushState(null, '', this.href)
    window.dispatchEvent(new CustomEvent('navigate', { detail: { next : this.href}}))
  }
}