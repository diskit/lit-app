import { LitElement, html, css, customElement, property } from 'lit-element';
import { outlet } from 'lit-element-router';

@customElement("app-content")
export class AppContent extends outlet(LitElement) {

  render() {
    return html`
      <slot></slot>
    `;
  }
}