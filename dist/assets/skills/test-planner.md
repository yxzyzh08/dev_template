---
name: test-planner
description: 设计和执行测试策略，包括测试计划、测试用例设计、单元测试、集成测试、E2E测试。支持TDD开发流程。
---

# 测试规划师 (Test Planner)

## Purpose
设计全面的测试策略，生成测试用例，指导测试实现。支持测试驱动开发(TDD)，确保代码质量和系统可靠性。

## When to Use
- 用户说 "写测试"、"测试计划"、"TDD"、"测试用例"
- 开发新功能前设计测试
- 需要提高测试覆盖率
- Bug修复需要回归测试
- 性能测试和压力测试规划

---

## 输入契约 (来自上游 Skills)

**必须读取 - 需求文档**:
```
docs/modules/{模块}/
├── 03-核心流程.md     → 提取: 业务流程 → 功能测试用例
└── 05-验收标准.md     → 提取: 验收条件 → 测试断言
                         NFR指标 → 性能测试基准
```

**必须读取 - 架构文档**:
```
docs/architecture/
├── 04-数据模型.md     → 提取: 实体关系 → 数据Mock
└── 05-API设计.md      → 提取: API契约 → 集成测试用例
```

**必须读取 - 源代码**:
```
src/
├── modules/{模块}/    → 提取: 待测代码
└── **/*.spec.ts       → 提取: 现有测试覆盖
```

**从验收标准提取测试目标**:
```markdown
| 验收标准类型 | 测试类型 | 示例 |
|------------|---------|------|
| Given-When-Then | 功能测试 | 用户下单成功 → TC-001 |
| 性能NFR | 性能测试 | 响应<2秒 → 压测基准 |
| 安全NFR | 安全测试 | 权限校验 → 权限矩阵测试 |
| 边界条件 | 边界测试 | 数量限制 → TC-B01~B07 |
```

---

## Instructions

### Core Workflow (测试流程)

```
1. 测试策略 → 确定测试范围和方法
2. 用例设计 → 设计测试用例（正常/边界/异常）
3. 测试实现 → 编写测试代码
4. 执行验证 → 运行测试并分析结果
5. 覆盖分析 → 检查覆盖率并补充
```

### 🔧 进度跟踪机制

**重要**: 在执行测试规划和实现过程中，必须维护 `docs/trackers/04-testing.md` 文件，记录详细计划和执行进度。

**tracker文档结构**:
```markdown
# 测试验证阶段跟踪

## 阶段信息
- **状态**: 🔄 进行中 / ✅ 已完成 / ⏳ 等待中
- **负责人**: Test Planner Skill
- **开始时间**: YYYY-MM-DD
- **最后更新**: YYYY-MM-DD HH:MM

## 进度概览
- **总体进度**: X%
- **单元测试覆盖率**: X%
- **集成测试覆盖率**: X%
- **E2E测试覆盖率**: X%
- **当前重点**: {当前测试模块}

## 测试计划
- [ ] 单元测试 (Unit Tests) - 目标覆盖率>80%
- [ ] 集成测试 (Integration Tests) - 核心流程100%
- [ ] 端到端测试 (E2E Tests) - 关键路径100%
- [ ] 用户验收测试 (UAT) - 所有验收标准通过

## 详细任务跟踪

### 1. 测试策略设计
- [ ] 测试范围定义
- [ ] 测试工具选型
- [ ] 覆盖率目标设定

### 2. 单元测试 (模块级)
- [ ] 模块1单元测试
  - [ ] Service层测试
  - [ ] Controller层测试
  - [ ] Repository层测试
- [ ] 模块2单元测试
...

### 3. 集成测试
- [ ] API接口测试
- [ ] 数据库集成测试
- [ ] 第三方服务集成测试

### 4. E2E测试
- [ ] 核心流程1 E2E测试
- [ ] 核心流程2 E2E测试
...

### 5. 覆盖率分析
- [ ] 单元测试覆盖率报告
- [ ] 集成测试覆盖率报告
- [ ] 未覆盖代码分析
- [ ] 补充测试用例

## 测试用例统计
| 类型 | 设计数 | 实现数 | 通过数 | 失败数 |
|------|--------|--------|--------|--------|
| 单元测试 | 0 | 0 | 0 | 0 |
| 集成测试 | 0 | 0 | 0 | 0 |
| E2E测试 | 0 | 0 | 0 | 0 |
| **总计** | 0 | 0 | 0 | 0 |

## 待办事项
- [ ] 当前待办1
- [ ] 当前待办2
```

**更新时机**:
1. **策略设计时**: 更新"测试计划"和"详细任务跟踪"
2. **每编写一个测试**: 勾选对应任务，更新"测试用例统计"
3. **每次测试运行**: 更新"测试用例统计"中的通过/失败数
4. **覆盖率分析后**: 更新"进度概览"中的覆盖率百分比
5. **发现缺陷时**: 在"待办事项"中记录需要修复的问题

---

### 测试金字塔

```
                    ┌─────────┐
                    │  E2E    │  ← 10% (慢/脆弱/贵)
                   ─┴─────────┴─
                 ┌───────────────┐
                 │  Integration  │  ← 20% (中等)
               ──┴───────────────┴──
            ┌───────────────────────┐
            │      Unit Tests       │  ← 70% (快/稳定/便宜)
          ──┴───────────────────────┴──
```

### Detailed Steps

#### 阶段1: 测试策略设计

**⚠️ 执行前**: 初始化 `docs/trackers/04-testing.md`
**⚠️ 执行后**: 将测试策略写入tracker的"测试计划"章节

**测试类型选择矩阵**:

| 测试类型 | 目标 | 工具 | 覆盖率目标 |
|---------|------|------|-----------|
| 单元测试 | 函数/类逻辑 | Jest/Vitest | >80% |
| 集成测试 | 模块交互 | Jest + Supertest | 核心流程100% |
| E2E测试 | 用户场景 | Playwright/Cypress | 关键路径100% |
| 性能测试 | 响应时间/QPS | k6/Artillery | 根据SLA |
| 安全测试 | 漏洞检测 | OWASP ZAP | 关键接口100% |

**测试范围定义**:
```markdown
## 测试范围

### 必须测试 (Must Test)
- [ ] 核心业务逻辑
- [ ] 支付相关功能
- [ ] 权限验证
- [ ] 数据验证

### 应该测试 (Should Test)
- [ ] 边界条件
- [ ] 错误处理
- [ ] 并发场景

### 可以测试 (Could Test)
- [ ] 日志输出
- [ ] 配置加载
- [ ] 工具函数
```

#### 阶段2: 测试用例设计

**⚠️ 执行后**: 将设计的用例数更新到tracker的"测试用例统计"表

**用例设计方法**:

| 方法 | 适用场景 | 示例 |
|------|---------|------|
| 等价类划分 | 输入值分组 | 年龄: <0, 0-17, 18-120, >120 |
| 边界值分析 | 临界点测试 | 年龄: -1, 0, 17, 18, 120, 121 |
| 决策表 | 多条件组合 | 权限×状态×角色 |
| 状态转换 | 状态机测试 | 订单状态流转 |
| 错误推测 | 经验驱动 | 空值、超时、并发 |

**测试用例模板**:
```markdown
## 测试用例: {功能名称}

### TC-001: {用例名称}

**前置条件**:
- 用户已登录
- 购物车中有商品

**测试步骤**:
1. 点击"结算"按钮
2. 选择收货地址
3. 选择支付方式
4. 点击"提交订单"

**预期结果**:
- 订单创建成功
- 返回订单号
- 跳转到支付页面

**测试数据**:
| 字段 | 值 |
|------|-----|
| 商品ID | prod_001 |
| 数量 | 2 |
| 地址ID | addr_001 |

**优先级**: P0
**类型**: 正常流程
```

**边界条件用例设计**:
```markdown
### 边界条件测试用例

| 用例ID | 场景 | 输入 | 预期结果 |
|--------|------|------|---------|
| TC-B01 | 最小数量 | quantity=1 | 成功 |
| TC-B02 | 最大数量 | quantity=99 | 成功 |
| TC-B03 | 超出最大 | quantity=100 | 错误: 超出限制 |
| TC-B04 | 零数量 | quantity=0 | 错误: 数量必须>0 |
| TC-B05 | 负数 | quantity=-1 | 错误: 数量必须>0 |
| TC-B06 | 非整数 | quantity=1.5 | 错误: 必须为整数 |
| TC-B07 | 空值 | quantity=null | 错误: 数量必填 |
```

#### 阶段3: 测试实现

**⚠️ 执行中**:
- 每实现一个测试，勾选tracker中对应任务
- 更新"测试用例统计"中的"实现数"

**单元测试模板 (Jest)**:
```typescript
// order.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { ProductService } from '../product/product.service';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepo: jest.Mocked<OrderRepository>;
  let productService: jest.Mocked<ProductService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findByIds: jest.fn(),
            decrementStock: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepo = module.get(OrderRepository);
    productService = module.get(ProductService);
  });

  describe('createOrder', () => {
    const userId = 'user_001';
    const items = [{ productId: 'prod_001', quantity: 2 }];

    it('should create order successfully', async () => {
      // Arrange
      const product = { id: 'prod_001', price: 100, stock: 10 };
      productService.findByIds.mockResolvedValue([product]);
      orderRepo.create.mockResolvedValue({
        id: 'order_001',
        userId,
        total: 200,
        status: 'pending',
      });

      // Act
      const result = await service.createOrder(userId, items);

      // Assert
      expect(result.id).toBe('order_001');
      expect(result.total).toBe(200);
      expect(productService.decrementStock).toHaveBeenCalledWith('prod_001', 2);
    });

    it('should throw error when stock insufficient', async () => {
      // Arrange
      const product = { id: 'prod_001', price: 100, stock: 1 };
      productService.findByIds.mockResolvedValue([product]);

      // Act & Assert
      await expect(service.createOrder(userId, items))
        .rejects
        .toThrow('库存不足');
    });

    it('should throw error when product not found', async () => {
      // Arrange
      productService.findByIds.mockResolvedValue([]);

      // Act & Assert
      await expect(service.createOrder(userId, items))
        .rejects
        .toThrow('商品不存在');
    });
  });
});
```

**集成测试模板**:
```typescript
// order.integration.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { setupTestDatabase, teardownTestDatabase } from './test-utils';

describe('Order API (Integration)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    await setupTestDatabase();

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    // 获取测试用token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test123' });
    authToken = loginRes.body.token;
  });

  afterAll(async () => {
    await teardownTestDatabase();
    await app.close();
  });

  describe('POST /orders', () => {
    it('should create order with valid data', async () => {
      const response = await request(app.getHttpServer())
        .post('/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          items: [{ productId: 'prod_001', quantity: 2 }],
          addressId: 'addr_001',
        })
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        status: 'pending',
        total: expect.any(Number),
      });
    });

    it('should return 401 without auth token', async () => {
      await request(app.getHttpServer())
        .post('/orders')
        .send({ items: [] })
        .expect(401);
    });

    it('should return 400 with invalid data', async () => {
      await request(app.getHttpServer())
        .post('/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ items: [] })
        .expect(400);
    });
  });
});
```

**E2E测试模板 (Playwright)**:
```typescript
// order.e2e.spec.ts
import { test, expect } from '@playwright/test';

test.describe('订单流程', () => {
  test.beforeEach(async ({ page }) => {
    // 登录
    await page.goto('/login');
    await page.fill('[data-testid="username"]', 'testuser');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-btn"]');
    await expect(page).toHaveURL('/home');
  });

  test('完整下单流程', async ({ page }) => {
    // 1. 选择商品
    await page.goto('/products');
    await page.click('[data-testid="product-001"]');
    await page.click('[data-testid="add-to-cart"]');

    // 2. 进入购物车
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

    // 3. 结算
    await page.click('[data-testid="checkout-btn"]');

    // 4. 选择地址
    await page.click('[data-testid="address-001"]');

    // 5. 提交订单
    await page.click('[data-testid="submit-order"]');

    // 6. 验证结果
    await expect(page).toHaveURL(/\/orders\/\w+/);
    await expect(page.locator('[data-testid="order-status"]')).toHaveText('待支付');
  });

  test('库存不足提示', async ({ page }) => {
    await page.goto('/products/out-of-stock');
    await page.click('[data-testid="add-to-cart"]');

    await expect(page.locator('[data-testid="error-toast"]'))
      .toHaveText('库存不足');
  });
});
```

#### 阶段4: 执行验证

**⚠️ 执行后**:
- 运行测试后，更新"测试用例统计"中的"通过数"和"失败数"
- 如有失败用例，在"待办事项"中记录

#### 阶段4a: TDD流程 (可选)

**TDD三步循环**:
```
┌─────────────────────────────────────────┐
│                                         │
│   🔴 Red → 🟢 Green → 🔵 Refactor      │
│      ↑                    │             │
│      └────────────────────┘             │
│                                         │
└─────────────────────────────────────────┘

1. Red: 先写一个失败的测试
2. Green: 写最少代码让测试通过
3. Refactor: 重构代码，保持测试通过
```

**TDD示例**:
```typescript
// Step 1: Red - 写失败测试
describe('calculateDiscount', () => {
  it('should apply 10% discount for orders over 100', () => {
    expect(calculateDiscount(100)).toBe(10);
  });
});

// 运行测试 → ❌ 失败 (函数不存在)

// Step 2: Green - 最小实现
function calculateDiscount(total: number): number {
  if (total >= 100) {
    return total * 0.1;
  }
  return 0;
}

// 运行测试 → ✅ 通过

// Step 3: Refactor - 重构
const DISCOUNT_THRESHOLD = 100;
const DISCOUNT_RATE = 0.1;

function calculateDiscount(total: number): number {
  return total >= DISCOUNT_THRESHOLD ? total * DISCOUNT_RATE : 0;
}

// 运行测试 → ✅ 仍然通过
```

#### 阶段5: 覆盖率分析

**⚠️ 执行后**:
- 更新tracker"进度概览"中的覆盖率百分比
- 将未覆盖代码分析结果写入"待办事项"
- 如果达到目标覆盖率且所有测试通过,更新"阶段信息"状态为"✅ 已完成"

**覆盖率指标**:
| 指标 | 说明 | 目标 |
|------|------|------|
| 行覆盖率 | 执行的代码行 | >80% |
| 分支覆盖率 | 执行的条件分支 | >70% |
| 函数覆盖率 | 调用的函数 | >90% |
| 语句覆盖率 | 执行的语句 | >80% |

**Jest覆盖率配置**:
```json
// jest.config.js
{
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "coverageReporters": ["text", "lcov", "html"],
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  },
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!src/**/*.spec.ts",
    "!src/**/*.module.ts",
    "!src/main.ts"
  ]
}
```

**覆盖率报告分析**:
```markdown
## 覆盖率报告分析

### 概览
- 行覆盖率: 85% ✅
- 分支覆盖率: 72% ✅
- 函数覆盖率: 92% ✅

### 未覆盖代码

| 文件 | 行号 | 原因 | 优先级 |
|------|------|------|--------|
| order.service.ts | 45-50 | 异常处理分支 | P1 |
| payment.service.ts | 78-82 | 第三方回调 | P2 |
| utils/logger.ts | 12-20 | 日志工具 | P3 |

### 补充测试计划

1. **order.service.ts:45-50** - 添加库存不足异常测试
2. **payment.service.ts:78-82** - Mock支付回调测试
```

## Examples

### Example 1: 为订单模块设计测试

**Input:**
```
为订单创建功能设计测试用例
```

**Output:**
```markdown
## 订单创建测试用例设计

### 测试范围
- 正常创建订单
- 库存验证
- 价格计算
- 权限检查
- 并发处理

### 测试用例

#### 正常流程

| ID | 场景 | 输入 | 预期 |
|----|------|------|------|
| TC-001 | 单商品下单 | 1个商品x1件 | 订单创建成功 |
| TC-002 | 多商品下单 | 3个商品 | 订单创建成功 |
| TC-003 | 最大数量 | 99件 | 订单创建成功 |

#### 边界条件

| ID | 场景 | 输入 | 预期 |
|----|------|------|------|
| TC-B01 | 数量为0 | quantity=0 | 错误: 数量必须>0 |
| TC-B02 | 超出库存 | quantity>stock | 错误: 库存不足 |
| TC-B03 | 商品不存在 | productId=xxx | 错误: 商品不存在 |
| TC-B04 | 商品已下架 | status=offline | 错误: 商品已下架 |

#### 异常场景

| ID | 场景 | 预期 |
|----|------|------|
| TC-E01 | 未登录 | 401 Unauthorized |
| TC-E02 | 无收货地址 | 错误: 请先添加地址 |
| TC-E03 | 数据库超时 | 500 + 重试机制 |

#### 并发场景

| ID | 场景 | 预期 |
|----|------|------|
| TC-C01 | 同时抢购最后1件 | 只有1人成功 |
| TC-C02 | 重复提交 | 幂等，只创建1单 |

### 测试代码

```typescript
describe('OrderService.createOrder', () => {
  // 正常流程
  describe('Happy Path', () => {
    it('TC-001: 单商品下单成功', async () => {
      const result = await service.createOrder(userId, [
        { productId: 'prod_001', quantity: 1 }
      ]);
      expect(result.status).toBe('pending');
      expect(result.items).toHaveLength(1);
    });
  });

  // 边界条件
  describe('Boundary Conditions', () => {
    it('TC-B01: 数量为0应报错', async () => {
      await expect(service.createOrder(userId, [
        { productId: 'prod_001', quantity: 0 }
      ])).rejects.toThrow('数量必须大于0');
    });

    it('TC-B02: 超出库存应报错', async () => {
      await expect(service.createOrder(userId, [
        { productId: 'prod_001', quantity: 999 }
      ])).rejects.toThrow('库存不足');
    });
  });

  // 并发测试
  describe('Concurrency', () => {
    it('TC-C01: 并发抢购只有一人成功', async () => {
      // 设置库存为1
      await productRepo.update('prod_001', { stock: 1 });

      // 并发创建订单
      const promises = Array(10).fill(null).map(() =>
        service.createOrder(userId, [{ productId: 'prod_001', quantity: 1 }])
      );

      const results = await Promise.allSettled(promises);
      const successes = results.filter(r => r.status === 'fulfilled');
      expect(successes).toHaveLength(1);
    });
  });
});
```
```

### Example 2: 生成测试报告

**Input:**
```
分析当前测试覆盖率并给出改进建议
```

**Output:**
```markdown
## 测试覆盖率分析报告

### 当前状态

```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   78.5  |   65.2   |   85.0  |   78.5  |
 order/             |   82.3  |   70.1   |   90.0  |   82.3  |
  order.service.ts  |   85.0  |   72.0   |   92.0  |   85.0  |
  order.controller  |   80.0  |   68.0   |   88.0  |   80.0  |
 payment/           |   65.0  |   52.0   |   75.0  |   65.0  |
  payment.service   |   60.0  |   48.0   |   70.0  |   60.0  |
--------------------|---------|----------|---------|---------|
```

### 问题分析

#### 🔴 低覆盖模块

**payment.service.ts (60%)**
- 未测试: 支付回调处理
- 未测试: 退款流程
- 未测试: 异常重试逻辑

#### 🟡 分支覆盖不足

| 文件 | 未覆盖分支 | 原因 |
|------|-----------|------|
| order.service:45 | else分支 | 异常场景未测试 |
| payment.service:78 | catch块 | 未模拟异常 |

### 改进计划

#### 优先级P0 (本周完成)
1. 添加支付回调单元测试
2. 添加退款流程测试
3. 补充异常处理测试

#### 优先级P1 (下周完成)
1. 添加并发场景测试
2. 增加集成测试覆盖

### 预期改进

| 指标 | 当前 | 目标 | 差距 |
|------|------|------|------|
| 行覆盖率 | 78.5% | 85% | +6.5% |
| 分支覆盖率 | 65.2% | 75% | +9.8% |
| 函数覆盖率 | 85.0% | 90% | +5% |
```

## Best Practices

### 测试原则
1. **FIRST原则**: Fast, Independent, Repeatable, Self-validating, Timely
2. **AAA模式**: Arrange, Act, Assert
3. **一个测试一个断言**: 聚焦单一行为
4. **测试隔离**: 测试间互不影响

### 命名规范
```
describe('被测对象')
  describe('方法名')
    it('should + 预期行为 + when + 条件')

// 示例
describe('OrderService')
  describe('createOrder')
    it('should create order successfully when stock is sufficient')
    it('should throw error when stock is insufficient')
```

### Mock策略
| 场景 | 策略 |
|------|------|
| 数据库 | 使用测试数据库或内存数据库 |
| 外部API | 使用Mock服务器或jest.mock |
| 时间 | 使用jest.useFakeTimers |
| 随机数 | 固定seed或mock |

## Quality Checklist

测试完成后验证：

| 检查项 | 验证方式 | 状态 |
|--------|---------|------|
| 覆盖率达标 | >80% | ✅/❌ |
| 核心流程100% | 关键路径全覆盖 | ✅/❌ |
| 边界条件覆盖 | 至少5种边界 | ✅/❌ |
| 异常场景覆盖 | 错误处理测试 | ✅/❌ |
| 测试独立性 | 可单独运行 | ✅/❌ |
| CI集成 | 自动运行 | ✅/❌ |

---

**Skill Type**: 测试规划
**Complexity**: Medium-High
**Version**: 1.0
**Created**: 2025-12-09
