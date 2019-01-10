[[toc]]

# ハンズオン

基本的には以下のページをなぞって、Vueのコア機能を理解するようにします。

[はじめに — Vue\.js](https://jp.vuejs.org/v2/guide/index.html)

理解を深めたい場合、公式リファレンスを繰り返し読みましょう。基本的には日本語訳されているので読みやすいはずです。

## 宣言的レンダリング

Vue.js のコアは、単純なテンプレート構文を使って宣言的にデータを DOM に描画することを可能にするシステムです。

```html
<div id="app">
  {{ message }}
</div>
```

```js
// Vueインスタンスを作成して、id=appに紐付ける
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

一見するとただテンプレートを描画しているだけですが、Vue.js は内部で多くの作業を行っています。データと DOM は関連付けられ、そして全てが **リアクティブ** になっています。

### リアクティブを体感する その1

ためしに、ブラウザのコンソールから `app.message` の値を変えてみましょう。

```js
// ブラウザのコンソール上で実行する
app.message = "Hello JSL!"
```

描画されたサンプルが、 `Hello JSL!` に変わったのが確認できると思います。

Vueインスタンスに渡された `data` プロパティはすべてがリアクティブな値になります。dataプロパティには `instanceName.propertyName` でアクセス可能です。
また、インスタンス内部では `this.propertyName` でアクセス可能です。 `this` はインスタンス内部のスコープを表します。
Vueインスタンス内のdataの変化は、意識することなくDOM上に展開しているデータと連動して変化します。

![01](./01.gif)

### リアクティブを体感する その2

文字列の展開に加えて、以下のように要素の属性もリアクティブにすることができます。

例として、 `title` 属性をリアクティブにしてみます。

```html
<div id="app-2">
  <span v-bind:title="message">
      マウスオーバーして数秒後に、この要素のタイトルが出現します。
  </span>
</div>
```

```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'あなたがページを更新した時刻は' + new Date().toLocaleString()
  }
})
```

`v-bind` 属性はDOMに対して、リアクティブな振る舞いを提供します。
上記の例は、「この要素の `title` 属性を `Vue` インスタンスの `message` プロパティによって更新して保存する」ということになります。

また、 `Vue.js` の提供する `v-` の接頭辞のついたプロパティを **ディレクティブ** といいます。

ディレクティブの中身は常にJavaScriptとして評価されます。  
例えばディレクティブに文字列を渡したいときは `v-bind:title="'anyString'"` のようにする必要があります。

::: tip

#### なぜリアクティブであることが重要なのか？

多くのバックエンドフレームワークで MVC(もしくはMTV) アーキテクチャを採用しているように、多くのフロントエンドフレームワークでは MVVM アーキテクチャを採用しています。

これは Model View ViewModel の略で、Model(ビジネスロジック)とView(ユーザに対して見える部分)を分離し、制約をつけることで見通しの良いコードを書くためのアーキテクチャです。

また、ViewとModelをつなぎこむ部分をViewModelと呼び、ViewとViewModelのデータがリアクティブに変化することで実現します。

 `Vue.js` において、`View = Vueインスタンスを紐付けるDOM` 、 `ViewModel = Vueインスタンス` のように解釈することが出来ます。

実はVue本体はModelを提供しておらず、VuexなどのプラグインやStoreパターンを使う場合のみModelを分離可能だと考えています。

[Vuex とは何か？ \| Vuex](https://vuex.vuejs.org/ja/)

[状態管理 — Vue\.js](https://jp.vuejs.org/v2/guide/state-management.html#%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%AA%E7%8A%B6%E6%85%8B%E7%AE%A1%E7%90%86%E3%82%92%E3%82%BC%E3%83%AD%E3%81%8B%E3%82%89%E4%BD%9C%E3%82%8B)
:::

## イベントを購読する

 `Vue.js` でDOMのイベントを購読するには `v-on` ディレクティブを使います。


```html
<div id="app-2">
  <button v-on:click='popAlert'>
    アラートを出す
  </button>
</div>
```

```js
var app2 = new Vue({
  el: '#app-2',
  data: {
    alertMessage: 'ボタンが押されました'
  },
  methods: {
    popAlert: function() {
      alert(this.alertMessage);
    },
  }
})
```

ここではbutton要素のclickイベントを購読しています。

Vueインスタンスに見慣れないプロパティがあることに気づいたかもしれません。

`methods` プロパティは、Vueインスタンス内部や、インスタンスが紐付いたDOMからアクセスできる関数です。

clickイベントが発火すると、Vueインスタンスに定義された、 `popAlert` という関数が呼び出されます。

methodsに定義した関数は、上記の例のようにディレクティブ内で使用することが可能です。

また、dataプロパティと同様に、テンプレート構文やインスタンス内部から呼び出すことも可能です。

::: tip
フロントエンド開発では、画面上でのユーザからの入力や変更をイベントして受け取り、それぞれのイベントに対し、動作を規定しておくことがしばしばあります。

これはバックエンド開発ではあまり考えたことのない概念かもしれません。

e.g. ボタンをクリックすることでダイアログが開く等

一般的に **イベントを購読する** 、 **イベントが発火する** のように使われます。
:::

### リアクティブを体感する その3

htmlの `<input>` 要素のvalue属性をリアクティブなふるまいにして、さらにinputイベントを購読しましょう。

```html
<div id="app-3">
  <input
    type="text"
    v-bind:value="message"
    v-on:input="updateMessage"
    >
  <p>あなたの入力したメッセージは {{ message }} です</p>
</div>
```

```js
var app3 = new Vue({
  el: '#app-3',
  data: {
    message: ''
  },
  methods: {
    updateMessage: function(e) {
      this.message = e.target.value;
    },
  }
})
```

`<input>` が更新されるたびに `<p>` 要素内のmessageが変化するのが分かると思います。

いままで、 Vueインスタンス→画面 の一方向にリアクティブでしたが、Vueインスタンス⇔画面 の両方でリアクティブになっていることが分かるかと思います。

これを **双方向バインディング** といいいます。

::: tip
`v-on` ディレクティブで発火する関数には **暗黙的に** event変数が渡されることを覚えておきましょう。  
これはJavaScriptの慣例なので、JavaScriptでイベントハンドリングをしたことがない人は直感的に理解しづらいかもしれません。

また、イベントによって発火する関数は **コールバック関数** と呼ばれます。

:::

::: tip
設定できるDOMイベント一覧はWeb標準で定められています。

[イベントリファレンス](https://developer.mozilla.org/ja/docs/Web/Events#Standard_events)

一般的によく使われるイベントは以下です。

- input・・・要素のvalueが変化したとき
- change・・・要素の値が変化したとき
- keyup・・・キーボード入力されたときに、キーを離したとき
- focus ・・・要素にフォーカスがあたったとき
- blur・・・要素のフォーカスが外れたとき
- scroll・・・要素がスクロールされたとき

:::

## v-modelによる双方向バインディング

 `Vue.js` では `v-model` ディレクティブを使うことで、より簡単に双方向バインディングを実現できます。

```html
<div id="app-4">
  <input
    type="text"
    v-model='message'
    >
  <p>あなたの入力したメッセージは {{ message }} です</p>
</div>
```

```js
var app4 = new Vue({
  el: '#app-4',
  data: {
    message: ''
  },
})
```

### 演習

チェックボックスの値を双方向バインディングしてみましょう。単体のチェックボックスの戻り値はboolean値です。

```html
<div id="app-5">
  <input type="checkbox" id="checkbox">
  <span>選択されている値は 〜〜 です</span>
</div>
```

```js
var app5 = new Vue({
  el: '#app-5',
  /** write your code

  **/
})
```


## 算出プロパティを使う

先述のとおり、テンプレート内ではJavaScriptが書けるので便利です。

```html{7-8}
<div id="app-4">
  <input
    type="text"
    v-model='message'
    >
  <p>あなたの入力したメッセージは {{ message }} です</p>
  <p>あなたの入力したメッセージの文字数は {{ message.length }} です</p>
  <p>あなたの入力したメッセージを逆さまに書くと {{ message.split('').reverse().join('') }} です</p>
</div>
```

```js
var app4 = new Vue({
  el: '#app-4',
  data: {
    message: ''
  },
})
```

ですが、テンプレート内に多くのロジックを詰め込むと、コードが肥大化し、メンテナンスが難しくなります。

複雑なロジックにはcomputedプロパティを使います。これは一般的なオブジェクト指向におけるgetter propertyに似ています。

```html
<div id="app-4">
  <input
    type="text"
    v-model='message'
    >
  <p>あなたの入力したメッセージは {{ message }} です</p>
  <p>あなたの入力したメッセージの文字数は {{ messageLength }} です</p>
  <p>あなたの入力したメッセージを逆さまに書くと {{ reversedMessage } です</p>
</div>
```

```js
var app4 = new Vue({
  el: '#app-4',
  data: {
    message: ''
  },
  computed() {
    messageLength: function () {
      // `this` は vm インスタンスを指します
      return this.message.length;
    },
    reversedMessage: function () {
      // `this` は vm インスタンスを指します
      return this.message.split('').reverse().join('');
    },
})
```

computedプロパティは依存するdataプロパティの変化にともない、値がリアクティブに変化します。


## 条件分岐

`v-if / v-show` ディレクティブを使うと簡単に表示制御ができます。

```html
<div id="app-5">
  <h1 v-if="isVisible">Visible</h1>
  <h1 v-else>NotVisible</h1>
</div>
```

```html
<div id="app-5">
  <h1 v-show="isVisible">Visible</h1>
  <h1 v-show="!isVisible">NotVisible</h1>
</div>
```

```js
var app5 = new Vue({
  el: '#app-5',
  data: {
    isVisible: true,
  },
})
```

コンソール上から `isVisible` の値を変えると、描画されるhtmlが変わることが確認できます。

::: tip
v-if / v-showで実現できることは同じように見えますが、若干違いがあります。

v-showは `display` CSSプロパティを visible / hidden を切り替えるだけで、DOMは常に描画されています。

一方、v-ifは条件がtrueになるまで描画されず、また条件がfalseになった時点でDOMが破棄されます。

[条件付きレンダリング — Vue\.js](https://jp.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)
:::

## ループ

Vueインスタンスに宣言した配列を描画するとき、 `v-for` ディレクティブが有効です。

`v-for` ディレクティブは `item in items` の構文でループを指定する必要があり、他のディレクティブに比べやや特殊な構文になります。

```html
<div id="app-6">
  <ul>
    <li v-for="member in members">
      {{ member.name }}
    </li>
  </ul>
</div>
```

```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    members: [
      {name: 'ジョナサン・ジョースター'},
      {name: 'ジョセフ・ジョースター'},
      {name: '空条承太郎'},
      {name: '東方仗助'},
      {name: 'ジョルノ・ジョバァーナ'},
      {name: '空条徐倫'},
    ]
  },
})
```

以上が `Vue.js` の基本的な構文になります。