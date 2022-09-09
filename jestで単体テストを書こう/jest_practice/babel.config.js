module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        'modules': 'false',
        'useBuiltIns': 'usage',
        'targets': '> 0.25%, not dead', // こうすることで、BabelはES6文法で書かれたJavaScriptコードをES5文法にコード変換してくれたりする
      }
    ]
  ],
  env: {
    // 環境変数NODE_ENVがtestだった場合の設定
    test: {
        // この設定によって現在のnode.js(CommonJSのバージョン)にあわせてトランスパイルする
        presets: [
          ['@babel/preset-env', {targets: {node: 'current'}}],
          // typescriptのpresetを追加
          '@babel/preset-typescript',
        ],
    },
},
};