import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("home-content")
export class HomeContent extends LitElement {

  render() {
    return html`
      <div>home</div>
    `;
  }
}
