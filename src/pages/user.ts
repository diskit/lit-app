import { html, LitElement } from "lit";
import { customElement } from 'lit/decorators.js'

@customElement("user-content") 
class UserContent extends LitElement {

  render() {
    return html`
      <div>user</div>
    `;
  }
}