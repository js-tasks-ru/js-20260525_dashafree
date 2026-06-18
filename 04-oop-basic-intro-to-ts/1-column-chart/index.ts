import { createElement } from "../../shared/utils/create-element";

interface Options {
  data?: number[];
  label?: string;
  link?: string;
  value?: number;
  formatHeading?: (value: number) => string;
}

export default class ColumnChart {
  element: HTMLElement | null = null;
  data: number[];
  label: string;
  link: string;
  value: number;
  formatHeading: (value: number) => string;
  chartHeight = 50;

  constructor({data, label, link, value, formatHeading }: Options = {}) {
    this.data = data || [];
    this.label = label || '';
    this.link = link || '';
    this.value = value || 0;
    this.formatHeading = formatHeading || ((value) => `${value}`);
    this.element = createElement(this.template());
  }

  template() {
    return `
    <div class="column-chart ${!this.data.length ? 'column-chart_loading' : ''}" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        Total ${this.label}
        ${this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : ''}
      </div>
    <div class="column-chart__container">
      <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
      <div data-element="body" class="column-chart__chart">
        ${this.getColumns(this.data)}
      </div>
    </div>
    </div>
    `;
  }

  update(data: number[]) {
    if (!this.element) return;

    const body = this.element.querySelector('[data-element="body"]');
    if (body) {
      body.innerHTML = this.getColumns(data);
    }
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }

  getColumns(data: number[]) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data.map(item => {
      const percent = (item / maxValue * 100).toFixed(0);
      const value = String(Math.floor(item * scale));
      return `<div style="--value: ${value}" data-tooltip="${percent}%"></div>`;
    }).join('');
  }
}

