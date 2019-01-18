[[toc]]

# アプリケーションを作ってみる

ここまで学んだことだけで簡単なアプリケーションを作ります。

## マークダウンエディタを作ってみる

markedという外部プラグインを使ってマークダウンエディタを作ってみましょう。


### markedownについて

markdownは軽量のマークアップ言語です。

markdownパーサーで変換することでHTMLへ変換できます。

**変換前**

```markdown
# h1の見出し
## h2の見出し
### h3の見出し
#### h4の見出し

- 順序なしのリストアイテム
- 順序なしのリストアイテム
- 順序なしのリストアイテム
```

**変換後**

```html
<h1>h1の見出し</h1>
<h2>h2の見出し</h2>
<h3>h3の見出し</h3>
<h4>h4の見出し</h4>

<ul>
  <li>順序なしのリストアイテム</li>
  <li>順序なしのリストアイテム</li>
</ul>
```

### marked.js を使う

marked.jsというブラウザで使うことができるmarkdownパーサーがあるのでそちらを使用します。
以下を読み込むことで `marked()` という関数を利用できるようになります。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.6.0/marked.js"></script>
```

リファレンス
- [Marked\.js Documentation](https://marked.js.org/#/USING_ADVANCED.md)

### v-html

2重カッコ内のデータはHTMLではなく、プレーンなテキストとして扱います。

生のhtmlをそのまま描画するには `v-html` ディレクティブを使用する必要があります。

`v-html` ディレクティブ属性を付与した要素は、`v-html` で指定した値に置き換わります。

```html
<div id="app">
  <span v-html="rawHtml"></span>
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    rawHtml: '<div>置きかわる要素です</div>'
  },
})
```

### 完成形

[markdown editor](/practice/markdownEditor/index.html)

## FetchAPIを使って非同期な通信をしてみる

JavaScript標準の非同期通信APIである、FetchAPIを使ってGitHubAPIと非同期な通信をしてみましょう。

### Fetch API

* [Fetch 概説 \| MDN](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch)

```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
```

## 検索結果を動的に表示してみる

名前の一覧の検索結果を動的に変化させてみましょう。
