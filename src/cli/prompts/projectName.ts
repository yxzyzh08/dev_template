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
  const response = await prompts({
    type: 'text',
    name: 'description',
    message: '请输入项目描述（可选）',
    initial: '',
  });

  return response.description ? response.description.trim() : null;
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
