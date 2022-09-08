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




<br>

## 課題２

<br>


## メモ
- jestコマンドはファイル単位、ディレクトリ単位、カレントディレクトリ単位でテスト対象を選択できるっぽい
  - 子ディレクトリ内のテストも実行できた
- CommonJSのモジュール管理ではrequire構文をつかうが、
さきほど書いたhello.jsではES6より導入されたimport文によるモジュール管理をつかっている。
そこで、本番向け開発はいままでどおりES6で書いて、Jestでテストするときには、CommonJS形式にしよう、というのが良くやられている。
- [jestの設定は`jest.config.js`以外にも`package.json`でもできる](https://jestjs.io/ja/docs/configuration)みたいだが、両方で管理すると
`Multiple configurations found`のエラーになった

<br>

## 参考記事
- [npm install の --save-dev って何？](https://qiita.com/kohecchi/items/092fcbc490a249a2d05c)
- [npmとは　yarnとは](https://qiita.com/Hai-dozo/items/90b852ac29b79a7ea02b)
- [warning package.json: No license field](https://qiita.com/kozakura16/items/ebaf8ea58fc49dcbdd73)
- [【JavaScript】Babelとは何か](https://qiita.com/mzmz__02/items/e6fbe5e30cc3fd13788f)
- [CommonJSとES Modulesについてまとめる](https://zenn.dev/yodaka/articles/596f441acf1cf3)
- [ES6+Babel7環境でJestする方法](https://qiita.com/riversun/items/6c30a0d0897194677a37)
- [デスクトップ通知が出来るnode.jsライブラリ「node-notifier」](https://co.bsnws.net/article/123)
- 
- 
