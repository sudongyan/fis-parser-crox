fis-parser-crox
==================

Crox 的 fis插件

### 文档

- Crox http://thx.github.io/crox/
- FIS3 http://fis.baidu.com/fis3/docs/beginning/intro.html

**安装**

```
npm -g install fis3
npm -g install fis-parser-crox
```

**配置使用**

```js
// vi fis-conf.js

fis.match('*.tmpl',{
    rExt: '.js',
    isMod: true,
    parser:fis.plugin('crox',{
        out:'commonjs', // 翻译的目标语言,默认 commonjs 模块。目前支持： php | vm | commonjs | cmd | amd
        htmlEncode:function(){}, // 翻译的js代码中的html特殊字符转义方法,默认会用实体字符替换尖括号（主要用于js相关翻译）
        modulePrefix:'', // 根模块前缀指定，例如 app/sub/module/b 的 app（主要用于js模块的翻译）
        flatten:false // 是否把include都打平,默认为false（读取真实文件内容替换）
    })
});
```
