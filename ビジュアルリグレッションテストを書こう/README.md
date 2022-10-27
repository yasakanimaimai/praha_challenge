# ビジュアルリグレッションテストを書こう

## 課題1 
./my-app/src/各コンポーネントフォルダ/test/__snapshotsimage__/に格納

<br>

## 課題2
### スナップショットテスト
- 変更箇所がコードレベルで分かる
- 見た目上、どう変化したのかわからない

### ビジュアルリグレッションテスト
- スナップショットに比べると実行時間がかかる
- 見た目上、どう変化したかわかる

<br>

## 課題3
### Q1
VRTを行うことができるツールはいくつかあります。
Storybook以外のツールを1つ調べ、その特徴を教えてください。

### Q2
storyshotsのimageSnapshotを使ってVRTをする場合、
任意のディレクトリ配下にテスト結果を格納するにはどうすればいいでしょうか？

### Q3
storyshotsのimageSnapshotを使ってVRTをする場合、
各ストーリーファイルのディレクトリごとにテスト結果を階層するにはどうすればいいでしょうか？


<br>

## 参考記事 & メモ
> [ビジュアルリグレッションテストにChromaticを導入したらデザインレビューが捗った話 | Money Forward Money Forward Engineers' Blog](https://moneyforward.com/engineers_blog/2022/04/04/improved-design-reviews/)
> - これは導入してみてというよりは、導入時の話になりますが、他の選択肢としてreg-suitやplaywrightを使用するも検討しました。ただそれらと比べてChromaticの方が圧倒的に導入が簡単でした

> [テストについて学んだこと - Qiita](https://qiita.com/ken-s/items/6a3c2e0e1720d3ab111d)
> - 開発マシンに入るものは本物を使う、入らないものはモックするという基準をt_wadaさんはオススメしているそうです。

> [E2Eテストフレームワークはどれを選べばいいんじゃい！](https://zenn.dev/taiga533/articles/f6e1ef07a8676e)
> [Visual Regression Testing はじめました – 具体的な運用 Tips – PSYENCE:MEDIA](https://blog.recruit.co.jp/rmp/front-end/visual-regression-testing/#h-2)