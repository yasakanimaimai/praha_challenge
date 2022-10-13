# スナップショットテストを書こう

## 課題1 
### 「スナップショットテストとはなんでしょうか？」
特定の出力結果に対して、以前の出力結果と比較し差分を検知するテスト。
主にUI上に意図しない変更がないか確認するために使われるが、
シリアライズ可能な出力であればテストできるため、用途は広いと考えられる。
例えば、SQLをチューニングする際に変更前後で差異がないことを確認したい場面など。

<br>

### 「スナップショットテストを用いることで、どのような不具合が防止できるでしょうか？3つほど例を挙げてみてください」
- 変更したコンポーネントが意図しないところで利用されていることで発生する不具合
- 出力されるはずのコンポーネントが出力されないことや、その逆パターンによる不具合
- SQLチューニングにおけるデグレード

<br>

### 「スナップショットテストでは防止できない不具合もあります。3つほど例を挙げてください」
- 初回のスナップショット生成時に見逃されたバグ
- メソッド名変更やプロパティの追加など、レンダリング対象以外の変更は検出できない
- CSSの意図しない適用(cssは情報はスナップショットでは出力されないため)
- アニメーションなど、一連の動きの中のバグ


<br>

## 課題2

### 「作成されたスナップショットを見てみましょう。どんな情報が記載されているでしょうか？」
コンポーネントのストーリーごとに、jsxが文字列として記載されている。



<br>

## 課題3
### Q1
storyに対してdecoratorでcssを適用させたとき、
snapshotにはそのcssは反映されるでしょうか？

<br>

### Q2
スナップショット関数に引数を持たせずに実行する場合(initStoryshots()のまま実行)、
各ストーリーのスナップショットは１つのファイルに統合されて出力されるため、ファイルが肥大化してしまいます。
ストーリーごとにスナップショットファイルを作成するにはどうすればいいでしょうか？

<br>

### Q3
Boardのストーリーの１つに、squaresプロパティに全てnullが格納された配列を渡すものがあると仮定します。
このストーリーのスナップショットを登録後に、nullを全て空文字に変えて再度スナップショットテストを実行した場合、
テストの結果はどうなるでしょうか？

Boardのストーリー例
```js
const Template = (args) => <Board {...args} />;

export const DefaultBoard = Template.bind({});
DefaultBoard.args = {
  squares: [
    null, null, null,
    null, null, null,
    null, null, null,
  ],
  onClick: () => {},
}
```

<br>

## 任意課題
先に進みたいので一旦保留

<br>

## 参考記事 & メモ
> [StoryBookのStoryshotsアドオンがReact18で動かない時の対応](https://zenn.dev/sum0/scraps/89f0aac4486446)
上記の記事と同じ問題に直面。一応記事の対処でテスト実行はできるようになったが暫定的な対処にとどまる。

> [第9回 2020年版 ReactにStoryshotsを導入する - Qiita](https://qiita.com/tetsurotayama/items/dd637e90f4ea008fd878)
> [TypeError: Cannot read property 'current' of undefined #151]
Reactと異なるバージョンのreact-test-rendererをインストールしているとエラーが出るようです。
同じバージョンをインストールすると解決します。

> [スナップショットテスト · Jest](https://deltice.github.io/jest/docs/ja/snapshot-testing.html#:~:text=%E3%82%B9%E3%83%8A%E3%83%83%E3%83%97%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88%E3%81%AF,%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8%E3%81%A8%E6%AF%94%E8%BC%83%E3%81%97%E3%81%BE%E3%81%99%E3%80%82)
> スナップショットテストとビジュアルの回帰テストの違いは何ですか？ #
スナップショットテストとビジュアルの回帰テストはUIをテストする２つの独立した方法であり、目的が異なります。 ビジュアルの回帰テストツールはwebページのスクリーンショットを取得して出力された画像をピクセル単位で比較します。 スナップショットテストにおいてはシリアライズされた値をテキストファイルに格納して、異なるアルゴリズムで比較します。 考慮すべき異なるトレードオフがあり、私達がスナップショットテストを作成したことの理由はJest blogで挙げています。

> [CIで実行しないスナップショットテストがすごく便利](https://zenn.dev/adwd/articles/72f8d4734264e5)
> アニメーション要素のある画面が多く、ちょっとタイミングがずれると差分が出やすい

> [React Component テストを書くための考え方 | DevelopersIO](https://dev.classmethod.jp/articles/learn-react-component-test/)
> - 全てのコンポーネントをテストする必要はない
> - テストカバレッジの目標となるパーセンテージを守り、必要のないテストを書くのを避け、主となるコンポーネントの詳細度と信頼性を失わないようにする
> - そのためには、最小単位のコンポーネントの動作を担保する。つまるところ、それらの組み合わせで構成されているコンポーネントのテストは難しくならない
> - 複雑でないものから、複雑なものへ向かってテストしていく。 テスト過程で、単体コンポーネントに分離できそうなものは分離する。
> - 下記はテストしないものとする。
>   - 外部ライブラリのテスト
>   - 定数
>   - インラインスタイル
>   - 既にテスト済みのコンポーネント（import先でテスト済みであったりするもの）
> - 順序
>   - Snapshotテスト
>   - propsのテスト
>   - data(props等）の型チェック
>   - eventのテスト
>   - 条件や状態変化前後（domへのclass付け外し等）のテスト

> [Storyshotsが最高すぎる件 - Qiita](https://qiita.com/takanorip/items/786d8391e2bd99b67561)
> - StoryshotsはStorybookのアドオンで、Storybookに登録されているコンポーネントのスナップショットテストをしてくれます。
> できることはjestのスナップショットテストとほぼ同じです。

> [Storyshots Addon | Storybook](https://storybook.js.org/addons/@storybook/addon-storyshots)
> - if the addon automatically adds the decorator for you (which is a new feature in Storybook 6.0), you will find the decorator does not get added in Storyshots. This is a limitation in Storyshots currently.

> [Reactのテストについてしっかり調べてみた - kk-web](https://kk-web.link/blog/20211112)
> ・単体テスト（ユニットテスト）：Jest × react-test-renderer（スナップショットテスト・リグレッションテスト（回帰テスト））・Storybook
・結合テスト（インテグレーションテスト）：Jest × react-testing-library・Storybook
・総合テスト：Cypress

> [2020年初頭における Next.js をベースとしたフロントエンドの環境構築 - Qiita](https://qiita.com/syuji-higa/items/931e44046c17f53b432b)
> ・フレームワーク： Next.js v9.3.0 (React v16.13.0)
・静的型付け： TypeScript v3.8.3
・PWA： next-offline v5.0.0
・スタイリング： styled-components v5.0.1 + styled-media-query v2.1.2
・状態管理： Redux Toolkit v1.2.5
・ルール＆整形： EditorConfig + ESLint v6.8.0 + Prettier v1.19.1
・テスト： Jest v25.1.0 + React Testing Library v9.4.1
・コンポーネントカタログ: Stroybook v5.3.14 (StoryShots を含む)
・Git フック： Husky v4.2.3


- 文字列として出力されない変更はStoryshotsでは検出されない
  - 例えばBoardコンポーネントのrennderメソッド内で任意のプロパティを出力しても、
  プロパティが空文字なら出力されない。
- 「`npm test storybook.test.js`」でテストを実行するときに、
VRTのために必要なアドオン`@storybook/addon-storyshots-puppeteer puppeteer`をyarnでインストールしているとエラーになる。
同じようにnpmでインストールすべし。
- スナップショットもVRTもStorybookを起動しないと動かない(当たり前)

- [スナップショットテストの向き不向きについて考えてみる - mizdra's blog](https://www.mizdra.net/entry/2021/02/04/003728)
- [Storyshotsを止めてスナップショットテストの仕組みを自作した話 | Wantedly Engineer Blog](https://www.wantedly.com/companies/wantedly/post_articles/421107)
- [ABEMAでスナップショットテストをやめてVisual Regression Testingに移行する話 | CyberAgent Developers Blog](https://developers.cyberagent.co.jp/blog/archives/29784/)
- [スナップショットテストのすゝめ - Qiita](https://qiita.com/kentt/items/c66fed793610e36de552)
- [ASCII.jp：UI開発の流れが変わる！React Storybookでデザイナーも開発者も幸せになれる](https://ascii.jp/elem/000/001/454/1454817/)
- [storybook起動時のみブラウザのコンソールでReact18のAPIエラーが出る](https://zenn.dev/tokiya_horikawa/scraps/1f97e4034ce072)
- [StoryShotsの可能性を探る - カミナシ エンジニアブログ](https://kaminashi-developer.hatenablog.jp/entry/expo-storyshots)

- [StorybookのStoryshots入れるだけでやたら手こずった](https://zenn.dev/ucwork/articles/c331de8917ea5b)
- [CRAで作成したReact + TypeScriptのアプリケーションにStorybookとスナップショットテストを導入する - タカの技術ノート](https://scrapbox.io/taka521-tech-notes/CRA%E3%81%A7%E4%BD%9C%E6%88%90%E3%81%97%E3%81%9FReact_+_TypeScript%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%ABStorybook%E3%81%A8%E3%82%B9%E3%83%8A%E3%83%83%E3%83%97%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%E3%83%86%E3%82%B9%E3%83%88%E3%82%92%E5%B0%8E%E5%85%A5%E3%81%99%E3%82%8B)