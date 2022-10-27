# E2Eテストを書こう

## 課題1 

<br>

### 交互にマスを選択して、片方のプレイヤーがゲームに勝利した状態を再現するe2eテストを書いてください
- `./my-app/cypress/e2e/game/game.cy.js`に記載
- 「なぜこのようなカスタム属性を追加する必要があるのでしょうか？」
→ テストの独立性を保つため。idやclassはテスト用の属性ではないので変更される可能性がある。
もしidやclassを使用した場合、属性を変更する度にE2Eテストのことを考えなければならない。

<br>

### React TutorialのマルバツゲームのGame.jsを編集して、引き分けの時は「Draw!」と表示されるようにしてください
- `./my-app/src/game/Game/Game.stories.jsx`に記載

<br>

### 少しe2eテストの話題からは逸れてしまいますが、前の課題で作成したStorybookを更新して、引き分け状態を表示するStoryを追加してください
- `./my-app/src/game/Game.stories.jsx`に記載
- presentational/containerの分け方に関しては一旦保留

<br>

### Storyshotのスナップショット、storyshot-puppeteerのスナップショットも必要に応じて更新してください
- `./my-app/src/`配下の各コンポーネントフォルダに記載

<br>

## 課題2

<br>

### E2Eテストのメリットとデメリットを挙げてください
**メリット**
- システムの基本的な品質を保つことができる
- 本番環境に近い状態でテストするので、環境による不具合を検知できる
- デバイスやブラウザの種類・バージョンに由来する不具合を検知できる

**デメリット**
- 管理コストが大きい
  - テスト環境と本番環境を近づけるために環境のセットアップが必要
  - アプリケーションコードを更新するたびに多くの修正が必要
  - flakyにならないようにメンテナンスが必要
- 実行速度が遅くなりやすい
- 画面上の表示がおかしくてもアサーション箇所以外の不具合は検出されない

<br>

### テスト手法（単体、統合、E2Eなど）を選択する際、どのような基準で選ぶと良いでしょうか？
- プロダクトを１から作る通常の開発では「単体 > 結合 > E2E」
- レガシーなプロダクトをリファクタリングする際は、現状の動作を保つことを優先して「E2E > 単体 > 結合」

<br>

### E2Eテストでは要素（ボタンや文言など）を選択する必要が生じますが、要素を選択する上で少し注意が必要です。
- 要素のcssのclassを識別子に使うと起きる問題
→ classが変更されたり、同じclassを持つ要素が追加されると、テストで要素を取得できなくなる。

- 要素のcssのidを識別子に使うと起きる問題
→ idが変更されると、テストで要素を取得できなくなる。

- 要素の文言を識別子に使うと起きる問題
→ 文言が変更されたり、同じ文言を持つ要素が追加されると、テストで要素を取得できなくなる。

- どんな要素を使うといいか
→ e2eテスト用のカスタム属性

<br>

## 課題3
`./my-app/cypress/e2e/game/studio.cy.js`に記載

<br>

## 課題4
### Q1
[cypressの公式ドキュメント](https://docs.cypress.io/guides/references/best-practices#How-It-Works)にはテスト用の属性として`data-cy`が紹介されていますが、
以下のようにBoardからSquareにプロパティとして`data-cy`を渡そうとするとエラーが発生します。なぜでしょうか？(エラーが発生しないやり方をご存知でしたら教えて欲しいです！)
```jsx
// Boardコンポーネント一部抜粋
export class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        data-cy={i}
      />
    )
  }
}

// Squareコンポーネント一部抜粋
export function Square(props) {
  return (
    <button 
      className='square'
      onClick={props.onClick}
      data-cy={props.data-cy}
    >
      {props.value}
    </button>
  )
}
```

### Q2
cypress studioにて、画面上でクリックした要素を取得する際に、
セレクターとして使われる属性には優先順位があります。
以下の属性を優先順位が高い順に並び替えてください。
`class, id, tag, data-cy, color`

### Q3
cypressではcyコマンドで取得した要素を変数に代入することをアンチパターンとしています。
例：`const a = cy.get('a')`
なぜでしょうか？

<br>



## 参考記事 & メモ
> [E2Eをやったことがない初心者のために簡単にテストシナリオを交えながら少し説明してみた（Cypressを使います）](https://zenn.dev/ojin/articles/a72cdb9eeff4e8)
> **DOM取得方法について**
> - `cy.get('#main').click();`
id指定なので、他のボタンとかぶってしまうという問題は発生しえないですね。よって、上記２つのやり方と比べたら格段に良いです。ただ、やはりidは変更の可能性があります。というのも、このidはE2Eのために定義されているわけではないからです。E2Eでid指定をしてしまうと、それ以降は、プロダクトコード側を変更する時にE2Eのことを考えなくてはいけません。
> - `cy.get('[data-cy=submit]').click();`
> このやり方が最も良い理由は明白で、他の変更から完全に隔離されているからです。またプロダクトコードを触る時にもスタイルやJSの動作と連動しない、かつこのコードがE2Eで使われていることが分かりやすいです。

> [E2EテストフレームワークのCypressに入門した](https://zenn.dev/manalink_dev/articles/manalink-cypress-introduce)
> Cypressの特長として、一つひとつのアサートにタイムアウトやリトライがデフォルトで設定されているので、ログインページへのリンクをクリックした後、特にコード上はSleepなどしなくても、即座にURLをアサートしてOKです。

> [Next.js × Cypressでe2eテストをする](https://zenn.dev/wataryooou/articles/3d99a8e7024346)
> E2Eテストは不安定なところがあり、メンテを怠っているといつの間にかテストがこけるようになってしまいます。どうしてもテストを今すぐ改修できない場合は、xitというようにitの前にxを付与してあげることでそのテストをスキップすることができます。


> [Cypress の設定](https://zenn.dev/leaner_tech/articles/20210603-setup_cypress)
> 
> ```
> |- cypress
>  |- fixtures
>    -> API のレスポンスを mock したい時のデータとして利用します
>  |- integration
>    -> テストコードを格納するディレクトリです
>    |- signin.spec.ts
>      -> 実行されるテストコード、画面単位くらいの粒度でファイルを作っています
>  |- plugins
>    -> テストの実行前後に処理を挟めます、スクリーンショットの画像名変えるなど
>  |- screenshots (gitignore)
>    -> スクリーンショットをとった場合、このディレクトリに格納されます
>  |- support
>    -> Cypress のグローバル設定を上書きするファイルを置くディレクトリ、コマンドを上書きできたりします
>  |- videos (gitignore)
>    -> 実行されたテストの動画が格納されるディレクトリです
> ```

> [ERESOLVE unable to resolve dependency treeの解決方法 - Qiita](https://qiita.com/koh97222/items/c46d1ef2a63b92bb6c15)
> - npm install のあとに、オプションで、--save --legacy-peer-depsを追加
> - npm installする際に、インストールするライブラリのバージョンが、インストール先のプロジェクトのバージョンに対応していない場合、
オプションで、--legacy-peer-depsを使うことで、半強制的に？installできるようになるようです。

> [テスト自動化における 10 のベスト プラクティス #9: E2E テストの計画 - UIテスト自動化ツール Ranorex](https://ranorex.techmatrix.jp/blog/2019/07/05/10-best-practices-test-automation-9-plan-e2e-testing/)
> E2Eテストは、通常、上流工程で実行されます。しかし、自動化されたE2Eテストはビルドが複雑で、脆弱であり、保守が困難な場合があります。そのため、単体テストや、統合テストよりもE2Eテストを縮小する傾向にあります。

> [E2Eテストの長所と短所 - UIテスト自動化ツール Ranorex](https://ranorex.techmatrix.jp/blog/2021/12/10/end-to-end-testing-pros-cons-benefits/)
> しかし、テスト自動化ピラミッドが表しているのは理想的なシナリオです。すべての状況に適しているわけではありません。たとえば、単体テストを実行できない多くのサードパーティ製コンポーネントを含む複雑な ERPアプリケーションでは、ピラミッドを逆さまにして、大部分にE2Eテストを実施するのが理にかなっているかもしれません。


- [Best Practices | Cypress Documentation](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)
- [Introduction to Cypress | Cypress Documentation](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#When-To-Assert)
- [WebのE2Eフレームワークの選び方](https://zenn.dev/70_10/articles/6424d54a21d052d52805)
- [Next.js最速セットアップ](https://zenn.dev/a_da_chi/articles/181ea4ccc39580)
- [CypressでReactアプリにE2Eテストを導入する](https://zenn.dev/kai/articles/cypress-e2etest)
- [Cypress入門 - Qiita](https://qiita.com/yurihyp/items/2c4a706a8462c52b9a88)
- [Container/Presentationalパターン再入門](https://zenn.dev/kazu777/articles/9460c75b7cd8d1)
- [コンテナ・プレゼンテーションパターン｜フロントエンドのデザインパターン](https://zenn.dev/morinokami/books/learning-patterns-1/viewer/presentational-container-pattern)
- [【E2Eテスト実践ガイド】E2Eテストの実施方法からおすすめツール、現場での実践ポイントまで詳しく解説  | PrAhaENGINEERLAB](https://www.praha-inc.com/lab/posts/e2e-testing)
- [HOTEL PLANISPHERE - テスト自動化練習サイト](https://hotel.testplanisphere.dev/ja/)
- [React コンポーネントに CSS スタイルを設定する｜まくろぐ](https://maku.blog/p/eu4cksy/)
- [Best Practices | Cypress Documentation](https://docs.cypress.io/guides/references/best-practices#Assigning-Return-Values)
- [cypress-io/cypress-realworld-app: A payment application to demonstrate real-world usage of Cypress testing methods, patterns, and workflows.](https://github.com/cypress-io/cypress-realworld-app)
  - `yarn dev`でbackend起動
  - `yarn run start:react`でFE起動
  - `yarn cypress:open`でcypress起動
    - 他のcypressを閉じないと起動しない
  - cypress studioを使うには`cypress.config.js > e2e > experimentalStudio: true,`を設定する