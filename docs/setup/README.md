[[toc]]

# セットアップ

## Vue.jsを導入する

Vue.jsを導入する方法は2種類あります

1. html上で直接Vue.jsのソースを読み込む
    - CDN or ローカルから読み込むだけ
    - ユーザの開発環境に依存しないため、導入が簡単
    - Vue.jsの基本を学ぶため、今回のハンズオンはこちらの方法で学習する
1. `vue-cli` を使ってセットアップする
    - `.vue` ファイルを扱う
        - `.vue` ファイルはそれぞれは単一のコンポーネントとして動作し、Webpack等のBundlerを介して、ブラウザで解釈できるように変換される
    - 想定ユーザ
        - 基礎を学習済
        - Webpack等のバンドラーや、最新のJSにおけるmodule import を理解しており自分で問題解決可能
        -  `Vue.js` で大規模な開発を想定

このハンズオンでは 1. の方法を用いる


::: tip
`vue-cli` で開発を進めたい場合の参考リンク集

- [Vue CLI 3[公式]](https://cli.vuejs.org/)
- [単一ファイルコンポーネント — Vue\.js](https://jp.vuejs.org/v2/guide/single-file-components.html)
- [VueCLIからVue\.js入門①【VueCLIで出てくるファイルを概要図で理解】 \- Qiita](https://qiita.com/po3rin/items/3968f825f3c86f9c4e21#%E4%BB%8A%E5%9B%9E%E3%81%AF%E3%81%93%E3%81%93%E3%81%BE%E3%81%A7)

最初からこちらでやって、色々な問題解決に慣れるのもあり（茨の道にもなりえる）

:::

## ハンズオン用のディレクトリを作成する

適当な場所にディレクトリを作成します

```bash
$ mkdir -p /path/to/vuejs-handson
```

## index.htmlを作成する

ディレクトリ直下に `index.html` を作成します。

```bash
$ cd /path/to/vuejs-handson
$ touch index.html
```

作成できたら、以下の内容をコピーします

```html
<!DOCTYPE html>
<html>

<head>
    <title>My first Vue app</title>
</head>

<body>
    <div id="app">
        {{ message }}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.js"></script>
    <script src="app.js"></script>
</body>

</html>
```

Vue本体を読み込むことによって jsで `Vue` を扱うことができるようになります。

## app.jsを作成する

さらに、ディレクトリ直下に `app.js` を作成します。

```bash
$ touch app.js
```

作成できたら、以下のような内容をコピーします。

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

ここまでできたら、 `index.html` をブラウザで開いてみましょう。

Hello Vue!を表示されていれば、セットアップは完了です。