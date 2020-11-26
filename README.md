# @lianpf/js-utils

> [Monaco Editor](https://github.com/lianpf/monaco-editor-vue) for Vue.

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

[![monaco-editor-vue](https://nodei.co/npm/@lianpf/monaco-editor-vue.png)](https://npmjs.org/package/@lianpf/monaco-editor-vue)

[npm-url]: https://www.npmjs.com/package/@lianpf/monaco-editor-vue  
[downloads-image]: http://img.shields.io/npm/dm/@lianpf/monaco-editor-vue.svg
[npm-image]: http://img.shields.io/npm/v/@lianpf/monaco-editor-vue.svg


## Installation

```bash
npm install @lianpf/monaco-editor-vue --save
npm install monaco-editor-webpack-plugin --save
```

## Using with Webpack or Vue CLI

添加 [Monaco Webpack plugin](https://github.com/Microsoft/monaco-editor-webpack-plugin) `monaco-editor-webpack-plugin` 到你项目中的 `webpack.config.js`:

```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['javascript']
    })
  ]
}
```

如果你项目中使用的是 [Vue CLI](https://cli.vuejs.org) 而不是webpack, 你需要配置 `vue.config.js`:

```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ['json', 'javascript', 'html', 'xml']
      }
    ])
  }
}
```


## 基本用法
```html
<template>
  <div id="editor">
    <monaco-editor
      v-model="value"
      width="800"
      height="500"
      theme="vs-dark"
      language="json"
      :options="options"
      @change="onChange"
    ></monaco-editor>
  </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue'
export default {
  name: 'Editor',
  components: {
    MonacoEditor
  },
  data() {
    const defaultValue = [
      '{',
      '\t"type": "form",',
      '\t"title": "表单",',
      '\t"children":',
      '\t\t{',
      '\t\t\t"label": "文本框1",',
      '\t\t\t"type": "text1",',
      '\t\t\t"name": "text1"',
      '\t\t},',
      '\t"controls": [',
      '\t\t{',
      '\t\t\t"label": "文本框",',
      '\t\t\t"type": "text",',
      '\t\t\t"name": "text"',
      '\t\t},',
      '\t\t{',
      '\t\t\t"type": "select",',
      '\t\t\t"label": "选项",',
      '\t\t\t"name": "select",',
      '\t\t\t"options": [',
      '\t\t\t\t{',
      '\t\t\t\t\t"label": "选项A",',
      '\t\t\t\t\t"value": "A"',
      '\t\t\t\t},',
      '\t\t\t\t{',
      '\t\t\t\t\t"label": "选项B",',
      '\t\t\t\t\t"value": "B"',
      '\t\t\t\t}',
      '\t\t\t]',
      '\t\t}',
      '\t]',
      '}'
    ]
    return {
      defaultValue: defaultValue,
      value: defaultValue.join('\n'),
      options: {
        //Monaco Editor Options
      }
    }
  },
  methods: {
    onChange(value) {
      console.log(value);
    }
  }
}
</script>
```

## Properties

如果你指定 value 属性, 组件则以受控模式运行。否则，它是非受控模式。

| 参数 | 说明 | 类型 | 可选值 | 默认值  |
| -------------- | ------------------------------------------------------ | ------------- | --------------------------------------------------------- | ------- |
| value | editor 中可以自动创建 model 的值(富文本字符串) | string | - | - |
| width  | editor 的宽度 | number | - | `100%` |
| height | editor 的高度 | number | - | `100%` |
| language | 编辑器中自动创建模型的初始语言 | string | 'javascript'、'json'、'html'等| 'javascript' |
| theme | 编辑器的主题 | string | 'vs'、'vs-dark'、'hc-black' | 'vs' |
| `options` | 基础功能外其他配置(可忽略) | object | - | - |
| `hoverOption` | editor 悬停 tips(可忽略) | object | - | `{ show: false, tips: []}` |
| diffEditor | 是否启用 diff editor | boolean | - | false |
| original | editor 中可以自动创建 original model 的值(可忽略) | string | - | - |

#### `options`
| 参数 | 说明 | 类型 | 可选值 | 默认值  |
| -------------- | ------------------------------------------------------ | ------------- | --------------------------------------------------------- | ------- |
| readOnly | 编辑器是否设置只读状态 | boolean | - | false |
| 其他配置 | 参考 [Monaco interface IEditorConstructionOptions](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html). | - | - | 

#### `hoverOption`
| 参数 | 说明 | 类型 | 可选值 | 默认值  |
| -------------- | ------------------------------------------------------ | ------------- | --------------------------------------------------------- | ------- |
| show | 是否展示悬停tips | boolean | - | false |
| `tips` | 悬停tips config (Json 数组) | object[] | - | []

##### `tips` Item
| 参数 | 说明 | 类型 | 可选值 | 默认值  |
| -------------- | ------------------------------------------------------ | ------------- | --------------------------------------------------------- | ------- |
| lineNumber | 需要悬停 tip 的行数 | number | - | - |
| text | 悬停 tip 文案 | string | - | -

## Events & Methods

| 参数 | 说明 | 类型 | 可选值 | 默认值  |
| -------------- | ------------------------------------------------------ | ------------- | --------------------------------------------------------- | ------- |
| `editorBeforeMount(monaco)` | 在 editor 加载安装好之前调用的 function (类似于 Vue 中的 beforeMount) | function | - | - |
| `editorMounted(editor, monaco)` | 在 editor 加载安装好后调用的 function (类似于 Vue 中的 mounted) | function | - | - |
| `change(newValue, event)` | 当前 model 的内容发生更改时所触发的事件 | function | - | - |

更多请参考 [Monaco interface IEditor](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditor.html).

#### Use multiple themes

[Monaco only supports one theme](https://github.com/Microsoft/monaco-editor/issues/338).


## 特殊功能示例

#### 1、受控模式：默认创建 editor 中 model
关键参数：`value`: String
> example: jsonCode. 以language='json'为例

```js
// 默认初始值
var jsonCode = [
  '{',
  '\t"type": "form",',
  '\t"title": "表单",',
  '\t"controls": [',
  '\t\t{',
  '\t\t\t"label": "文本框",',
  '\t\t\t"type": "text",',
  '\t\t\t"name": "text"',
  '\t\t},',
  '\t\t{',
  '\t\t\t"type": "select",',
  '\t\t\t"label": "选项",',
  '\t\t\t"name": "select",',
  '\t\t\t"options": [',
  '\t\t\t\t{',
  '\t\t\t\t\t"label": "选项A",',
  '\t\t\t\t\t"value": "A"',
  '\t\t\t\t},',
  '\t\t\t\t{',
  '\t\t\t\t\t"label": "选项B",',
  '\t\t\t\t\t"value": "B"',
  '\t\t\t\t}',
  '\t\t\t]',
  '\t\t}',
  '\t]',
  '}'
].join('\n');

// 编辑器视觉展示格式
{
	"type": "form",
	"title": "表单",
	"controls": [
		{
			"label": "文本框",
			"type": "text",
			"name": "text"
		},
		{
			"type": "select",
			"label": "选项",
			"name": "select",
			"options": [
				{
					"label": "选项A",
					"value": "A"
				},
				{
					"label": "选项B",
					"value": "B"
				}
			]
		}
	]
}
```

#### 2、悬停提示：editor 内 hover tip
关键参数：`hoverOption`: `Object`
> example: hoverOptionExample

```js
hoverOptionExample: {
  show: true, // 展示
  tips: [
    {
      lineNumber: 2, // 要展示 tip 的行
      text: 'Here is the tip on the 2 line' // 第2行所展示tip的内容
    },
    {
      lineNumber: 3,
      text: 'Here is the tip on the 3 line'
    },
    {
      lineNumber: 4,
      text: 'Here is the tip on the 4 line'
    }
  ]
}
```

#### 3、Use the diff editor
关键参数：
* `diffEditor`: boolean
* `original`: object

```html
<template>
  <div id="editor">
    <monaco-editor
      :diffEditor="true"
      original="..."
      // ...
    ></monaco-editor>
  </div>
</template>
```
