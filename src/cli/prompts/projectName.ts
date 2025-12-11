/**
 * 项目名称输入提示
 */

import prompts from 'prompts';

/**
 * 提示用户输入项目名称
 */
export async function promptProjectName(defaultName?: string): Promise<string | null> {
  const response = await prompts({
    type: 'text',
    name: 'projectName',
    message: '请输入项目名称',
    initial: defaultName || 'my-project',
    validate: (value: string) => {
      if (!value || value.trim() === '') {
        return '项目名称不能为空';
      }

      const pattern = /^[a-zA-Z0-9-_]+$/;
      if (!pattern.test(value)) {
        return '项目名称只能包含字母、数字、横线和下划线';
      }

      if (value.length > 100) {
        return '项目名称不能超过100个字符';
      }

      return true;
    },
  });

  // 用户取消了输入
  if (!response.projectName) {
    return null;
  }

  return response.projectName.trim();
}

/**
 * 提示用户输入项目描述
 */
export async function promptProjectDescription(): Promise<string | null> {
  console.log('');
  console.log('💡 提示: 如需输入多行文本，建议直接粘贴后按回车（忽略显示重复）');
  console.log('');

  const response = await prompts({
    type: 'text',
    name: 'description',
    message: '请输入项目描述（可选，按回车跳过）',
    initial: '',
  });

  // 用户按 Ctrl+C 取消
  if (response.description === undefined) {
    return null;
  }

  // 清理多余的空白字符和重复内容
  const cleaned = response.description
    ? response.description
        .trim()
        // 移除可能的重复行（粘贴导致的）
        .split('\n')
        .filter((line: string, index: number, array: string[]) => {
          // 如果当前行和下一行完全相同，跳过重复
          return index === array.length - 1 || line !== array[index + 1];
        })
        .join('\n')
        .trim()
    : null;

  return cleaned || null;
}

/**
 * 提示用户输入作者名称
 */
export async function promptAuthor(): Promise<string | null> {
  const response = await prompts({
    type: 'text',
    name: 'author',
    message: '请输入作者名称（可选）',
    initial: '',
  });

  return response.author ? response.author.trim() : null;
}

/**
 * 提示用户确认
 */
export async function promptConfirm(message: string, initial: boolean = true): Promise<boolean> {
  const response = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message,
    initial,
  });

  return response.confirmed ?? false;
}
