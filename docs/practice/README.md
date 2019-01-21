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


### Promise

Fetch APIを説明する前にpromiseオブジェクトについて触れておきます。

promiseは非同期処理の完了もしくは失敗を表すオブジェクト、またはそれらを操作する仕組みのことをいいます。

```js
function promiseReturnFunction() {
  // promiseがreturnされる関数
  // 非同期な処理 e.g. setTimeoutとか
}

promiseReturnFunction().then(function(result) {
  // 成功時の処理
}).catch(function(error) {
  // 失敗時の処理
})
```

promiseオブジェクトの `then / catch` メソッドそれぞれに成功 / 失敗時のfunctionを登録しておくことで、非同期関数実行の成否にかかわらず、

- 実行順を保証する
- 見通しのよいコードになる

のようなメリットがあります。

また、昨今においては、外部プラグインで非同期処理を行う関数のほとんどが `Promise` を使って書かれています。


### Fetch API

Fetch APIはJavaScriptの標準モジュールで、Ajaxのようにブラウザから非同期通信を実行する関数です。

* [Fetch 概説 \| MDN](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch)

```js
fetch('http://example.com/movies.json') // URLへhttpリクエストを送信
  .then(function(response) {
    console.log(response.status) // 200
    return response.json(); // jsonを返す
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson)); // console.logはjson型を受け取れないのでstringにキャストしている
  });
```

基本的な使い方は 第1引数にfetchしたいリソースのURL、（必要であれば）第2引数にオプションを指定したオブジェクトを指定します。

戻り値は前述したPromiseオブジェクトとなります。

```ts
fetch(input: URL, option: オプション): Promise<Response>;
```

::: warning
Fetch APIの戻り値である `Response` 型はいくつかのプロパティとメソッドで構成されています。

`body` や `status` , `header` など代表的なプロパティと、bodyの値をjsonやstringで返す `json()` 、`text()` 等のメソッドがあります。

後者の `json()` 、 `text()` メソッドは便利ですが、Promiseオブジェクトを返すことに注意しましょう。

- [Response \| MDN](https://developer.mozilla.org/ja/docs/Web/API/Response)
:::

### Vueインスタンスのライフサイクルフック

Fetch APIのようにリソースを非同期で取得し、画面に表示するとき、どのタイミングでリソースを取得するのが望ましいでしょうか。

多くの場合、ボタン押下のようなユーザからのアクションなしで、JavaScriptが読み込まれたタイミングでリソースを取得することになると思います。

Vue.jsでは、Vueインスタンス初期化時の特定の段階で実行する処理を追加することができます。

いくつかの **ライフサイクルフック** と呼ばれる関数を実行することでそれを実現できます。


```js
new Vue({
  data: {
    a: 1
  },
  created: function () {
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

- [API | ライフサイクルフック — Vue\.js](https://jp.vuejs.org/v2/api/#%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%95%E3%83%83%E3%82%AF)

::: tip
代表的なライフサイクルフックとその呼ばれるタイミングは以下です。
- created ... Vueインスタンス作成時
- mounted ... Vueインスタンスと、それに紐づくルートのDOM要素がレンダリングされたとき
- updated ... dataが変更され、DOMが再描画されたとき
- destroyed ... Vueインスタンスが破棄されたとき
:::

### VueインスタンスからGitHubAPIをFetchしてみる

GitHubでは公開されているリポジトリの情報をAPIから取得することができます。

Vue.jsのcommit記録をAPIから取得して、リストで表示してみましょう。

::: tip
- Vue.jsのGitHubリポジトリ: https://github.com/vuejs/vue
  - masterブランチのcommit記録: https://github.com/vuejs/vue/commits/master
  - 対応するAPIのURL: https://api.github.com/repos/vuejs/vue/commits?per_page=10&sha=master
:::

#### 仕様

- Fetch APIを使ってmasterブランチのコミットログを一覧表示する
  - `<ul> <li>` を使って一覧表示する
- 画面に表示する情報
  - コミットハッシュ
    - `<a>` で表示し、commitのURLをリンクする
  - コミットメッセージ
  - コミッター
  - コミットの日時


#### 完成形

[fetch api sample](/practice/fetchApi/index.html)


---

ここで作成した例は、いずれも公式リファレンスのExampleに載っています。

[Example — Vue\.js](https://jp.vuejs.org/v2/examples/)

時間があれば他の例も参考にしてみてください。

