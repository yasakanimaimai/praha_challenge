# storybookを作ろう

## 課題1
./my-appにコード作成
- src/Game.jsx
- src/Board.jsx
- src/Square.jsx
- src/stories/Game.stories.jsx
- src/stories/Board.stories.jsx
- src/stories/Square.stories.jsx

<br>

## 課題2
### メリット
- HMR (Hot Module Replacement) に対応しており、リアルタイムで要素の変更を確認できる
- コンポーネント単体で確認ができるため、非開発者との認識を合わせやすくなる
- コンポーネントの再利用がしやすくなる
- StoryBookで扱いやすいように作られるため、
PresentationalコンポーネントからAPI通信や状態管理の処理が分離されやすくなる。

### デメリット
- Storybook自体の学習コストがかかる
- 導入初期は開発に時間がかかる
- storyの管理にコストがかかる

<br>

## 課題3
### Q1
Storybookには`decorators`というコンポーネントのストーリーをラップする機能があります。
この`dexorators`のユースケースを１つ挙げてください。

### Q2
親子関係にあるコンポーネント間で、子コンポーネントで作成したストーリーの状況を再現するために
親コンポーネントのストーリー上で子コンポーネント用の値を作成するのは手間がかかります。
子コンポーネントのストーリを再利用するにはどうすれば良いでしょうか。

### Q3
GUIのテスト領域で、テストしやすいものとテストしにくいものを分けて考え、
テストしにくいロジックを控えめに実装するパターンが有効とされます。
この実装パターンをなんというでしょうか。

<br>

## 参考記事
> [Tutorial: Intro to React – React](https://reactjs.org/tutorial/tutorial.html)
> - We strongly recommend typing code by hand as you’re working through the tutorial and not using copy/paste. This will help you develop muscle memory and a stronger understanding.
> - We could give any name to the Square’s onClick prop or Board’s handleClick method, and the code would work the same. In React, it’s conventional to use on[Event] names for props which represent events and handle[Event] for the methods which handle the events.
> - Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array, so we prefer it.
> - Each child in an array or iterator should have a unique “key” prop.
>

> [React: Create React Appでプロジェクトがつくれない - Qiita](https://qiita.com/FumioNonaka/items/076af56213afc7e29853)  
> npxのキャッシュをクリアしてください。
> `npx clear-npx-cache`

> [propsとstateのイメージをつかむ【はじめてのReact】 - Qiita](https://qiita.com/rio_threehouse/items/7632f5a593cf218b9504)  
> props : 親コンポーネントから子コンポーネントへ値を渡すための仕組み
> state : 各コンポーネントごとに持つ、コンポーネントの状態を管理する仕組み

> [Reactの基本的なところを備忘として残しておく](https://zenn.dev/miz_dev/articles/4e6baa5b747c5d)
> - return する HTML の内容は 1 つのタグで囲わないと行けないルールがある
> - 拡張子が.js でも問題なく動作するが、React のコンポーネントであると分かりやすくするために拡張子は.jsx にする。
> - コンポーネント名は必ず先頭を大文字から初める。パスカルケースで命名する。
> - props を分割代入で記述を短くする方法
`const { color, children } = props;`
> - 再レンダリングがされる条件
>   - state が更新されたコンポーネントは再レンダリング
>   - props が更新されたコンポーネントは再レンダリング
>   - 再レンダリングされたコンポーネント配下の子要素は再レンダリング

> [npxってなんだ](https://zenn.dev/844/articles/d06bfdbd2677a3)
> - npm はnode package manager、つまりパッケージの管理ツールです。
npx はnode package executer、つまりパッケージの実行を行うツールです。
> - 簡単にいうと一番最初に実行する、一回だけ打つコマンドは npx になるのかなと思っています。
色々な Get started が npx で記載されているのは最初にセットアップができればあとは開発で出てこなくなる、あくまで初回の処理のためのコマンドだからなのかなと思います。
> - dependencies:そのプロジェクトに置いて必須なパッケージ
devDependencies:そのプロジェクトの開発に置いて使うパッケージ、必須ではない

> [Reduxを分かりやすく解説してみた | フューチャー技術ブログ](https://future-architect.github.io/articles/20200429/)
> 1. ActionCreatorsによってActionを生成する
> 2. Actionをdispatchする
> 3. ReducerによってStore内のStateを更新する
> 4. ReactとReduxの連携しStore内のStateをComponentで参照する

> [【React/Redux】「Redux Tool Kit」の導入（createSlice) | プログラミングマガジン](http://www.code-magagine.com/?p=13420)
> - ちなみに、createSliceとは？
> reducerを作成するだけで自動的にaction typeや、action creatorも生成してくれます。つまり、従来の.reduxでいうところのreducerとactionを一発で作成することができます。

- [Storybookを導入してみてわかった、導入おすすめプロジェクトの特徴 | Webアプリケーション開発 | Fintan](https://fintan.jp/page/378/)
- [StorybookをReactアプリで使う！導入のメリットとセットアップの手順。 │ Ugo](https://ugo.tokyo/js-storybook/)
- [Storybook を腐らせずに運用しよう - Qiita](https://qiita.com/keik/items/e275394d454b8b136826)
- [Storybookを使ったフロントエンド開発の技術的挑戦のはなし｜シェアダイン｜note](https://note.com/sharedine/n/n08aa79645621)
- [LitとStorybookを用いたサイト制作について](https://www.slideshare.net/ssuser1ca6b8/litstorybook)
- [Humble Objectパターンでテスタブルに | shtnkgm](https://shtnkgm.com/blog/2020-05-17-humble-object-pattern.html)
- [コンポーネントの分類について考えたことをまとめた](https://zenn.dev/kamy112/articles/962a38d6294644)
- [テスト優先度をあげたくなる実話 - フロントエンド版 -](https://zenn.dev/takepepe/articles/frontend-testing-motivation)
- [【React】Sliceを用いたReduxの簡単な実装方法 - TeKRog](https://tekrog.com/how-to-use-slice/)
- [ゼロから始めるStorybook入門(React編) | アールエフェクト](https://reffect.co.jp/html/storybook#Canvas)
- [Reac初心者でも読めば必ずわかるReactのRedux講座 | アールエフェクト](https://reffect.co.jp/react/react-redux-for-beginner)
- [Humble Object Patternな話](https://www.slideshare.net/hirotoimoto1/humble-object-pattern)
- [Clean Architecture - 読書メモ 2 - うまとま君の技術めも](https://umatomakun.hatenablog.com/entry/2020/02/03/205812)
