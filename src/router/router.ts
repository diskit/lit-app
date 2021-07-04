export class Router {

  private routes: Routes;

  constructor(config: RouterConfig[]) {
    const asDefault = config.find(v => v.asDefault);
    this.routes = new Routes(config.map(v => Route.of(v)), asDefault && Route.of(asDefault));
  }

  next(path: string): MatchingResult {
    const next = this.routes.match(path)?.asResult(path);
    if (!next) {
      throw new Error('missing next');
    }
    return next;
  }
}

export class Route {

  constructor(readonly component: string, readonly fragments: PathFragment[]) {}

  score(path: string): number {
    const target = this.splitPath(path);
    if (target.length !== this.fragments.length) {
      return 0;
    }
    return target.map((v, i) => this.fragments[i].score(v)).reduce((acc, v) => acc * v, 1);
  }

  asResult(path: string): MatchingResult {
    const target = this.splitPath(path);
    const parameters = this.fragments.map((v, i) => v instanceof DynamicFragment ? { key: v.name, value: target[i]} : undefined)
      .filter(v => !!v)
      .reduce((acc, v) => Object.assign(acc, {[v!.key]: v!.value}), {})
    return {component: this.component, parameter: parameters};
  }

  private splitPath(path: string): string[] {
    return path.split('/').filter(v => v.trim().length > 0);
  }

  static of(config: RouterConfig): Route {
    const fragments = config.pattern.split('/')
      .filter(v => v.trim().length > 0)
      .map(parseFragment);
    return new Route(config.component, fragments);
  }
}

export class Routes {
  constructor(readonly routes: Route[], readonly defaultRoute?: Route) {}

  match(path: string): Route | undefined {
    const matched = this.routes
      .map(v => ({score: v.score(path), route: v }))
      .filter(v => v.score > 0)
      .sort((a, b) => b.score - a.score);
    return matched.length > 0 ? matched[0].route : this.defaultRoute;
  }
}

export interface PathFragment {
  score(path: string): number;
}

function parseFragment(pattern: string): PathFragment {
  return pattern.startsWith(":") 
    ? new DynamicFragment(pattern) 
    : new StaticFragment(pattern);
}

export class StaticFragment implements PathFragment {

  constructor(readonly path: string){}
  score(path: string): number {
    return this.match(path) ? 2 : 0
  }

  match(path: string): boolean {
    return this.path === path;
  }
}

export class DynamicFragment implements PathFragment {
  readonly name: string;

  constructor(readonly path: string){
    this.name = path.substr(1);
  }

  score(path: string): number {
    return 1;
  }
}

export interface RouterConfig {
  component: string,
  pattern: string,
  asDefault: boolean
}

export interface MatchingResult { 
  component: string,
  parameter: {[key:string]: string}
}