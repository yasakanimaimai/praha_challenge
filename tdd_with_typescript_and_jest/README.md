# テスト駆動開発(TDD)のサンプルコードをTypeScriptで書いてみる

<br>

## 環境構築
以下の記事を参考にした
[TypeScript: JestでES Modulesは問題なくテストできるのか？](https://zenn.dev/suin/scraps/126d311493a9a1)

1. `pnpm init`でpackage.jsonを作成
2. package.jsonに`"type": "module",`を追加
3. `pnpm add -D typescript jest @types/jest ts-jest`でts-jestの環境構築
4. package.jsonに以下を追加
```json
  "jest": {
    "globals": {
      "ts-jest": {
        "useESM": true
      }
    },
    "preset": "ts-jest/presets/default-esm"
  }
  ```
5. `tsc -init`でtsconfig.jsonを作成。`"module": "es2020",`に変更(ここまででTSは実行可能)
6. tsconfig.jsonに`"allowJs": true`を追加
7. package.jsonを`"preset": "ts-jest/presets/js-with-ts-esm"`で上書き

<br>

## 参考記事
> (副作用とは)同じ様に呼び出しても同じ結果が返ってくるとは限らない処理のことです
> [副作用ってなんだ？　〜楽に小さく単体テストをしよう〜 - Qiita](https://qiita.com/suzuki-hoge/items/bad43630ad1ad723ca4a)