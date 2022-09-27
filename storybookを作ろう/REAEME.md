# storybookを作ろう

## 課題1
my-appにサンプルコード記載

## メモ
- 課題1のhistory内のsquaresをオグジェクトでラップして渡しているのは、柔軟性を上げるためかもしれない

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