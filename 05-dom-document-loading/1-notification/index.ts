import { createElement } from "../../shared/utils/create-element";

type NotificationType = 'success' | 'error';

interface Options {
  duration?: number;
  type?: NotificationType;
}

export default class NotificationMessage {
  static activeNotification: NotificationMessage | null;
  element: HTMLElement;
  message: string;
  type: NotificationType;
  duration: number;
  timeoutId: number | null;

  constructor(message: string, { duration = 2000, type = 'success' }: Options = {}) {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }
    NotificationMessage.activeNotification = this;

    this.message = message;
    this.type = type;
    this.duration = duration;
    this.timeoutId = null;

    this.element = createElement(this.template());
  }

  private template() {
    return `
    <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`
  }

  show(target?: HTMLElement) {
    if (!this.element) return;

    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (target) {
      target.insertAdjacentElement('afterbegin', this.element);
    } else {
      document.body.append(this.element);
    }

    NotificationMessage.activeNotification = this;

    this.timeoutId = setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();

    if (NotificationMessage.activeNotification === this) {
      NotificationMessage.activeNotification = null;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
