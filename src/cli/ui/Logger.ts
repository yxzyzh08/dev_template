/**
 * 日志输出工具
 */

import chalk from 'chalk';

export class Logger {
  /**
   * 成功消息（绿色）
   */
  success(message: string): void {
    console.log(chalk.green(`✅ ${message}`));
  }

  /**
   * 错误消息（红色）
   */
  error(message: string | Error): void {
    const msg = message instanceof Error ? message.message : message;
    console.error(chalk.red(`❌ ${msg}`));
  }

  /**
   * 警告消息（黄色）
   */
  warn(message: string): void {
    console.warn(chalk.yellow(`⚠️  ${message}`));
  }

  /**
   * 信息消息（蓝色）
   */
  info(message: string): void {
    console.log(chalk.blue(`ℹ️  ${message}`));
  }

  /**
   * 普通日志
   */
  log(message: string): void {
    console.log(message);
  }

  /**
   * 标题
   */
  title(message: string): void {
    console.log(chalk.bold.cyan(`\n${message}\n`));
  }

  /**
   * 分隔线
   */
  divider(): void {
    console.log(chalk.gray('─'.repeat(50)));
  }
}
