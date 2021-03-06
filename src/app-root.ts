import { LitElement, html, css } from 'lit';
import {  customElement, property } from 'lit/decorators.js';
import { Router, Routes } from './router/router';

@customElement('app-root')
export class AppRoot extends LitElement {

  static get styles() {
    return css`
      :host {
        display: grid;
        height: 100vh;
        grid-template-rows: 64px 1fr;
        grid-template-columns: 180px 1fr;
      }

      app-header {
        grid-row: 1;
        grid-column: 1 / 2 span;
        --header-color: #333;
        --header-text-color: #efefef;
      }

      app-menu {
        grid-row: 2;
        grid-column: 1;
      }

      app-content {
        grid-row: 2;
        grid-column: 2;
      }
    `;
  }

  private v = new Router([
    {component: 'user-content', pattern: '/user/:id', asDefault: false},
    {component: 'home-content', pattern: '/', asDefault: true}
  ]);

  render() {
    return html`
      <app-header title="lit-app"></app-header>
      <app-menu></app-menu>
      <app-content .routes=${this.v}></app-content>
    `;
  }
}
