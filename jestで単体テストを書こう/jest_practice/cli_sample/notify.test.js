// `yarn jest ./cli_sample --notify --config=./jest.config.js`
// → テストが完了するとデスクトップに通知が飛ぶ
// - ドキュメント記載通りに`jest ./cli_sample --notify --config=config.json`を実行をすると以下のエラーになる
//   - `Error: Can't find a root directory while resolving a config file path. Provided path to resolve: config.json`
//   - 以下の手順で解消？した
//     1. `jest --init`を実行して`jest.config.js`を作成
//     2. `yarn add node-notifier`を実行
//     3. `--config=`に`jest.config.js`のパスを記載
//   - ただし、yarnコマンドで起動しなければ以下のエラーになる
//   `Error: notify reporter requires optional peer dependency "node-notifier" but it was not found`
//     - `npm install -g node-notifier`や`npm install --save node-notifier`を試したが変わらなかった
//       - yarnからの実行とjestから実行する時に、内部的にライブラリをどう利用しているのかが分からない
//       - そもそもyarnとnpmの両方でライブラリをインストールしてもいいのか？
//       → おそらく併用しない方がいい。依存関係で詰まったらnode_modulesを削除してから再度npmかyarnでインストールする


function hello() {
  return 'hello';
}

test('hello', () => {
  expect(hello()).toBe('mistake' + 'hello');
});