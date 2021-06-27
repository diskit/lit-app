import { LitElement, html, css, customElement, property } from 'lit-element';
import { router } from 'lit-element-router';

@customElement('app-root')
export class AppRoot extends router(LitElement) {

  static get styles() {
    return css`
    `;
  }

  @property() route: string = ''
  @property() params: Object = {}
  @property() query: Object = {}
  @property() data: Object = {}

  static get routes() {
    return [
      {
        name: "home",
        pattern: "",
        data: { title: "Home" }
      },
      {
        name: "info",
        pattern: "info"
      },
      {
        name: "user",
        pattern: "user/:id"
      },
      {
        name: "default",
        pattern: "*"
      }
    ];
  }

  constructor() {
    super();
    this.route = '';
    this.query = {};
    this.params = {};
    this.data = {};
  }

  router(route: string | undefined, params: Object, query: Object, data: Object) {
    this.route = route || '';
    this.params = params;
    this.query = query;
    this.data = data;
    console.log(route, params, query, data);
  }

  render() {
    return html`
      <app-header></app-header>
      <div>
        <app-menu></app-menu>
        <app-content active-route="${this.route}">
          <div route="home">aa</div>
          <div route="info">bb</div>
          <div route="user">cc</div>
          <div route="default">default</div>
        </app-content>
      </div>
    `;
  }
}
