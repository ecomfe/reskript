---
title: 使用SVG图形
---

在之前的[编写组件](./component)和[编写样式](./style)中，我们已经掌握了组件和样式的实现，至此编写一个应用已经没有阻碍。在一个应用中，图片也是常见的一类资源，我们都知道`webpack`会将图片通过`url-loader`等形式转换为字符串以供使用，`reSKRipt`在这一点上并不特殊，就不再展开做详细的说明，唯独`.svg`文件有所不同。

随着社区的发展，我们越来越多地使用`.svg`作为图形的格式。矢量图有很好的大小自适应能力，特别是在对资源大小不那么敏感B端产品中，有着比较广泛的使用。本章节就将带你了解一下如何引入一个`.svg`图形资源，以及`reSKRipt`对此的额外能力。

## 作为图片引入

正常情况下，一个`.svg`文件可以作为图片被赋值给`<img>`的`src`属性，或者作为`background-image`等CSS属性使用。在这种情况下，和`.png`等其它图片格式一样，我们使用`import`引入文件并赋值给一个变量即可：

```tsx
import image from './image.svg';

<img src={image} />
<div style={{backgroundImage: image}} />
```

这种形式是最简单、基础的，我们就不再详细讲解了。

## 作为组件引入

有使用过`create-react-app`的开发者，可能会发现它能[把SVG引入为React组件](https://create-react-app.dev/docs/adding-images-fonts-and-files#adding-svgs)。在这一点上，`reSKRipt`也具备相同的能力：

```tsx
import {ReactComponent as Image} from './image.svg';

<Image fill="#007bd2" />
```

这种方式可以让你更便捷地为SVG指定一些属性，如`fill`、`viewBox`都是常见的可自定义的属性。`reSKRipt`内部使用了[@ecomfe/svg-mixed-loader](https://github.com/ecomfe/svg-mixed-loader)来处理这个功能，相比于`create-react-app`的`babel`插件实现方式有着更好的编译性能。

同样，由`reSKRipt`自动生成的SVG组件是带有`displayName`的，与其它组件相同，会依据文件名、目录名等条件来尽可能地生成有实际意义的、可读的`displayName`。

## 总结

本章节讲述了对`.svg`格式的处理，在此处的处理有以下特点：

- 可以当作正常图片来引入`.svg`文件，即变为一个字符串。
- 同样可以将`.svg`引入作为组件，使用`ReactComponetn`这一命名导入即可。
- `reSKRipt`使用了一个自定义的loader来实现对`.svg`的处理，具备更好的性能。
- 将`.svg`转换为组件后，会有一个可读的`displayName`。
