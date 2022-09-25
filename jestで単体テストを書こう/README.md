# jestで単体テストを書こう

<br>

## 課題１
公式ドキュメントのサンプルコードを以下のディレクトリに記載し、動作を確認した。
そのほかのディレクトリはjestを調べる中で気になった記事のサンプルコードを記載したもの。

- sum_sample
- matcher_sample
- cli_sample
- babel_sample
- webpack_sample(検証方法がわからなかったので保留)
- typescript_sample
- setup_sample
- mock_sample

<br>

## 課題２
`./praha-challenge-templates`内にコードを記載
以下は課題のメモ
- forkしてclone後、jestSample下で`npm install`を実行すると依存関係でエラーになるので
`npm install --save --legacy-peer-deps`が必要
- エラー発生を確認するテスト(toThrow)では、テストする関数自体を関数でラップする必要がある
  - つまり、expect()は引数の関数の戻り値を受け取るため、関数内部で発生したエラーに戻り値はないので検知できない
- `expect.assertions(num);`は検査関数が呼ばれた回数(num)を指定する
- インターフェイスを使用しなくてもテストmockはできたが、インターフェイスを作った方がいいのか？

<br>

## 課題3
### 「そもそも、なぜ元の関数はカバレッジ100%のテストを書けなかったのでしょうか？」
元の関数は外部モジュールを関数内部でインスタンス化しており、
外部モジュールの振る舞いをテスト側から制御できなかったため。

<br>

### 「依存性の注入とは何でしょうか？どのような問題を解決するために使われるのでしょうか？ 
### 依存性の注入を実施することで、モジュール同士の結合度の強さはどのように変化したでしょうか？」
依存しているモジュールを内部でインスタンス化して利用するのではなく、
モジュールのインターフェイスを外部から受け取り、それを利用すること。
これによって、処理が1つの実装に依存しなくなるため、結合度が低くなる。
インターフェイスを実装していればどんなインスタンスも利用できるため、
処理の交換や使い分けが簡単になる。
課題1では、テスト対象の関数が外部モジュールに依存していたが、
インターフェイスを実装したmockを利用できるようにすることで
正常処理とエラー処理の確認をテスト関数側で制御できるようになった。

<br>

### 「今回のような単体テストで外部サービスとの通信が発生すると、どのようなデメリットがあるでしょうか？」
もし外部サービスが有料だったらテストだけでコストが掛かる。
通信状況によってテストの精度落ちる。

<br>

### 「なぜProperty Based Testingの考え方がコード品質を向上してくれる可能性があるのでしょうか？
### 逆に採用しない方が良いケースはあるのでしょうか？」
Property Based Testingとは
出力値そのものではなく、出力値が持つ特性(propety)が満たされていることを通過条件とするテストの考え方。
手法としては、入力値がとりうる範囲を決め、その範囲内で大量のランダム値を機械的に生成し、大量の出力に対して上記の検証を行う
有効なケースとしては、テストオラクル問題など、ロジックが複雑すぎて出力値そのものの判定が難しい時など。
採用しない方が良いケースとして、伝票値引きの按分ロジックなど。
ロジックが複雑だからといって一円単位の誤差が許されないので特定値で検証する必要がある。

Example-based testingとは
無数の入力値候補から何かしらの基準で入力値を選択し、その出力値が正しいことを通過条件とする一般的なテストの考え方。
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

<br>

### jestに関するクイズ
1. jestのテスト実行時の仕様は
デフォルトで「複数のテストファイルを並行処理し、ファイル内のテストを順番に実行する」です。
しかし、jestの引数やテストの書き方を変更することで、
これらの仕様を変更することができます。
これを踏まえて「複数のテストファイルを順番に処理し、ファイル内のテストは並行実行する」方法を実現するには
どうすればいいでしょうか?
2. jest.spyOn()とjest.mock()メソッドでは同じようなことを実現できますが、
どのようなケースで使い分けるのがいいと考えますか？
3. 以下の仕様を満たすFizzBuzzのコードとそのテストコードを書いてください。
書き方としては、シンプルにFizzBuzzメソッドのみや、FizzBuzzクラスとその実行クラスに分けるなど、
自由にお願いします！
   - 1から100までの数字に対して、以下のルールに沿って文字列を出力する
   - 3の倍数であればFizz
   - 5の倍数であればBuzz
   - 15の倍数であればFizzBuzz
   - 上記のいずれでもない場合はその数字

<br>

## 課題5
- 「テストフィクスチャ」という言葉をはじめて知った。
単体テスト規模であればテストメソッド内やセットアップ関数でテストデータを用意するが、
統合テストなどある程度の規模になると外部ファイルにデータを記述する方法もある。
`node-express-boilerplate`リポジトリのintegrationテストでは`user.fixture.js`でデータを定義していた。
[node-express-boilerplate/user.fixture.js at master · hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate/blob/master/tests/fixtures/user.fixture.js)

- unitテストではmockを使い、integrationテストではあまりmockを使っていないことから、
テスト対象が何であるかを明確にして、それ以外の部分をmock化するイメージかなと思った。
[node-express-boilerplate/user.test.js at master · hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate/blob/master/tests/integration/user.test.js)

- `express-typescript-boilerplate`リポジトリのUseService.find()にて、
RepositoryMockにジェネリクスを指定できることや、
UserServiceをインスタンス化する際に引数としてRepositoryMockをany型で渡していることから、
RepositoryMockは他のUser以外のドメインでも流用が想定されていると考えた。
このようにテスト用の汎用的なMockオブジェクトを作るのはアリだと思った。
これは一般的な方法なのかを確認したい。
[w3tecch/express-typescript-boilerplate: A delightful way to building a RESTful API with NodeJs & TypeScript by @w3tecch](https://github.com/w3tecch/express-typescript-boilerplate)
[node-typescript-api/users.test.ts at master · waldemarnt/node-typescript-api](https://github.com/waldemarnt/node-typescript-api/blob/master/test/functional/users.test.ts)

<br>

## 任意課題
画面上で課題を解いて「Run」ボタンを押すとエラーになる。。
一旦保留にする。
[type-challenges/README.ja.md at main · type-challenges/type-challenges](https://github.com/type-challenges/type-challenges/blob/main/README.ja.md)

<br>

## メモ
- jestコマンドはファイル単位、ディレクトリ単位、カレントディレクトリ単位でテスト対象を選択できるっぽい
  - 子ディレクトリ内のテストも実行できた
- testメソッドとitメソッドは同じ。
- [jestの設定は`jest.config.js`以外に`package.json`でもできる](https://jestjs.io/ja/docs/configuration)みたいだが、両方で管理すると
`Multiple configurations found`のエラーになった。
- Babelの設定ファイルはいくつかの書き方があり、
「babel.config.jsを書く」、「.babelrcに書く」、「webpack.config.jsの中のbabel-loader設定内に書く」など
いろんなパターンが許されている。ただし、Jestを使うときは、babel.config.jsまたは.babelrcに書くのが正解。
- カバレッジレポートを取得するためには`jest.config.js`を設定するか、`--coverage`の引数が必要。
- オブジェクトや配列はtoBeではなくtoEqualを使う。
- di_sampleのmockRepositoryのmock作成時にvscode上で赤い波線が出てしまう。動作は問題ないように見える

> toBe：プリミティブ値の比較・オブジェクトの参照先の比較
toEqual：オブジェクトの値の比較
toStrictEqual：継承元クラスやundifinedなプロパティを含む厳密な値の比較
[Jestのexpect(matcher)を完全に理解する](https://jestjs.io/docs/ja/getting-started)

> ・外部ライブラリをテストする時は、基本的にはspyOnを使ってmock化する
> ・mockは、使い終わったら、restoreして、元に戻してあげましょう。
> ・網羅したい系のテストでは、describe.eachやit.eachを使う
> ・@hoge.jp, @test.comみたいなドメインを勝手につかってテストを書いてしまうケースがありますが、メールのご配信などのリスクがあるので、やめましょう。(社内ドメインでもそこから外に出ていく可能性は十分にあります。)
> ・PromiseのErrorのテストには、expect().rejects.toThrow()を使う。
> ・`@jest-environment node`をファイルの先頭につけるとテスト環境をファイルごとに切り替えられる
> [JestのTips集10選。サーバーサイドでNode.jsのJestを書いたことない人向け](https://zenn.dev/search)

> 
> ```js
> const mockMethod = jest.fn<(a: string, b: string) => void>();
> SomeClass.mockImplementation(() => {
>   return {
>     method: mockMethod,
>   };
> });
> ```
> [モック関数](https://jestjs.io/ja/docs/mock-function-api#mockfnmockimplementationfn)

> 複数のテストファイルを並行処理し、ファイル内のテストは順番に実行する
> ・CLI：jest
> ・テストメソッド：itまたはtest
> 複数のテストファイルを順番に処理し、ファイル内のテストも順番に実行する
> ・CLI：jest --runInBand
> ・テストメソッド：itまたはtest
> 複数のテストファイルを並行処理し、ファイル内のテストも並行実行する
> ・CLI：jest
> ・テストメソッド：it.concurrentまたはtest.concurrent
> 複数のテストファイルを順番に処理し、ファイル内のテストは並行実行する
> ・CLI：jest --runInBand
> ・テストメソッド：it.concurrentまたはtest.concurrent
> [Jestテストの並行実行と逐次実行をちゃんと理解する](https://qiita.com/noriaki/items/5d800ea1813c465a0a11)

> ・describe 関数はJestにおいて同じObjectやClassをテストする際に一つのまとまり、ブロックとして表現する際に利用します。
> ・beforeAll関数は全てのテストの実行前に一度だけ実行され、beforeEach関数はtest関数で表現される各テストの実行直前に実行されます。afterAll,afterEachはそれぞれテストの実行後に対応するタイミングで実行されます。
> [Jestでテスト駆動開発（TDD）を実践してみよう](https://tech.uzabase.com/entry/2021/03/17/165008)

> 記述の要点をまとめてみると、次のようになります。
mockClear()は、2つのassertion間でモックをクリーンアップしたい際に便利。
mockReset()は、mockClear()の実行内容に加えて、return values or implementationsを削除可能。
mockReset()は、モックのstateを完全にリセットしたい際に便利。
> [[Jest] clearAllMocks()とresetAllMocks()の違いについて確認してみた](https://dev.classmethod.jp/articles/jest-the-difference-between-clearallmocks-and-resetallmocks/)

> ・以下のようにテスト対象のクラス・メソッドの宣言としてdescribeを使う
> ```js
> describe('Counter', () => {
>   describe('increment()', () => {
>   })
> })
> ```
> ・.onlyはそれだけを実行しますが、.skipは対象のテストのみをスキップします
> ・Promiseを検証する際は以下の２パターン。同じだが、returnだとそこで終了する。
> ```js
> describe('Promise example', () => {
>   test('resolves to 1', () => {
>     return expect(Promise.resolve('1')).resolves.toBe('1')
>   })
> })
> ```
> ```js
> describe('Promise example', () => {
>   test('resolves to 1', async () => {
>     await expect(Promise.resolve('1')).resolves.toBe('1')
>   })
> })
> ```
> ```js
> const mock = jest.fn()
> mock.mockImplementation(() => 1)
> // 上記の記述は以下と同様
> // const mock = jest.fn(() => 1)
> ```
> [Facebook製のJavaScriptテストツール「Jest」の逆引き使用例](https://qiita.com/chimame/items/e97883fd46b67529d59f)

> ・ jest.spyOn()とjest.mock()は、どちらもメソッドをmockするためのもので、
テストコードの中でmock関数を定義する際に使用します
> ・ `jest.spyOn()`は、オブジェクトを引数に指定するのに対し、`jest.mock()`は、モジュールを引数に指定します。
つまり、mockの対象が引数に指定したオブジェクトだけなのか、モジュールそのものなのかという違いがあります。
> ・ mockした処理が呼ばれた後、そのまま別のテストを行うと、定義済みのmockが影響して上手くテストが出来ないことがあり得ます。
そこで、テストの前後どちらかでmockの初期化処理を行うようにすべきです。
> - mockClear()：mockの実行履歴（呼び出し回数など）をクリアします。
> - mockReset()：mockClear()の内容に加えて、mockの定義(戻り値や、関数)も完全に初期化する。jest.spyOn()のものに使用した場合でも、戻り値のない関数となるので注意が必要です。
> - mockRestore()：jest.spyOn()のものにのみ有効です。mockReset()の内容に加えて、対象をmock前の処理に復元します。
> 
> [【備忘録】JestのspyOn()とmock()の使い方について](https://qiita.com/m-yo-biz/items/e9b6298d111ff6d03a5e)

> jest.fn を使う場合、元の関数の実装はモック関数で上書きされます。
> 一方で、jest.spyOn を使う場合、元の関数の実装をモック関数で上書きするだけでなく、
元の実装を残したまま、対象の関数を監視することもできます。
> さらに、jest.spyOn を使って関数をモックした場合は、mockRestore を使うことで元の実装を復元することができます。
> テスト時に関数の元の実装を意識しなくて良い場合は jest.fn を、
元の実装を残したまま監視したい場合や、テストごとにモックした関数の実装を元に戻したい場合には jest.spyOn が利用できます。
> [実装例から見る React のテストの書き方](https://blog.cybozu.io/entry/2022/08/29/110000#setTimeout-%E3%82%92%E4%BD%BF%E3%81%86%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88)

> package.jsonにオプションごとにコマンド書いておくと便利
> ```json
> "test": "jest --config=jest.json",
> "test:watch": "jest --watch --config=jest.json",
> "test:coverage": "jest --config=jest.json --coverage --coverageDirectory=coverage"
> ```
> [nestjs-realworld-example-app/package.json at c1c2cc4e448b279ff083272df1ac50d20c3304fa · lujakob/nestjs-realworld-example-app](https://github.com/lujakob/nestjs-realworld-example-app/blob/c1c2cc4e448b279ff083272df1ac50d20c3304fa/package.json)


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
- [Jest再入門 - 関数・モジュールモック編](https://developer.mamezou-tech.com/testing/jest/jest-mock/)
- [「DIは必ずしも善ではない」| Dependency injection is not a virtue by DHH](https://zenn.dev/hihats/articles/dependency_injection_is_not_a_virtue)
- [なぜJestのmockライブラリに混乱してしまうのか？](https://qiita.com/s_karuta/items/ee211251d944e72b2517)
- [TypeScript: JestでES Modulesは問題なくテストできるのか？](https://zenn.dev/suin/scraps/126d311493a9a1)
- [リーダブルなテストのための、jest モックファクトリー関数](https://zenn.dev/takepepe/articles/readable-jest-mocking)
- [テストフィクスチャのセットアップ手法 - Qiita](https://qiita.com/maple_syrup/items/8a31a537a35c1587dea3)
