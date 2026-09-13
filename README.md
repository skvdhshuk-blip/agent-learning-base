# Agent 原来这么简单

一个面向初学者的中文互动课程网站：从一次工具调用开始，逐步讲清 Agent 的上下文、工具、证据链、Skill、MCP、记忆、验收、异步任务和多 Agent 协作。

在线演示：[Agent 原来这么简单 · 图解入门](https://zpm2icatsjk5m.ok.kimi.link/)

## 内容

课程由 10 个章节组成。每章包含情境故事、选择题、核心解释、常见故障复盘、伪代码、练习和章末问答：

1. 最小 Agent 循环
2. 上下文分层
3. 工具定义与并行
4. 可信联网证据链
5. Skill、Tool 与 MCP
6. 会话状态、长期记忆与知识库
7. 计划、目标与验收
8. 长任务的上下文与任务快照
9. 异步任务状态机与幂等
10. 单 Agent 与多 Agent 协作

首页还提供四张可切换的速查图：上下文工作台、Tool / Skill / MCP、记忆三层和慢任务状态机。

## 技术栈

- React 19 + TypeScript
- Vite 7
- React Router
- Tailwind CSS 3
- Radix UI 与 Lucide 图标

## 本地运行

需要 Node.js 20.19+ 或 22.12+。

```bash
npm ci
npm run dev
```

Vite 会输出本地访问地址，通常是 <http://localhost:5173>。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查并生成生产构建到 `dist/` |
| `npm run lint` | 运行 ESLint |
| `npm run preview` | 本地预览生产构建 |

## 项目结构

```text
src/
├── components/       # 课程页面、代码块和 UI 组件
├── data/             # 十章课程内容与类型定义
├── pages/            # 首页组合
├── sections/         # 首页各个视觉区块和速查图
├── App.tsx           # 路由和课程切换
└── main.tsx          # 应用入口
```

课程正文存放在 `src/data/lessons*.ts`，章节卡片信息在 `src/data/chapters.ts`。更新课程内容时，优先修改这些数据文件；页面组件负责将内容渲染为统一的学习体验。

## 许可

本仓库目前未声明开源许可证。公开可见不等于允许复制、修改或再分发；如需复用，请先取得作者许可。
