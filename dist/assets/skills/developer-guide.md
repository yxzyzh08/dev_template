---
name: developer-guide
description: 指导代码实现的开发助手，包括代码生成、重构、代码审查、调试辅助。遵循Clean Code原则和项目编码规范。
---

# 研发开发助手 (Developer Guide)

## Purpose
在架构设计完成后，指导具体的代码实现。包括代码生成、代码审查、重构建议、调试辅助。确保代码质量符合项目规范和最佳实践。

## When to Use
- 用户说 "开始开发"、"写代码"、"实现功能"
- 需要代码生成或代码模板
- 代码审查和重构
- 调试问题排查
- 解释代码逻辑

---

## 输入契约 (来自 architecture-designer)

**启动前必须读取**:
```
docs/architecture/
├── 01-架构概览.md     → 提取: 架构风格、分层结构
├── 02-技术选型.md     → 提取: 技术栈、框架版本
├── 03-模块设计.md     → 提取: 模块职责、接口定义
├── 04-数据模型.md     → 提取: 实体定义、关系
└── 05-API设计.md      → 提取: API契约、请求/响应格式
```

**同时参考需求文档** (v3.2.1 - 必读文档):
```
docs/
├── 01-模块划分.md     → 提取: 模块范围
└── modules/{模块}/
    ├── 03-核心流程.md  → 提取: 业务流程、业务规则、计算公式 ⭐
    ├── 04-原型设计.md  → 提取: 页面结构、交互逻辑、状态设计 ⭐
    └── 05-验收标准.md  → 提取: Given-When-Then验收条件、边界条件 ⭐
```

**为什么这3个文档是开发的核心依据**:
- **03-核心流程.md**: 告诉你**业务怎么运转**（流程图+状态机+计算规则）
- **04-原型设计.md**: 告诉你**UI怎么实现**（页面布局+交互细节+状态变化）
- **05-验收标准.md**: 告诉你**功能做到什么程度算完成**（验收条件+边界case）

**从架构文档提取开发约束**:
```markdown
| 架构决策 | 开发约束 |
|---------|---------|
| Clean Architecture | 分层: Controller → Service → Repository |
| NestJS框架 | 使用模块化结构、装饰器、DI |
| Prisma ORM | 使用schema定义模型、类型安全查询 |
| RESTful API | 遵循05-API设计.md中的接口契约 |
```

---

## Instructions

### Core Workflow (开发流程)

```
1. 任务分解 → 将需求拆分为可执行的开发任务
2. 代码生成 → 生成符合规范的代码骨架
3. 实现指导 → 逐步指导核心逻辑实现
4. 代码审查 → 检查代码质量和安全问题
5. 重构优化 → 持续改进代码质量
```

### 🔧 进度跟踪机制

**重要**: 在执行代码实现过程中，必须维护 `docs/trackers/03-implementation.md` 文件，记录详细计划和执行进度。

**tracker文档结构**:
```markdown
# 代码实现阶段跟踪

## 阶段信息
- **状态**: 🔄 进行中 / ✅ 已完成 / ⏳ 等待中
- **负责人**: Developer Guide Skill
- **开始时间**: YYYY-MM-DD
- **最后更新**: YYYY-MM-DD HH:MM

## 进度概览
- **总体进度**: X%
- **后端进度**: X%
- **前端进度**: X%
- **当前重点**: {当前开发模块}

## 已完成阶段
- ✅ 阶段1: {已完成阶段名称}
- ✅ 阶段2: {已完成阶段名称}

## 详细任务跟踪

### 1. 基础设施 (P0)
- [ ] 项目初始化
- [ ] 数据库环境搭建
- [ ] CI/CD 配置

### 2. {模块1名称} (P0)
#### 服务端
- [ ] 模块1 Service层
- [ ] 模块1 Controller层
- [ ] 模块1 Repository层

#### 客户端
- [ ] 模块1 UI
- [ ] 模块1 ViewModel
- [ ] 模块1 Repository

### 3. {模块2名称} (P0)
...

## 当前开发计划 (由 Developer Guide Skill 生成)

> **生成时间**: YYYY-MM-DD
> **计划优先级**: P0 (核心功能) → P1 (重要功能) → P2 (增值功能)

### 阶段X: {任务名}

| 任务 | 文件 | 预估 | 状态 | 依赖 |
|------|------|------|------|------|
| X.1 任务1 | path/to/file.ts | 1h | ⬜ | 无 |
| X.2 任务2 | path/to/file.ts | 2h | ⬜ | X.1 |

**开发顺序**: X.1 → X.2 → ...

## 开发约束与规范
### 代码规范
- 后端: Clean Architecture, Controller → Service → Repository
- 前端: MVVM, UI → ViewModel → Repository
- 命名: kebab-case / PascalCase / camelCase

### 安全要求
- 敏感操作服务器校验
- 数据加密存储

### 性能要求
- API响应 <1秒
```

**更新时机**:
1. **开发开始时**: 创建开发计划，拆分阶段和任务
2. **每完成一个任务**: 勾选任务checkbox，更新进度百分比
3. **每完成一个阶段**: 将阶段移至"已完成阶段"
4. **遇到问题时**: 在任务备注中记录问题
5. **发现新任务时**: 在对应阶段添加新任务

---

### Detailed Steps

#### 阶段1: 任务分解

**⚠️ 执行前**: 初始化 `docs/trackers/03-implementation.md`
**⚠️ 执行后**: 将任务分解结果写入tracker的"当前开发计划"章节

**任务分解模板**:
```markdown
## 功能: {功能名称}

### 开发任务清单

| 序号 | 任务 | 预估 | 依赖 | 状态 |
|------|------|------|------|------|
| 1 | 创建数据模型 | 30min | - | ⬜ |
| 2 | 实现Repository | 1h | 1 | ⬜ |
| 3 | 实现Service | 2h | 2 | ⬜ |
| 4 | 实现Controller | 1h | 3 | ⬜ |
| 5 | 编写单元测试 | 1h | 3 | ⬜ |
| 6 | 集成测试 | 30min | 4 | ⬜ |

### 开发顺序
1 → 2 → 3 → 5(并行) → 4 → 6
```

**任务拆分原则**:
- 单个任务不超过4小时
- 每个任务有明确的完成标准
- 标注任务间依赖关系
- 测试任务与实现并行

#### 阶段2: 代码生成

**⚠️ 执行中**: 每生成一个文件后，勾选tracker中对应任务的checkbox

**代码模板 - NestJS Module**:
```typescript
// {module}.module.ts
import { Module } from '@nestjs/common';
import { {Module}Controller } from './{module}.controller';
import { {Module}Service } from './{module}.service';
import { {Module}Repository } from './{module}.repository';

@Module({
  controllers: [{Module}Controller],
  providers: [{Module}Service, {Module}Repository],
  exports: [{Module}Service],
})
export class {Module}Module {}
```

**代码模板 - Service层**:
```typescript
// {module}.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { {Module}Repository } from './{module}.repository';
import { Create{Entity}Dto, Update{Entity}Dto } from './dto';
import { {Entity} } from './entities/{entity}.entity';

@Injectable()
export class {Module}Service {
  constructor(private readonly repository: {Module}Repository) {}

  async create(dto: Create{Entity}Dto): Promise<{Entity}> {
    return this.repository.create(dto);
  }

  async findAll(query: QueryDto): Promise<PaginatedResult<{Entity}>> {
    return this.repository.findAll(query);
  }

  async findOne(id: string): Promise<{Entity}> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException(`{Entity} #${id} not found`);
    }
    return entity;
  }

  async update(id: string, dto: Update{Entity}Dto): Promise<{Entity}> {
    await this.findOne(id); // 确保存在
    return this.repository.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // 确保存在
    await this.repository.delete(id);
  }
}
```

**代码模板 - Controller层**:
```typescript
// {module}.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards';
import { {Module}Service } from './{module}.service';
import { Create{Entity}Dto, Update{Entity}Dto, Query{Entity}Dto } from './dto';

@ApiTags('{module}')
@Controller('{module}')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class {Module}Controller {
  constructor(private readonly service: {Module}Service) {}

  @Post()
  @ApiOperation({ summary: '创建{entity}' })
  create(@Body() dto: Create{Entity}Dto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '获取{entity}列表' })
  findAll(@Query() query: Query{Entity}Dto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取{entity}详情' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新{entity}' })
  update(@Param('id') id: string, @Body() dto: Update{Entity}Dto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除{entity}' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
```

#### 阶段3: 实现指导

**⚠️ 执行中**:
- 完成核心逻辑后，勾选对应任务
- 更新tracker的"进度概览"百分比

**代码实现检查清单**:

| 检查项 | 说明 | 示例 |
|--------|------|------|
| 输入验证 | DTO使用class-validator | `@IsString() @MinLength(1)` |
| 错误处理 | 使用自定义异常 | `throw new BusinessException()` |
| 日志记录 | 关键操作记录日志 | `this.logger.log()` |
| 事务处理 | 多表操作使用事务 | `@Transaction()` |
| 权限检查 | 资源所有权验证 | `if (resource.userId !== userId)` |

**命名规范**:
```
文件命名: kebab-case (user-order.service.ts)
类命名: PascalCase (UserOrderService)
方法命名: camelCase (createOrder)
常量命名: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
接口命名: I前缀或不加 (IUserService / UserService)
```

**目录结构规范**:
```
src/
├── modules/
│   └── {module}/
│       ├── dto/
│       │   ├── create-{entity}.dto.ts
│       │   ├── update-{entity}.dto.ts
│       │   └── query-{entity}.dto.ts
│       ├── entities/
│       │   └── {entity}.entity.ts
│       ├── {module}.controller.ts
│       ├── {module}.service.ts
│       ├── {module}.repository.ts
│       ├── {module}.module.ts
│       └── __tests__/
│           ├── {module}.service.spec.ts
│           └── {module}.controller.spec.ts
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
└── config/
```

#### 阶段4: 代码审查

**⚠️ 执行后**: 如发现问题，在tracker的"待办事项"中记录需要修复的问题

**代码审查检查清单**:

**🔴 安全检查 (必须修复)**:
| 问题 | 检查点 | 修复方式 |
|------|--------|---------|
| SQL注入 | 拼接SQL | 使用参数化查询 |
| XSS | 直接输出用户输入 | 转义或使用框架防护 |
| 敏感信息泄露 | 日志打印密码 | 脱敏处理 |
| 权限绕过 | 未验证资源所有权 | 添加权限检查 |
| 硬编码密钥 | 代码中写死密钥 | 使用环境变量 |

**🟡 代码质量 (建议修复)**:
| 问题 | 检查点 | 修复方式 |
|------|--------|---------|
| 函数过长 | >50行 | 拆分为小函数 |
| 重复代码 | 相似代码块 | 提取公共方法 |
| 魔法数字 | 硬编码数字 | 提取为常量 |
| 过深嵌套 | >3层 | 提前return |
| 缺少类型 | any类型 | 定义具体类型 |

**代码审查输出格式**:
```markdown
## 🔍 代码审查报告

### 📊 概览
- 文件: `src/modules/order/order.service.ts`
- 代码行数: 150
- 问题数: 3 (🔴1 🟡2)

### 🔴 必须修复

**[Line 45] SQL注入风险**
```typescript
// ❌ 当前代码
const query = `SELECT * FROM orders WHERE status = '${status}'`;

// ✅ 修复方案
const orders = await this.repository.find({ where: { status } });
```

### 🟡 建议修复

**[Line 78-120] 函数过长**
- 当前: 42行
- 建议: 拆分为 `validateOrder()` 和 `processPayment()`

### ✅ 优点
- 错误处理完善
- 日志记录规范
- 类型定义清晰
```

#### 阶段5: 重构优化

**⚠️ 执行后**:
- 将完成的阶段移至"已完成阶段"
- 如果所有模块完成,更新"阶段信息"状态为"✅ 已完成"

**重构模式**:

| 模式 | 适用场景 | 示例 |
|------|---------|------|
| 提取方法 | 代码块可复用 | 将验证逻辑提取为 `validate()` |
| 提取类 | 类职责过多 | 将订单状态逻辑提取为 `OrderStateMachine` |
| 内联 | 过度封装 | 移除只调用一次的wrapper |
| 重命名 | 名称不表意 | `data` → `orderDetails` |
| 移动 | 位置不合理 | 将工具函数移至 `utils/` |

**重构安全检查**:
```markdown
## 重构检查清单

- [ ] 有单元测试覆盖
- [ ] 重构后测试通过
- [ ] 没有改变外部行为
- [ ] 提交信息清晰描述重构内容
- [ ] 代码审查通过
```

## Examples

### Example 1: 实现用户注册功能

**Input:**
```
实现微信小程序用户登录注册功能
```

**Output:**
```markdown
## 任务分解: 微信登录注册

### 开发任务

| 序号 | 任务 | 文件 | 预估 |
|------|------|------|------|
| 1 | 创建User实体 | `user.entity.ts` | 15min |
| 2 | 创建DTO | `dto/*.ts` | 20min |
| 3 | 实现微信登录 | `auth.service.ts` | 1h |
| 4 | 实现JWT签发 | `auth.service.ts` | 30min |
| 5 | 实现Controller | `auth.controller.ts` | 30min |
| 6 | 编写测试 | `auth.service.spec.ts` | 1h |

### 核心代码

#### 1. User实体
```typescript
// src/modules/user/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  openid: string;

  @Column({ nullable: true })
  unionid: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

#### 2. 微信登录Service
```typescript
// src/modules/auth/auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async wxLogin(code: string): Promise<LoginResult> {
    // 1. 调用微信接口获取openid
    const wxSession = await this.getWxSession(code);

    // 2. 查找或创建用户
    let user = await this.userService.findByOpenid(wxSession.openid);
    if (!user) {
      user = await this.userService.create({
        openid: wxSession.openid,
        unionid: wxSession.unionid,
      });
    }

    // 3. 生成JWT
    const token = this.generateToken(user);

    return {
      token,
      user: this.sanitizeUser(user),
      isNewUser: !user.nickname,
    };
  }

  private async getWxSession(code: string): Promise<WxSession> {
    const url = 'https://api.weixin.qq.com/sns/jscode2session';
    const params = {
      appid: this.configService.get('WX_APPID'),
      secret: this.configService.get('WX_SECRET'),
      js_code: code,
      grant_type: 'authorization_code',
    };

    const { data } = await firstValueFrom(
      this.httpService.get(url, { params }),
    );

    if (data.errcode) {
      throw new WxAuthException(data.errmsg);
    }

    return data;
  }

  private generateToken(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      openid: user.openid,
    });
  }
}
```

#### 3. Controller
```typescript
// src/modules/auth/auth.controller.ts
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('wx-login')
  @ApiOperation({ summary: '微信小程序登录' })
  async wxLogin(@Body() dto: WxLoginDto) {
    return this.authService.wxLogin(dto.code);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取当前用户信息' })
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
```
```

### Example 2: 代码审查

**Input:**
```typescript
async createOrder(userId: string, items: any[]) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const product = await this.productRepo.findOne(items[i].productId);
    if (product.stock < items[i].quantity) {
      throw new Error('库存不足');
    }
    total = total + product.price * items[i].quantity;
  }
  const order = await this.orderRepo.save({
    userId,
    items,
    total,
    status: 'pending'
  });
  for (let i = 0; i < items.length; i++) {
    await this.productRepo.update(items[i].productId, {
      stock: () => `stock - ${items[i].quantity}`
    });
  }
  return order;
}
```

**Output:**
```markdown
## 🔍 代码审查报告

### 🔴 必须修复

**1. [Line 11] SQL注入风险**
```typescript
// ❌ 当前
stock: () => `stock - ${items[i].quantity}`

// ✅ 修复
await this.productRepo.decrement({ id: item.productId }, 'stock', item.quantity);
```

**2. [全局] 缺少事务**
- 问题: 订单创建和库存扣减不在同一事务
- 风险: 创建订单成功但库存扣减失败导致数据不一致

```typescript
// ✅ 修复
@Transaction()
async createOrder(userId: string, items: OrderItemDto[]) {
  // ... 业务逻辑
}
```

**3. [Line 3] 缺少类型定义**
```typescript
// ❌ 当前
items: any[]

// ✅ 修复
items: CreateOrderItemDto[]
```

### 🟡 建议修复

**4. [Line 4-8] N+1查询问题**
```typescript
// ❌ 当前: 循环内查询
for (let i = 0; i < items.length; i++) {
  const product = await this.productRepo.findOne(items[i].productId);
}

// ✅ 修复: 批量查询
const productIds = items.map(i => i.productId);
const products = await this.productRepo.findByIds(productIds);
const productMap = new Map(products.map(p => [p.id, p]));
```

**5. [Line 4] 使用for...of替代索引遍历**
```typescript
// ✅ 修复
for (const item of items) {
  // ...
}
```

### ✅ 重构后代码

```typescript
@Transaction()
async createOrder(userId: string, items: CreateOrderItemDto[]): Promise<Order> {
  // 1. 批量查询商品
  const productIds = items.map(item => item.productId);
  const products = await this.productRepo.findByIds(productIds);
  const productMap = new Map(products.map(p => [p.id, p]));

  // 2. 验证库存并计算总价
  let total = 0;
  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new NotFoundException(`商品 ${item.productId} 不存在`);
    }
    if (product.stock < item.quantity) {
      throw new BusinessException(`商品 ${product.name} 库存不足`);
    }
    total += product.price * item.quantity;
  }

  // 3. 创建订单
  const order = await this.orderRepo.save({
    userId,
    items,
    total,
    status: OrderStatus.PENDING,
  });

  // 4. 扣减库存
  for (const item of items) {
    await this.productRepo.decrement(
      { id: item.productId },
      'stock',
      item.quantity,
    );
  }

  return order;
}
```
```

## Best Practices

### 代码质量原则
1. **单一职责**: 每个函数/类只做一件事
2. **DRY**: 不重复代码，提取公共逻辑
3. **KISS**: 保持简单，避免过度设计
4. **可读性优先**: 代码是写给人看的

### 性能考虑
1. 避免N+1查询，使用批量操作
2. 大数据量使用分页
3. 合理使用缓存
4. 异步处理非关键路径

### 安全考虑
1. 所有输入都要验证
2. 敏感数据加密存储
3. 使用参数化查询
4. 记录关键操作日志

## Quality Checklist

开发完成后验证：

| 检查项 | 验证方式 | 状态 |
|--------|---------|------|
| 功能正确 | 单元测试通过 | ✅/❌ |
| 类型完整 | 无any类型 | ✅/❌ |
| 错误处理 | 异常有捕获 | ✅/❌ |
| 日志记录 | 关键操作有日志 | ✅/❌ |
| 安全检查 | 无明显漏洞 | ✅/❌ |
| 代码规范 | ESLint通过 | ✅/❌ |

---

**Skill Type**: 研发开发
**Complexity**: Medium-High
**Version**: 1.0
**Created**: 2025-12-09
