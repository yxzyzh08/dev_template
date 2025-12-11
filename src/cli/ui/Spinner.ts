/**
 * 加载动画工具
 */

import ora, { Ora } from 'ora';

export class Spinner {
  private spinner: Ora | null = null;

  /**
   * 开始加载动画
   */
  start(text: string): void {
    this.spinner = ora(text).start();
  }

  /**
   * 成功结束
   */
  succeed(text?: string): void {
    if (this.spinner) {
      this.spinner.succeed(text);
      this.spinner = null;
    }
  }

  /**
   * 失败结束
   */
  fail(text?: string): void {
    if (this.spinner) {
      this.spinner.fail(text);
      this.spinner = null;
    }
  }

  /**
   * 警告结束
   */
  warn(text?: string): void {
    if (this.spinner) {
      this.spinner.warn(text);
      this.spinner = null;
    }
  }

  /**
   * 信息结束
   */
  info(text?: string): void {
    if (this.spinner) {
      this.spinner.info(text);
      this.spinner = null;
    }
  }

  /**
   * 停止动画
   */
  stop(): void {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner = null;
    }
  }

  /**
   * 更新文本
   */
  updateText(text: string): void {
    if (this.spinner) {
      this.spinner.text = text;
    }
  }
}
