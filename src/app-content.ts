import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MatchingResult, Router, Routes } from './router/router';

@customElement("app-content")
export class AppContent extends LitElement {

  @property({attribute: false})
  routes: Router = new Router([])

  connectedCallback() {
    super.connectedCallback();
    this.initHashMode();
  }

  private initHistoryMode() {
    window.addEventListener('navigate', (e: Event) => {
      const event = e as CustomEvent;
      this.onNavigate(event.detail)
    });

    window.addEventListener('popstate', () => {
      this.switchContent(location.pathname);
    });
    setTimeout(()=> this.switchContent(location.pathname), 0);
  }

  private initHashMode() {
    window.addEventListener('hashchange', () => this.switchContent(location.hash.substr(1)));
    setTimeout(() => this.switchContent(location.hash.substr(1)), 0);
  }

  private onNavigate(data: {next: string}) {
    this.switchContent(data.next);
  }

  private switchContent(c: string) {
    Array.from(this.shadowRoot?.children || []).forEach((v: Node) => v.parentNode?.removeChild(v) )
    const {component, parameter} = this.next(c);
    const element = document.createElement(component);
    Object.entries(parameter).forEach((entry) => element.setAttribute(entry[0], entry[1]))
    this.shadowRoot?.appendChild(element);
  }

  private next(target: string): MatchingResult {
    return this.routes.next(target);
  }
}