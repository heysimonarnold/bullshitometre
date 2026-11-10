import "./style.css";

const absoluteBasePath = new URL(
  import.meta.env.BASE_URL,
  window.location.origin,
).href;

class App {
  constructor() {
    this.range = document.querySelector("input[type='range']");
    this.value = this.getRouteValue();
    this.range.value = this.value;

    this.init();
    this.bindEvents();
  }

  init() {
    this.updateRotation(this.value);
  }

  bindEvents() {
    this.range.addEventListener("input", (event) => {
      this.updateRotation(event.target.value);
    });
  }

  getRouteValue() {
    const base = import.meta.env.BASE_URL;
    const pathname = window.location.pathname;

    if (!pathname.startsWith(base)) return 0;

    const route = pathname.slice(base.length);
    const match = route.match(/^(\d+)\/?$/);

    if (!match) return 0;

    const value = Number(match[1]);

    return Math.min(100, Math.max(0, value));
  }

  updateRotation(value) {
    document.documentElement.style.setProperty(
      "--rotation",
      (value / 100) * 180 + "deg",
    );

    window.history.replaceState(
      {},
      `Niveau de bullshit: ${value}%`,
      `${absoluteBasePath}${value}`,
    );
  }
}

new App();
