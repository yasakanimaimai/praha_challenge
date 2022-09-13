# jestで単体テストを書こう

<br>

## 課題１

### Jestとは
- JS系のメジャーなテストフレームワーク

### sum_sample
`jest sum_sample/sum`

### matcher_sample
`jest ./matcher_sample`

### cli_sample
`yarn jest ./cli_sample --notify --config=./jest.config.js`
→ テストが完了するとデスクトップに通知が飛ぶ
- ドキュメント記載通りに`jest ./cli_sample --notify --config=config.json`を実行をすると以下のエラーになる
  - `Error: Can't find a root directory while resolving a config file path. Provided path to resolve: config.json`
  - 以下の手順で解消？した
    1. `jest --init`を実行して`jest.config.js`を作成
    2. `yarn add node-notifier`を実行
    3. `--config=`に`jest.config.js`のパスを記載
  - ただし、yarnコマンドで起動しなければ以下のエラーになる
  `Error: notify reporter requires optional peer dependency "node-notifier" but it was not found`
    - `npm install -g node-notifier`や`npm install --save node-notifier`を試したが変わらなかった
      - yarnからの実行とjestから実行する時に、内部的にライブラリをどう利用しているのかが分からない
      - そもそもyarnとnpmの両方でライブラリをインストールしてもいいのか？
      → おそらく併用しない方がいい。依存関係で詰まったらnode_modulesを削除してから再度npmかyarnでインストールする

### babel_sample
`jest ./babel_sample`
[この記事](https://qiita.com/riversun/items/6c30a0d0897194677a37)を参考にした
- CommonJSのモジュール管理ではrequire構文をつかうが、
babel_sample/hello.jsではES6より導入されたimport文によるモジュール管理をつかっている。
- 本番向け開発はいままでどおりES6で書いて、Jestでテストするときには、(Babelで)CommonJS形式にしよう、というのはよくやられている。

### webpack_sample
- 検証方法がわからなかったので保留

### typescript_sample
`jest ./typescript_sample`
- Jestはテストの実行時にテストコードの型検査を行いません。
型検査を行いたい場合、代わりに`ts-jest`を使用するか、TypeScriptコンパイラの`tsc`をテストとは別に使用してください。
→ `jest.config.js`のtransformでtsの場合は`ts-jest`を使うように設定する
- JSをテストするときはコメントアウトしないとエラーになる。JSとTSのどちらも一斉にテストするのはできないのか？

### promise_sample
`jest ./async_sample`

### setup_sample
`jest ./setup_sample`
[この記事](https://zenn.dev/tentel/books/08b63492b00f0a/viewer/b98847)を参考にした。

### mock_sample
`jest ./mock_sample`
[この記事](https://qiita.com/YSasago/items/6109c5d3fbdbffa31c9f#%E7%89%B9%E5%AE%9A%E3%81%AE%E9%96%A2%E6%95%B0%E3%82%92%E3%83%A2%E3%83%83%E3%82%AF%E5%8C%96%E3%81%97%E3%82%88%E3%81%86)を参考にした。
- mockのメリットは、外部の実装から切り離してテストできること

<br>

## 課題２
- forkしてclone後、jestSample下で`npm install --save --legacy-peer-deps`が必要
  - `npm install`だけ依存関係でエラーになる
- エラーが発生することのテスト(toThrow)は、テストする関数を別途関数でラップする必要がある
  - つまり、expect()は引数の関数の戻り値を受け取るため、関数内部で発生したエラーに戻り値はないので検知できない
- `expect.assertions(num);`は検査関数が呼ばれた回数(num)を指定する
  - 非同期処理をテストする際の流れとしては、非同期処理完了後に実行する関数内で戻り値を検査している
  「returnを付けないと、非同期処理の終了を待たずに`it`が終了してしまう。」
  とドキュメントにあるが、付けなくてもテストが通る。
  ただ元々の`asyncSumOfArray`内でsettime関数を使うと、returnが必要になる。
- `const a = require('./A');`はaインスタンスを持つが`import A from './A'`はAをインポートしただけ
- `jest.spyOn()`は、オブジェクトを引数に指定するのに対し、`jest.mock()`は、モジュールを引数に指定します。
つまり、mockの対象が引数に指定したオブジェクトだけなのか、モジュールそのものなのかという違いがあります。


<br>


## メモ
- jestコマンドはファイル単位、ディレクトリ単位、カレントディレクトリ単位でテスト対象を選択できるっぽい
  - 子ディレクトリ内のテストも実行できた
- testメソッドとitメソッドの内容は同じ。
- [jestの設定は`jest.config.js`以外にも`package.json`でもできる](https://jestjs.io/ja/docs/configuration)みたいだが、両方で管理すると
`Multiple configurations found`のエラーになった
- Babelの設定ファイルはいくつかの書き方があり、babel.config.jsを書く、.babelrcに書く、webpack.config.jsの中のbabel-loader設定内に書く、
などいろんなパターンが許されている。ただし、Jestを使うときは、babel.config.jsまたは.babelrcに書くのが正解。
- カバレッジレポートを取得するためには`jest.config.js`を設定するか、`--coverage`の引数が必要



<br>

## 参考記事
- [公式ドキュメント](https://jestjs.io/docs/ja/getting-started)
- [npm install の --save-dev って何？](https://qiita.com/kohecchi/items/092fcbc490a249a2d05c)
- [npmとは　yarnとは](https://qiita.com/Hai-dozo/items/90b852ac29b79a7ea02b)
- [warning package.json: No license field](https://qiita.com/kozakura16/items/ebaf8ea58fc49dcbdd73)
- [【JavaScript】Babelとは何か](https://qiita.com/mzmz__02/items/e6fbe5e30cc3fd13788f)
- [CommonJSとES Modulesについてまとめる](https://zenn.dev/yodaka/articles/596f441acf1cf3)
- [デスクトップ通知が出来るnode.jsライブラリ「node-notifier」](https://co.bsnws.net/article/123)
- [ES6+Babel7環境でJestする方法](https://qiita.com/riversun/items/6c30a0d0897194677a37)
- [最新版で学ぶwebpack 5入門JavaScriptのモジュールバンドラ](https://ics.media/entry/12140/#webpack-general)
- [Parcel 入門 ～Parcelはwebpackの代わりになるのか～](https://qiita.com/soarflat/items/3e43368b2d767c730781)
- [ts-jestを使う時に、jestのバージョンで警告が出る](https://awesome-linus.com/2020/02/12/ts-jest-jest-version-warning/)
- [非同期に実行するコードをJestでテスト](https://medium.com/@lachlanmiller_52885/%E9%9D%9E%E5%90%8C%E6%9C%9F%E3%81%AB%E5%AE%9F%E8%A1%8C%E3%81%99%E3%82%8B%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92jest%E3%81%A7%E3%83%86%E3%82%B9%E3%83%88-e7f40fb6cffa)
- [リファレンス](https://deltice.github.io/jest/docs/ja/expect.html)
- [【理論】Jest 3 セットアップ関数](https://zenn.dev/tentel/books/08b63492b00f0a/viewer/b98847)
- [【Jest】モック化はこれでOK！](https://qiita.com/YSasago/items/6109c5d3fbdbffa31c9f#%E7%89%B9%E5%AE%9A%E3%81%AE%E9%96%A2%E6%95%B0%E3%82%92%E3%83%A2%E3%83%83%E3%82%AF%E5%8C%96%E3%81%97%E3%82%88%E3%81%86)
- [【TypeScript】TypeScriptでの3つの関数の書き方](https://www.sekky0905.com/entry/2016/08/27/%E3%80%90TypeScript%E3%80%91TypeScript%E3%81%A7%E3%81%AE3%E3%81%A4%E3%81%AE%E9%96%A2%E6%95%B0%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9)
- [【理論】Jest 2 非同期コードのテスト](https://zenn.dev/tentel/books/08b63492b00f0a/viewer/932c4f)
- [Node.jsのDependency injection：依存性注入の勉強をしてみた](https://qiita.com/okumurakengo/items/98d02552fdb88f63749c)
- [TypeScriptのDIとTsyringeについて](https://zenn.dev/chida/articles/1f7df8f2beb6b6)
- [[Jest+TypeScript] クラスと関数のモック化](https://qiita.com/yuma-ito-bd/items/38c929eb5cccf7ce501e)
- [【備忘録】JestのspyOn()とmock()の使い方について](https://qiita.com/m-yo-biz/items/e9b6298d111ff6d03a5e)
