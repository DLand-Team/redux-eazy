# Guide-Eazy

Guide-Eazy 是一个用于实现引导教程的强大库，支持动画、异步请求和全局使用，具有极高的灵活性和完美的类型提示。它还支持 JSX 定制，使得创建引导步骤变得简单直观。

## 特性

-   动画支持：为引导步骤添加流畅的动画效果。
-   异步请求：在引导过程中支持异步操作。
-   全局可用：可以在应用的任何地方使用。
-   灵活性：高度可定制，适应不同的需求。
-   类型提示：完美的 TypeScript 支持，提供智能提示。
-   JSX 定制：使用 JSX 自定义引导步骤的渲染。

## 安装

使用 npm 或 yarn 安装：

```
npm install guide-eazy
# 或者
yarn add guide-eazy
```

## 使用示例

以下是一个简单的使用示例，展示了如何使用 Guide-Eazy 创建引导教程：

```
import { GuideCoreProvider } from 'guide-eazy';
import { Card, Typography, Stack, Button } from '@mui/material';
import Iconify from '@iconify/react';

<GuideCoreProvider guideIns={guideIns} steps={{
  showProgress: true,
  steps: [
    {
      id: 'start',
      customPopRender({ api }) {
        return (
          <Card sx={{ position: 'relative', bottom: 50, padding: '12px' }} onClick={() => {
            dpChain('appStore').setMenuOpen(true);
            api.setGuideIndex(1);
          }}>
            <Typography>Welcome to scaling</Typography>
            <Stack direction={'row'} justifyContent={'end'}>
              <Button endIcon={<Iconify icon={'material-symbols:arrow-right-alt-rounded'} />}>
                Next
              </Button>
            </Stack>
          </Card>
        );
      },
    },
    // 其他步骤...
  ],
}}>
```

> 自定义步骤
> 每个步骤都可以通过 customPopRender 方法进行自定义渲染，并可以在 beforeWork 中执行异步操作。

> 贡献
> 欢迎贡献代码！请提交 Pull Request 或报告问题。

> 许可证
> Guide-Eazy 使用 MIT 许可证。

通过 Guide-Eazy，您可以轻松创建引导教程，提升用户体验。希望这对您有帮助！如果有其他问题，请随时告诉我。
