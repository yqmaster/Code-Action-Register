# CodeActionRegister

> 用于将在 editor 中执行的命令转换为在 "editor.codeActionsOnSave" 中执行的命令

## 目前支持的命令：

```
// 格式化文档
"source.formatDocument"
// 对 Import 进行排序，需要插件 mike-co.import-sorter
"source.formatImports"
```

## 使用示例：

对于配置在 xx.code-workspace 中

```
// 插件推荐
"extensions": {
    "recommendations": [
        // 代码规范相关
        "fireworks.code-action-register", // code-action 注册插件
    ]
},
```

```
// 命令调用
"settings": {
    "editor.codeActionsOnSave": ["source.formatDocument", "source.formatImports"]
},
```

## 插件安装：

VsCode 插件栏搜索 fireworks.code-action-register

## 解决方案：

### 1. Prettier 与 Import Sorter 插件之间的冲突

**原理：**

> 将异步执行的代码更改为顺序执行

**常规修改方案：**

```
// 取消自动格式化，取消自动排序
// 使用插件提供的命令格式化
"settings": {
    "editor.formatOnSave": false,
    "importSorter.generalConfiguration.sortOnBeforeSave": false,
    "editor.codeActionsOnSave": ["source.formatDocument", "source.fixAll.eslint", "source.formatImports"]
},
```

**基于 TypeScript 的修改方案：**

```
// 只用关闭自动排序，其他的保持默认即可
"settings": {
    "importSorter.generalConfiguration.sortOnBeforeSave": false,
},
// 仅限于 TS 的设置
"[typescript]": {
    // "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": ["source.formatDocument", "source.fixAll.eslint", "source.formatImports"]
}
```

## 项目地址：

https://github.com/yqmaster/Code-Action-Register
https://git.shiyou.kingsoft.com/wuhan/haowan/plugins/codeactionregister

## 未来展望（TODO）：

**方案一:**

改为图形化界面的插件，配置好对应的 editor 命令与 code-action 命令而无需读表

**方案二:**

改为走 json 配置表，在 json 配置表里面配置好相应的命令用于将 editor 中执行的命令转换为配置在 "settings" 中 "editor.codeActionsOnSave" 的命令
