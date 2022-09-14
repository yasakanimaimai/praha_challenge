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
- インターフェイスを使用しなくてもテストmockはできたが、インターフェイスを作った方がいいのか？

<br>

## 課題3
### 「そもそも、なぜ元の関数はカバレッジ100%のテストを書けなかったのでしょうか？」

テスト対象の関数の処理結果が、別モジュールの実装に依存していたため。
例えば`asyncSumOfArraySometimesZero`は`DatabaseMock`がエラーをthrowするかどうかで通過するコードが変わり、
一度の実行では正常処理かエラー処理の片方しか通らないテストになるため。

<br>

### 「依存性の注入とは何でしょうか？どのような問題を解決するために使われるのでしょうか？ 
### 依存性の注入を実施することで、モジュール同士の結合度の強さはどのように変化したでしょうか？」

依存しているモジュールのインスタンスをそのまま利用するのではなく、
モジュールのインターフェイスを外部から受け取り、それを利用すること。
これによって、処理が１つの実装に依存しなくなるため、結合度が低くなる。
インターフェイスを実装していればどんなインスタンスも利用できるため、
処理の交換や使い分けが簡単になる。
例えば課題２では、テスト対象の関数が外部モジュールに依存していたが、
インターフェイスを実装したmockを利用できるようにすることで
正常処理とエラー処理のテストケースを確実に確認できるようになった。

<br>

### 「今回のような単体テストで外部サービスとの通信が発生すると、どのようなデメリットがあるでしょうか？」

もし外部サービスが有料だったらテストだけでコストが掛かる
通信状況によってテストの精度落ちる

<br>

### 「なぜProperty Based Testingの考え方がコード品質を向上してくれる可能性があるのでしょうか？
### 逆に採用しない方が良いケースはあるのでしょうか？」

Property Based Testingとは
出力値そのものではなく、出力値が持つ特性(propety)が満たされていることを通過条件とするテストの考え方
手法としては、入力値がとりうる範囲を決め、その範囲内で大量のランダム値を機械的に生成し、大量の出力に対して上記の検証を行う
有効なケースとしては、テストオラクル問題など、ロジックが複雑すぎて出力値そのものの判定が難しい時
採用しない方が良いケースとして、伝票値引きの按分ロジックなどは、ロジックが複雑だからといって一円単位の誤差が許されないので特定値で検証する必要がある。

Example-based testingとは
無数の入力値候補から何かしらの基準で入力値を選択し、その出力値が正しいことを通過条件とする一般的なテストの考え方
有効なケースとしては、出力値が手動で判断できる時？

> たとえば2つの自然数の足し算を行うメソッドがあるとして。
「3, 4」という入力に対して「7」が出力されることを確認するのが従来のExample-based testing。
出力がもつべきpropertyとして、たとえば「出力値は自然数である」「出力値は、どちらの入力値よりも1以上大きい」といったstatementを定義し、多数の入力ペアについてこのstatementを検証するのがProperty-based testingと考えればよいでしょうか。
[Property-based Testing、そしてExample-based testingとは何か。](https://www.kzsuzuki.com/entry/PropertyBasedTesting)

<br>

### 「単体テストケースを増やしても可読性、保守性、実行速度などに問題が起きないよう工夫できることを3つ考えてみましょう」

- [Four-Phase Test](https://zenn.dev/kakkoyakakko/articles/896e7d0e04eff0)など、テストコードの書き方の統一ルールを導入する
- テストケース間で共通しているところは、クラスやメソッドに抜き出す
  - やりすぎるとテストコードのテストコードが必要になることもある？
- DB接続、サーバ通信、ファイルシステムなど外部に接続する処理はmock化するか、結合テストとして行う


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
- [DI (依存性注入) って何のためにするのかわからない人向けに頑張って説明してみる](https://qiita.com/okazuki/items/0c17a161a921847cd080)
- [Property based testing を試してみよう](https://qiita.com/freddiefujiwara/items/e345f4a0610bf08deea7)
- [Property-based Testingの使い方](https://kangaeru-chikara.info/programming/article30)
- [Property-based Testing、そしてExample-based testingとは何か。](https://www.kzsuzuki.com/entry/PropertyBasedTesting)
- [実行可能性と可読性を考慮した形式使用記述スタイル](https://www.jstage.jst.go.jp/article/jssst/27/2/27_2_2_130/_pdf)
- [【単体テスト実践ガイド】単体テストの実施方法から意識するべきポイント、自動化の方法まで詳しく解説](https://www.praha-inc.com/lab/posts/unit-testing)
- [ユニットテストの可読性を上げる - Four-Phase Test](https://zenn.dev/kakkoyakakko/articles/896e7d0e04eff0)
- [自動テスト速度改善 - 自動テストが品質のボトルネックとならないために](https://developers.freee.co.jp/entry/improving-ci-testing-for-next-quality)
- [今度こそユニットテストを書き始めるために](https://zenn.dev/koduki/articles/93ebc677493e7a)
- [ふつうのユニットテストのための７つのルール](https://zenn.dev/koduki/articles/106012fdd422fa67eae6)
- [.NET Core と .NET Standard での単体テストのベスト プラクティス](https://docs.microsoft.com/ja-jp/dotnet/core/testing/unit-testing-best-practices#arranging-your-tests)