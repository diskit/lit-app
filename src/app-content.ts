import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement("app-content")
export class AppContent extends LitElement {

  @property({type: Array})
  routes: RouteConfig[] = []

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('navigate', (e: Event) => {
      const event = e as CustomEvent;
      this.onNavigate(event.detail)
    });

    window.addEventListener('popstate', () => {
      this.switchContent(location.pathname);
    })
    setTimeout(() => this.switchContent(''), 0) 
  }

  private onNavigate(data: {next: string}) {
    this.switchContent(data.next);
  }

  private switchContent(c: string) {
    Array.from(this.shadowRoot?.children || []).forEach((v: Node) => v.parentNode?.removeChild(v) )
    this.shadowRoot?.appendChild(document.createElement(this.next(c)));
  }

  private next(target: string): string {
    const defaultComponent = this.routes.find(v => v.default);
    return (this.routes.find((v) => v.pattern === target) || defaultComponent)?.component || '';
  }
}

export interface RouteConfig {
  component: string,
  pattern: string,
  default?: boolean
}